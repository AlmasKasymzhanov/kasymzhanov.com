-- Newsletter subscribers for kasymzhanov.com
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard → SQL Editor

create table if not exists subscribers (
  id bigint generated always as identity primary key,
  email text not null,
  status text not null default 'pending',   -- 'pending' | 'confirmed' | 'unsubscribed'
  source text,                               -- 'home', 'subscribe_page', 'google', 'footer'
  user_id uuid,                              -- links to auth.users if they sign in later
  referrer text,
  user_agent text,
  created_at timestamptz default now(),
  unique (email)
);

create index if not exists idx_subscribers_status on subscribers (status);
create index if not exists idx_subscribers_created on subscribers (created_at);

-- Enable RLS
alter table subscribers enable row level security;

-- Allow anonymous inserts (public subscribe form).
-- NOTE: no SELECT policy on purpose — the subscriber list stays private
-- (readable only via the service_role key on the server / dashboard).
create policy "Allow anonymous inserts" on subscribers
  for insert with check (true);
