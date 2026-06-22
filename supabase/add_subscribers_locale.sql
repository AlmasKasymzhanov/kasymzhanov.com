-- Add a language column to subscribers so newsletters can be segmented by
-- language (RU readers get RU campaigns, EN readers get EN — sending the wrong
-- language reads as spam). Run in Supabase SQL Editor.

alter table subscribers
  add column if not exists locale text not null default 'ru'
  check (locale in ('ru', 'en'));

create index if not exists idx_subscribers_locale on subscribers (locale);
