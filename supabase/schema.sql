-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query)
-- It creates every table the app needs and locks reads/writes down sensibly.

create table if not exists weekly_hours (
  id uuid primary key default gen_random_uuid(),
  week_start_date date not null,
  day_of_week smallint not null check (day_of_week between 0 and 6), -- 0 = Monday
  open_time time,
  close_time time,
  is_closed boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price_cents integer not null default 0,
  category text default 'Smoothies',
  is_available boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists trainers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text,
  bio text,
  certifications text,
  photo_url text,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists schedule_slots (
  id uuid primary key default gen_random_uuid(),
  week_start_date date not null,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  trainer_id uuid references trainers(id) on delete set null,
  service_type text not null default 'assessment', -- assessment, nutrition_consult, grocery_visit
  is_booked boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  slot_id uuid references schedule_slots(id) on delete set null,
  service_type text not null, -- assessment, nutrition_consult, grocery_visit, meal_prep, workout_plan
  client_name text not null,
  client_email text not null,
  client_phone text,
  notes text,
  amount_cents integer not null default 0,
  stripe_session_id text,
  payment_status text not null default 'not_required', -- not_required, pending, paid, canceled
  created_at timestamptz not null default now()
);

create table if not exists nutrition_responses (
  id uuid primary key default gen_random_uuid(),
  client_name text,
  client_email text,
  answers jsonb not null,
  created_at timestamptz not null default now()
);

-- Row Level Security: public site can only READ hours/menu/trainers/slots.
-- All writes (admin edits, bookings, nutrition submissions) go through
-- server-side API routes using the service role key, which bypasses RLS.
alter table weekly_hours enable row level security;
alter table menu_items enable row level security;
alter table trainers enable row level security;
alter table schedule_slots enable row level security;
alter table bookings enable row level security;
alter table nutrition_responses enable row level security;

create policy "public read hours" on weekly_hours for select using (true);
create policy "public read menu" on menu_items for select using (true);
create policy "public read trainers" on trainers for select using (true);
create policy "public read slots" on schedule_slots for select using (true);
-- No public policies on bookings / nutrition_responses: those only go through
-- the server (service role key), so client-side users can't read other people's data.
