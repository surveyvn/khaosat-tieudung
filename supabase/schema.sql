create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  age smallint check (age between 1 and 120),
  gender text,
  household_size smallint check (household_size > 0),
  plan text not null default 'free' check (plan in ('free', 'plus')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.survey_submissions (
  id text primary key,
  user_id uuid references auth.users(id) on delete set null,
  respondent_id text not null,
  survey_code text not null,
  survey_name text not null,
  profile jsonb not null default '{}'::jsonb,
  answers jsonb not null default '{}'::jsonb,
  result jsonb not null default '{}'::jsonb,
  client_submitted_at timestamptz,
  received_at timestamptz not null default now(),
  app_version text,
  platform text not null default 'web',
  sync_status text not null default 'received'
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text not null,
  amount bigint not null check (amount > 0),
  spent_at date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.monthly_budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  month date not null,
  income bigint not null default 0,
  saving_target bigint not null default 0,
  unique (user_id, month)
);

create table if not exists public.impact_campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  status text not null default 'draft' check (status in ('draft', 'active', 'completed', 'suspended')),
  partner_name text,
  partner_legal_name text,
  conversion_rule jsonb not null default '{}'::jsonb,
  verification_summary text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.impact_interests (
  user_id uuid not null references auth.users(id) on delete cascade,
  campaign_id uuid not null references public.impact_campaigns(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, campaign_id)
);

create table if not exists public.impact_ledger (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.impact_campaigns(id) on delete cascade,
  activity_type text not null,
  quantity numeric not null check (quantity >= 0),
  unit text not null,
  evidence_url text not null,
  evidence_note text not null default '',
  verified_at timestamptz not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.survey_submissions enable row level security;
alter table public.expenses enable row level security;
alter table public.monthly_budgets enable row level security;
alter table public.impact_campaigns enable row level security;
alter table public.impact_interests enable row level security;
alter table public.impact_ledger enable row level security;

revoke all on table public.survey_submissions from anon, authenticated;

drop policy if exists "public can submit surveys" on public.survey_submissions;
create policy "public can submit surveys"
on public.survey_submissions for insert to anon, authenticated
with check (true);

create policy "users read own profile"
on public.profiles for select to authenticated
using ((select auth.uid()) = id);
create policy "users update own profile"
on public.profiles for update to authenticated
using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "users manage own expenses"
on public.expenses for all to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "users manage own budgets"
on public.monthly_budgets for all to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "public reads published impact campaigns"
on public.impact_campaigns for select to anon, authenticated
using (status in ('active', 'completed'));

create policy "public reads verified impact ledger"
on public.impact_ledger for select to anon, authenticated
using (verified_at is not null and evidence_url <> '');

create policy "users manage own impact interests"
on public.impact_interests for all to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

grant insert on public.survey_submissions to anon, authenticated;
grant select, insert, update, delete on public.profiles, public.expenses, public.monthly_budgets to authenticated;
grant select on public.impact_campaigns, public.impact_ledger to anon, authenticated;
grant select, insert, delete on public.impact_interests to authenticated;

create index if not exists survey_submissions_respondent_idx on public.survey_submissions(respondent_id);
create index if not exists survey_submissions_received_idx on public.survey_submissions(received_at desc);
create index if not exists expenses_user_date_idx on public.expenses(user_id, spent_at desc);
create index if not exists impact_campaigns_status_idx on public.impact_campaigns(status, published_at desc);
create index if not exists impact_ledger_campaign_idx on public.impact_ledger(campaign_id, verified_at desc);
