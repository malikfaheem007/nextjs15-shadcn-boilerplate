-- RLS for organizations
create
policy "Users can view their orgs" on organizations
  for
select using (
    exists (
    select 1 from organization_members
    where organization_id = organizations.id and user_id = auth.uid()
    )
    );

create
policy "Anyone can create orgs" on organizations
  for insert with check (true);

-- RLS for organization_members
create
policy "Users can view org members" on organization_members
  for
select using (
    user_id = auth.uid() or
    exists (
    select 1 from organization_members
    where organization_id = organization_members.organization_id
    and user_id = auth.uid()
    )
    );

create
policy "Allow inserts via function" on organization_members
  for insert with check (user_id = auth.uid());
