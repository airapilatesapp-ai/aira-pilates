-- Aira Pilates: quiz contacts (leads) and follow-up e-mails.
-- Paste everything in Supabase > SQL Editor > New query, then click Run. Safe to run more than once.

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
