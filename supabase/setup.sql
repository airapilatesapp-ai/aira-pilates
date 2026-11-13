-- Aira Pilates: database setup.
-- Paste everything in Supabase > SQL Editor > New query, then click Run. Safe to run more than once.

-- 1) Who has paid, kept in sync by the Stripe webhook.
create table if not exists public.subscribers (
  email                  text primary key,
  stripe_customer_id     text unique,
  stripe_subscription_id text,
  status                 text not null default 'incomplete',  -- trialing, active, past_due, canceled, unpaid…
  plan                   text,                                -- monthly or yearly
  current_period_end     timestamptz,
  trial_end              timestamptz,
  cancel_at_period_end   boolean not null default false,
  updated_at             timestamptz not null default now()
);

alter table public.subscribers enable row level security;

-- Each customer can read only her own row. Only the server (secret key) can write.
drop policy if exists "subscribers: read own row" on public.subscribers;
create policy "subscribers: read own row" on public.subscribers
  for select to authenticated
  using (lower(email) = lower(auth.jwt() ->> 'email'));

-- 2) Each customer's progress in the app (streak, level, favourites…), so it follows her to a new phone.
create table if not exists public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

drop policy if exists "progress: read own" on public.progress;
create policy "progress: read own" on public.progress
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "progress: insert own" on public.progress;
create policy "progress: insert own" on public.progress
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "progress: update own" on public.progress;
create policy "progress: update own" on public.progress
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 3) A quick view for you: how many customers in each situation.
create or replace view public.subscriber_summary with (security_invoker = true) as
  select status, plan, count(*) as customers
  from public.subscribers
  group by status, plan
  order by status, plan;

-- 4) Quiz contacts and follow-up e-mails: see supabase/leads.sql (same content, can be run on its own).

create table if not exists public.leads (
  email         text primary key,
  name          text,
  lang          text not null default 'en',
  answers       jsonb not null default '{}'::jsonb,
  src           text,
  token         uuid not null unique default gen_random_uuid(),  -- used in "see my plan" and unsubscribe links
  emails_sent   int not null default 0,
  next_email_at timestamptz,
  converted_at  timestamptz,   -- filled when she starts the free trial
  unsubscribed  boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists leads_due on public.leads (next_email_at)
  where converted_at is null and unsubscribed = false;

-- Only the server (secret key) reads and writes this table. No public access.
alter table public.leads enable row level security;

-- A quick view for you: how the quiz is doing.
create or replace view public.lead_summary with (security_invoker = true) as
  select date_trunc('day', created_at)::date as day,
         count(*)                                   as quiz_emails,
         count(converted_at)                        as started_trial,
         round(100.0 * count(converted_at) / greatest(count(*), 1), 1) as trial_rate_pct
  from public.leads
  group by 1
  order by 1 desc;
