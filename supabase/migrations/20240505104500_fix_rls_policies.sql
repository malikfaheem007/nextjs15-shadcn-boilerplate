-- Enable RLS on tables if not already enabled
alter table organizations enable row level security;
alter table organization_members enable row level security;

-- Drop existing problematic policies
drop policy if exists "Users can view their orgs" on organizations;
drop policy if exists "Anyone can create orgs" on organizations;
drop policy if exists "Users can view org members" on organization_members;
drop policy if exists "Allow inserts via function" on organization_members;

-- ✅ Updated RLS Policies with safe access

-- Organizations: Allow users to see organizations they belong to
create policy "Users can view their organizations" on organizations
for select
                                   using (
                                   id in (
                                   select organization_id from organization_members
                                   where user_id = current_setting('request.jwt.claim.sub', true)::uuid
                                   )
                                   );

-- Organizations: Allow anyone to create a new organization
create policy "Anyone can create organizations" on organizations
for insert
with check (true);

-- Org Members: Allow user to view only their own rows
create policy "Users can view their organization memberships" on organization_members
for select
                      using (
                      user_id = current_setting('request.jwt.claim.sub', true)::uuid
                      );

-- Org Members: Allow user to insert their own membership
create policy "Allow user to insert self membership" on organization_members
for insert
with check (
  user_id = current_setting('request.jwt.claim.sub', true)::uuid
);
