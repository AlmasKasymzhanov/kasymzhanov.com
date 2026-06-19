-- Engagement backend for kasymzhanov.com: profiles, likes, comments, shares.
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard -> SQL Editor
--
-- Design (enterprise canon):
--   * Every write is tied to an authenticated user (auth.uid()); anonymous
--     visitors can READ counts but cannot like/comment.
--   * Row Level Security on every table; the client only ever uses the anon key.
--   * profiles mirrors public author info (name, avatar) so comments can show
--     the author without exposing auth.users. Auto-created on signup by trigger.
--   * Counts are exposed via views (anon-readable) so article cards show real
--     numbers without a round-trip per row.

-- ─────────────────────────────────────────────────────────────
-- 1. PROFILES — public author info, auto-filled on signup
-- ─────────────────────────────────────────────────────────────
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  avatar_url text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Profiles are public" on profiles
  for select using (true);

create policy "Users update own profile" on profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function handle_new_user()
  returns trigger
  language plpgsql
  security definer
  set search_path = public
as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      split_part(new.email, '@', 1)
    ),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Backfill profiles for users who already signed up before this migration.
insert into public.profiles (id, name, avatar_url)
select
  u.id,
  coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', split_part(u.email, '@', 1)),
  u.raw_user_meta_data->>'avatar_url'
from auth.users u
on conflict (id) do nothing;

-- ─────────────────────────────────────────────────────────────
-- 2. LIKES — one per (article, user); a like is a toggle
-- ─────────────────────────────────────────────────────────────
create table if not exists likes (
  id bigint generated always as identity primary key,
  slug text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique (slug, user_id)
);

create index if not exists idx_likes_slug on likes (slug);

alter table likes enable row level security;

create policy "Likes are readable" on likes
  for select using (true);

create policy "Like as self" on likes
  for insert with check (auth.uid() = user_id);

create policy "Unlike own" on likes
  for delete using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- 3. COMMENTS — threaded (parent_id), soft-moderated (status)
-- ─────────────────────────────────────────────────────────────
create table if not exists comments (
  id bigint generated always as identity primary key,
  slug text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  parent_id bigint references comments(id) on delete cascade,
  body text not null check (char_length(btrim(body)) between 1 and 4000),
  status text not null default 'visible',   -- 'visible' | 'hidden'
  created_at timestamptz default now(),
  updated_at timestamptz
);

create index if not exists idx_comments_slug on comments (slug);
create index if not exists idx_comments_parent on comments (parent_id);

alter table comments enable row level security;

-- Anyone can read visible comments.
create policy "Visible comments readable" on comments
  for select using (status = 'visible');

-- Authenticated users post as themselves.
create policy "Comment as self" on comments
  for insert with check (auth.uid() = user_id);

-- Authors can edit / delete their own comments.
create policy "Edit own comment" on comments
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Delete own comment" on comments
  for delete using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- 4. SHARES — a simple counter per article (no per-user row)
-- ─────────────────────────────────────────────────────────────
create table if not exists shares (
  slug text primary key,
  count bigint not null default 0
);

alter table shares enable row level security;

create policy "Shares are readable" on shares
  for select using (true);

-- Atomic increment via RPC (mirrors increment_view for page_views).
create or replace function increment_share(page_slug text)
  returns bigint
  language plpgsql
  security definer
  set search_path = public
as $$
declare
  new_count bigint;
begin
  insert into shares (slug, count) values (page_slug, 1)
  on conflict (slug) do update set count = shares.count + 1
  returning count into new_count;
  return new_count;
end;
$$;

-- ─────────────────────────────────────────────────────────────
-- 5. COUNT VIEWS — anon-readable aggregates for article cards
-- ─────────────────────────────────────────────────────────────
create or replace view like_counts as
  select slug, count(*)::bigint as count from likes group by slug;

create or replace view comment_counts as
  select slug, count(*)::bigint as count
  from comments where status = 'visible' group by slug;

grant select on like_counts, comment_counts to anon, authenticated;
