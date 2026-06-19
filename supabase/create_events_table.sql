-- Universal events table for kasymzhanov.com analytics
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard → SQL Editor

create table if not exists events (
  id bigint generated always as identity primary key,
  slug text not null,
  event_type text not null,        -- 'share', 'read_depth', 'click', etc.
  channel text,                     -- 'telegram', 'whatsapp', 'threads', 'copy' (for shares)
  metadata jsonb,                   -- flexible: { depth: 75 }, { target: 'redstat.kz' }, etc.
  referrer text,
  user_agent text,
  created_at timestamptz default now()
);

-- Indexes for fast queries
create index if not exists idx_events_slug on events (slug);
create index if not exists idx_events_type on events (event_type);
create index if not exists idx_events_created on events (created_at);

-- Enable RLS
alter table events enable row level security;

-- Allow anonymous inserts (public tracking)
create policy "Allow anonymous inserts" on events
  for insert with check (true);

-- Allow anonymous reads (for counters)
create policy "Allow anonymous reads" on events
  for select using (true);
