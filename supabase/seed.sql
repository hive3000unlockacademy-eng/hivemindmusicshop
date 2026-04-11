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

insert into public.beats (slug, title, description, bpm, musical_key, genre, mood, is_featured, artwork_path, preview_path, duration_seconds)
values
  (
    'midnight-run',
    'Midnight Run',
    'Dark trap with cinematic pads.',
    140,
    'F# min',
    'Dark Trap',
    array['drill', 'cinematic'],
    true,
    null,
    null,
    158
  ),
  (
    'neon-drift',
    'Neon Drift',
    'Bouncy west-coast inspired groove.',
    97,
    'A min',
    'Melodic',
    array['westcoast', 'bouncy'],
    false,
    null,
    null,
    185
  ),
  (
    'signal-lost',
    'Signal Lost',
    'Smooth R&B bounce.',
    88,
    'D maj',
    'R&B',
    array['smooth', 'vibes'],
    false,
    null,
    null,
    172
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  bpm = excluded.bpm,
  musical_key = excluded.musical_key,
  genre = excluded.genre,
  mood = excluded.mood,
  is_featured = excluded.is_featured,
  duration_seconds = excluded.duration_seconds;

insert into public.videos (title, artist, thumbnail_path, embed_url, category, tags, is_featured, sort_order)
values
  (
    'Studio session: building the drop',
    'HiveMind',
    null,
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'tutorial',
    array['studio', 'tutorial'],
    true,
    1
  ),
  (
    'Type beat walkthrough',
    'HiveMind',
    null,
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'type beat',
    array['type beat'],
    false,
    2
  );
