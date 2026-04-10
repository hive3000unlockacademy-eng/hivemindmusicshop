-- HiveMindMusic.Shop initial schema (Supabase / Postgres)

create extension if not exists "pgcrypto";

-- License tiers (public read)
create table public.license_tiers (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  price_cents integer not null,
  rights_json jsonb,
  sort_order integer not null default 0,
  is_highlighted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Beats (store preview_path here; full files in beat_files with no public access)
create table public.beats (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  bpm integer,
  musical_key text,
  genre text,
  mood text[],
  is_active boolean not null default true,
  is_featured boolean not null default false,
  artwork_path text,
  preview_path text,
  duration_seconds integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Private fulfillment files (service role only)
create table public.beat_files (
  id uuid primary key default gen_random_uuid(),
  beat_id uuid not null references public.beats(id) on delete cascade,
  full_wav_path text,
  trackouts_path text,
  exclusive_bundle_path text,
  updated_at timestamptz not null default now(),
  unique (beat_id)
);

create table public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text,
  thumbnail_path text,
  embed_url text not null,
  category text,
  tags text[],
  is_featured boolean not null default false,
  linked_beat_id uuid references public.beats(id) on delete set null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_email text not null,
  paypal_order_id text not null unique,
  paypal_capture_id text,
  payment_status text not null default 'pending',
  fulfillment_status text not null default 'pending',
  total_cents integer not null,
  currency text not null default 'USD',
  raw_paypal_payload jsonb,
  created_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  beat_id uuid not null references public.beats(id),
  license_tier_id uuid references public.license_tiers(id),
  unit_price_cents integer not null,
  title_snapshot text,
  tier_name_snapshot text,
  created_at timestamptz not null default now()
);

create table public.download_grants (
  id uuid primary key default gen_random_uuid(),
  order_item_id uuid not null references public.order_items(id) on delete cascade,
  storage_path text not null,
  token_hash text,
  expires_at timestamptz,
  download_count integer not null default 0,
  max_downloads integer not null default 5,
  created_at timestamptz not null default now()
);

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  message text not null,
  inquiry_type text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.license_tiers enable row level security;
alter table public.beats enable row level security;
alter table public.beat_files enable row level security;
alter table public.videos enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.download_grants enable row level security;
alter table public.contact_submissions enable row level security;

create policy "license_tiers_select_public" on public.license_tiers
  for select using (true);

create policy "beats_select_active" on public.beats
  for select using (is_active = true);

create policy "videos_select_public" on public.videos
  for select using (true);

create policy "contact_insert_public" on public.contact_submissions
  for insert with check (true);

-- Create buckets in Dashboard → Storage, or run:
-- insert into storage.buckets (id, name, public) values ('public-media', 'public-media', true), ('private-beats', 'private-beats', false);
-- Then add storage policies for public-media read as needed.
