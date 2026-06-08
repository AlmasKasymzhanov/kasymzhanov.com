-- Pre-registration ("предзапись") for upcoming course streams.
-- Written only by the server (service/secret key); RLS blocks public access.

create table if not exists waitlist (
  id bigint generated always as identity primary key,
  phone text not null,
  email text not null,
  stream text not null default 'stream-4',
  referrer text,
  user_agent text,
  created_at timestamptz default now(),
  unique (email, stream)
);

alter table waitlist enable row level security;
-- No public policies: only the server (service_role / secret key) reads/writes.
