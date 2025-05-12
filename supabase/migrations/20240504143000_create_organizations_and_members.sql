-- Create organizations table
create table if not exists organizations (
                                             id uuid primary key default uuid_generate_v4(),
    name text not null,
    created_at timestamp with time zone default now(),
    metadata jsonb default '{}'::jsonb,
    logo_url text,
    stripe_subscription jsonb default '{}'::jsonb  -- Added stripeSubscription field
    );

alter table organizations enable row level security;

-- Create organization_members table
create table if not exists organization_members (
                                                    organization_id uuid references organizations(id) on delete cascade,
    user_id uuid references auth.users(id) on delete cascade,
    role text not null default 'member',
    created_at timestamp with time zone default now(),
    primary key (organization_id, user_id)
    );

alter table organization_members enable row level security;
