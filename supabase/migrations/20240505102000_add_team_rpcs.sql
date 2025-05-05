-- Get all orgs for current user
create or replace function public.get_organizations()
returns json
language sql
as $$
select json_agg(
               json_build_object(
                       'id', o.id,
                       'name', o.name,
                       'role', m.role,
                       'created_at', o.created_at,
                       'metadata', o.metadata,
                       'logo_url', o.logo_url
               )
       )
from organizations o
         join organization_members m on m.organization_id = o.id
where m.user_id = auth.uid();
$$;

grant execute on function public.get_organizations() to authenticated;

-- Create org manually
create or replace function public.create_organization(
  name text,
  metadata jsonb default '{}'::jsonb,
  logo_url text default null
) returns uuid
language plpgsql
as $$
declare
org_id uuid;
begin
insert into organizations (name, metadata, logo_url)
values (name, metadata, logo_url)
    returning id into org_id;

insert into organization_members (organization_id, user_id, role)
values (org_id, auth.uid(), 'owner');

return org_id;
end;
$$;

grant execute on function public.create_organization(text, jsonb, text) to authenticated;
