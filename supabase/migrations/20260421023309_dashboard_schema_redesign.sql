alter table public.beats
  add column if not exists source_audio_path text,
  add column if not exists preview_start_seconds integer not null default 0,
  add column if not exists preview_duration_seconds integer not null default 30;

create table if not exists public.beat_license_prices (
  beat_id uuid not null references public.beats(id) on delete cascade,
  license_tier_id uuid not null references public.license_tiers(id) on delete cascade,
  price_cents integer not null check (price_cents >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (beat_id, license_tier_id)
);

alter table public.beat_license_prices enable row level security;

insert into public.beat_license_prices (beat_id, license_tier_id, price_cents)
select b.id, lt.id, lt.price_cents
from public.beats b
cross join public.license_tiers lt
on conflict (beat_id, license_tier_id) do nothing;

drop table if exists public.download_grants;
drop table if exists public.contact_submissions;
drop table if exists public.videos;
drop table if exists public.beat_files;
