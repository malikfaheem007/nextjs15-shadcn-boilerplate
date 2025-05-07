-- ✅ Organizations
alter table organizations enable row level security;

drop policy if exists "Users can view their orgs" on organizations;
drop policy if exists "Anyone can create orgs" on organizations;

create policy "Users can view their organizations" on organizations
for select
                         using (
                         id in (
                         select organization_id from organization_members
                         where user_id = current_setting('request.jwt.claim.sub', true)
                         )
                         );

create policy "Anyone can create organizations" on organizations
for insert
with check (true);

-- ✅ Organization Members
alter table organization_members enable row level security;

drop policy if exists "Allow inserts via function" on organization_members;

create policy "Users can view their organization memberships" on organization_members
for select
                    using (
                    user_id = current_setting('request.jwt.claim.sub', true)
                    );

create policy "Allow user to insert self membership" on organization_members
for insert
with check (
  user_id = current_setting('request.jwt.claim.sub', true)
);
