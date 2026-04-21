insert into public.license_tiers (slug, name, description, price_cents, sort_order, is_highlighted)
values
  ('basic', 'Basic', 'MP3, distribution limits per license agreement.', 4999, 1, false),
  ('premium', 'Premium', 'MP3 + WAV, higher caps.', 6999, 2, true),
  ('premium-trackouts', 'Premium + Trackouts', 'WAV + stems / trackouts.', 14999, 3, false),
  ('exclusive', 'Exclusive', 'Exclusive purchase; terms finalized at sale.', 100000, 4, false)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  price_cents = excluded.price_cents,
  sort_order = excluded.sort_order,
  is_highlighted = excluded.is_highlighted;

insert into public.beat_license_prices (beat_id, license_tier_id, price_cents)
select b.id, lt.id, lt.price_cents
from public.beats b
cross join public.license_tiers lt
on conflict (beat_id, license_tier_id) do update
set price_cents = excluded.price_cents,
    updated_at = now();
