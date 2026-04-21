-- Admin access: is_admin() via JWT app_metadata.admin or public.admin_users

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- No direct policies: only SECURITY DEFINER functions read this table.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    coalesce((auth.jwt() -> 'app_metadata' ->> 'admin') = 'true', false)
    or exists (
      select 1 from public.admin_users au where au.user_id = auth.uid()
    );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- Callable from server/client with user JWT (for layout guard)
create or replace function public.current_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_admin();
$$;

revoke all on function public.current_is_admin() from public;
grant execute on function public.current_is_admin() to authenticated;

-- Admin read policies (additive to existing public policies)
create policy "license_tiers_select_admin" on public.license_tiers
  for select to authenticated
  using (public.is_admin());

create policy "beats_select_admin" on public.beats
  for select to authenticated
  using (public.is_admin());

create policy "beat_files_select_admin" on public.beat_files
  for select to authenticated
  using (public.is_admin());

create policy "videos_select_admin" on public.videos
  for select to authenticated
  using (public.is_admin());

create policy "orders_select_admin" on public.orders
  for select to authenticated
  using (public.is_admin());

create policy "order_items_select_admin" on public.order_items
  for select to authenticated
  using (public.is_admin());

create policy "download_grants_select_admin" on public.download_grants
  for select to authenticated
  using (public.is_admin());

create policy "contact_submissions_select_admin" on public.contact_submissions
  for select to authenticated
  using (public.is_admin());

create policy "contact_submissions_update_admin" on public.contact_submissions
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());
