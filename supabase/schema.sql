-- Supabase schema for Arthur 60 RSVP
-- Run this entire script in Supabase → SQL Editor → New query → Run

-- ─── RSVPs table ───
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  attending boolean not null default true,
  bringing_guest boolean not null default false,
  guest_name text,
  guest_phone text,
  guest_email text,
  message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);
create index if not exists rsvps_email_idx on public.rsvps (email);

-- ─── Site settings (RSVP lock, etc.) ───
create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  rsvp_locked boolean not null default false,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id, rsvp_locked)
values (1, false)
on conflict (id) do nothing;

-- ─── Row Level Security ───
alter table public.rsvps enable row level security;
alter table public.site_settings enable row level security;

-- Public can submit RSVPs (lock is enforced in the Next.js API)
create policy "Public can insert RSVPs"
  on public.rsvps for insert
  to anon, authenticated
  with check (true);

-- No public read/update/delete on RSVPs — admin uses service role key in API
-- No public access to site_settings — admin uses service role key in API
