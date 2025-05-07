-- Drop old insert policy if exists
drop policy if exists "Anyone can create organizations" on organizations;

-- Create a new one
create policy "Anyone can create organizations" on organizations
for insert
with check (
  true
);

-- Optional stricter policy
create policy "Allow insert if called via function" on organizations
for insert
with check (
  auth.uid() is not null
);
