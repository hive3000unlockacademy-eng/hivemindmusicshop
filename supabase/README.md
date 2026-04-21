# Supabase

## What the redesigned schema supports

The current dashboard/store redesign is centered on:

- `beats` for public beat listings
- `beat_license_prices` for per-beat pricing across all 4 license tiers
- `license_tiers` for the 4 shared license definitions
- `orders` + `order_items` for the Sales view
- Supabase Auth + admin RLS for dashboard access

The old dashboard-only tables are removed by the redesign migration:

- `videos`
- `contact_submissions`
- `download_grants`
- `beat_files`

## Apply schema + seed

1. In Supabase Dashboard → **Settings → Database**, copy the **Connection string** (URI) and add it to root `.env.local` as `DATABASE_URL`.
2. From the repo root, run:

   ```bash
   npm run db:apply
   ```

   This applies the base schema, admin auth migrations, the dashboard redesign migrations, then `seed.sql`.

## Migration order (manual SQL alternative)

Run these in order if you are using the SQL editor manually:

1. `migrations/20250409000000_initial.sql`
2. `migrations/20250409000001_order_items_quantity.sql`
3. `migrations/20250409120000_admin_rls.sql`
4. `migrations/20250410120000_is_admin_jwt_robust.sql`
5. `migrations/20260421023309_dashboard_schema_redesign.sql`
6. `migrations/20260421024056_dashboard_storage_rls.sql`
7. `seed.sql`

## Storage buckets

The redesign uses two buckets:

- `public-media` — public preview clips + artwork
- `private-beats` — source beat uploads

The storage/RLS migration creates or updates these buckets and adds admin upload policies.

## Admin setup

1. **Auth URLs** — In Supabase → **Authentication** → **URL Configuration**:
   - **Site URL**: your production URL
   - **Redirect URLs**: include `http://localhost:3000` for local dev

2. **Email/password sign-in** — In Supabase → **Authentication** → **Providers** → **Email**, make sure password sign-in is enabled.

3. **First admin user** — In **Authentication** → **Users**, create or invite your admin user. Then either:
   - set **App metadata** to:

     ```json
     { "admin": true }
     ```

   - or insert the auth user id into `public.admin_users`

4. **Service role key** — Sales persistence now uses `SUPABASE_SERVICE_ROLE_KEY` on the server to insert `orders` and `order_items` after PayPal capture. Keep that key server-only.

## Seed behavior

`seed.sql` now seeds:

- the 4 license tiers
- sample beats
- default `beat_license_prices` rows for every seeded beat × license tier

It no longer inserts rows for dropped tables like `videos`.
