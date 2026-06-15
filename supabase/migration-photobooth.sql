-- Run this ONLY if you already set up the database with the original schema.
-- Supabase → SQL Editor → New query → paste → Run

-- Hotel booking field on RSVPs
alter table public.rsvps
  add column if not exists needs_hotel boolean not null default false;

-- Photobooth photos metadata
create table if not exists public.photobooth_photos (
  id uuid primary key default gen_random_uuid(),
  guest_name text,
  storage_path text not null,
  created_at timestamptz not null default now()
);

create index if not exists photobooth_photos_created_at_idx
  on public.photobooth_photos (created_at desc);

alter table public.photobooth_photos enable row level security;

-- Storage bucket for photobooth images (private; API uses service role)
insert into storage.buckets (id, name, public)
values ('photobooth', 'photobooth', false)
on conflict (id) do nothing;
