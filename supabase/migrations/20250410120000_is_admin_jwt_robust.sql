-- Recognize app_metadata.admin as JSON boolean true or string "true"

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    (
      (coalesce(auth.jwt()->'app_metadata', '{}'::jsonb)->'admin') = 'true'::jsonb
      or (coalesce(auth.jwt()->'app_metadata', '{}'::jsonb)->>'admin') = 'true'
    )
    or exists (
      select 1 from public.admin_users au where au.user_id = auth.uid()
    );
$$;
