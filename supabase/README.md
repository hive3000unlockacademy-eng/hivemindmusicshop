# Supabase

1. Create a Supabase project and run `migrations/20250409000000_initial.sql` in the SQL editor (or use Supabase CLI `db push`).
2. Run `seed.sql` to load license tiers, sample beats, and videos.
3. Create storage buckets `public-media` (public) and `private-beats` (private) and configure policies.

Copy root `.env.example` to `.env.local` and add your project URL and keys.
