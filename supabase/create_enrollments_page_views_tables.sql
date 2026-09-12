-- Course enrollments + per-article view counters.
-- Reconstructed from the live schema (2026-08-31) — these two tables existed in
-- the project but had no migration file, so a rebuild from this repo would have
-- come up short. Keep this in sync with lib/enrollment.ts and app/api/views.

-- Model A enrollment: one row per (email, course). Written server-side only,
-- via the service key — see ensureEnrolled() in lib/enrollment.ts.
create table if not exists enrollments (
  id bigint generated always as identity primary key,
  email text not null,
  course text not null default 'stream-2',
  created_at timestamptz default now(),
  unique (email, course)
);

alter table enrollments enable row level security;
-- No public policies: only the server (service_role / secret key) reads/writes.

-- Article view counter, one row per slug.
create table if not exists page_views (
  slug text primary key,
  count bigint default 0,
  updated_at timestamptz default now()
);

alter table page_views enable row level security;

create policy "Allow public read" on page_views
  for select using (true);

create policy "Allow public increment" on page_views
  for insert with check (true);

create policy "Allow public update" on page_views
  for update using (true);
