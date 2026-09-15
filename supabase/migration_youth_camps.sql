-- Run this in the Supabase SQL Editor to add Youth Camps to a database
-- that was already set up from the original schema.sql. Safe to run even
-- if you're not sure whether you've already run it -- every step below
-- only acts "if not exists" / checks first.

create table if not exists camp_sessions (
  id uuid primary key default gen_random_uuid(),
  sport text not null, -- flag_football, soccer, track
  title text not null,
  description text,
  start_date date not null,
  end_date date not null,
  price_cents integer not null default 0,
  capacity integer not null default 20,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists camp_registrations (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references camp_sessions(id) on delete set null,
  sport text not null,
  child_name text not null,
  child_age integer,
  parent_name text not null,
  parent_email text not null,
  parent_phone text,
  notes text,
  amount_cents integer not null default 0,
  stripe_session_id text,
  payment_status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table camp_sessions enable row level security;
alter table camp_registrations enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'camp_sessions' and policyname = 'public read camp sessions'
  ) then
    create policy "public read camp sessions" on camp_sessions for select using (true);
  end if;
end $$;
