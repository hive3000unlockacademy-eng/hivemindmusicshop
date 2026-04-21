insert into storage.buckets (id, name, public)
values
  ('public-media', 'public-media', true),
  ('private-beats', 'private-beats', false)
on conflict (id) do update
set public = excluded.public;

drop policy if exists "beat_license_prices_select_public" on public.beat_license_prices;
create policy "beat_license_prices_select_public" on public.beat_license_prices
  for select
  using (
    exists (
      select 1
      from public.beats b
      where b.id = beat_license_prices.beat_id
        and b.is_active = true
    )
  );

drop policy if exists "beat_license_prices_select_admin" on public.beat_license_prices;
create policy "beat_license_prices_select_admin" on public.beat_license_prices
  for select to authenticated
  using (public.is_admin());

drop policy if exists "beat_license_prices_insert_admin" on public.beat_license_prices;
create policy "beat_license_prices_insert_admin" on public.beat_license_prices
  for insert to authenticated
  with check (public.is_admin());

drop policy if exists "beat_license_prices_update_admin" on public.beat_license_prices;
create policy "beat_license_prices_update_admin" on public.beat_license_prices
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "beat_license_prices_delete_admin" on public.beat_license_prices;
create policy "beat_license_prices_delete_admin" on public.beat_license_prices
  for delete to authenticated
  using (public.is_admin());

drop policy if exists "beats_insert_admin" on public.beats;
create policy "beats_insert_admin" on public.beats
  for insert to authenticated
  with check (public.is_admin());

drop policy if exists "beats_update_admin" on public.beats;
create policy "beats_update_admin" on public.beats
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "beats_delete_admin" on public.beats;
create policy "beats_delete_admin" on public.beats
  for delete to authenticated
  using (public.is_admin());

drop policy if exists "public_media_admin_select" on storage.objects;
create policy "public_media_admin_select" on storage.objects
  for select to authenticated
  using (bucket_id = 'public-media' and public.is_admin());

drop policy if exists "public_media_admin_insert" on storage.objects;
create policy "public_media_admin_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'public-media' and public.is_admin());

drop policy if exists "public_media_admin_update" on storage.objects;
create policy "public_media_admin_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'public-media' and public.is_admin())
  with check (bucket_id = 'public-media' and public.is_admin());

drop policy if exists "public_media_admin_delete" on storage.objects;
create policy "public_media_admin_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'public-media' and public.is_admin());

drop policy if exists "private_beats_admin_select" on storage.objects;
create policy "private_beats_admin_select" on storage.objects
  for select to authenticated
  using (bucket_id = 'private-beats' and public.is_admin());

drop policy if exists "private_beats_admin_insert" on storage.objects;
create policy "private_beats_admin_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'private-beats' and public.is_admin());

drop policy if exists "private_beats_admin_update" on storage.objects;
create policy "private_beats_admin_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'private-beats' and public.is_admin())
  with check (bucket_id = 'private-beats' and public.is_admin());

drop policy if exists "private_beats_admin_delete" on storage.objects;
create policy "private_beats_admin_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'private-beats' and public.is_admin());
