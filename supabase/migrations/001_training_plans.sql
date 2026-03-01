-- Training Plans MVP — Supabase PostgreSQL migration
-- Tables: profiles, plans, test_results, subscriptions

-- ─── Profiles ───
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  handicap numeric(4,1),
  sessions_per_week integer check (sessions_per_week between 2 and 7),
  facilities text[] default '{}',
  goals text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ─── Plans ───
create type public.plan_tier as enum ('basis', 'standard', 'premium');
create type public.plan_status as enum ('generating', 'preview', 'paid', 'expired');

create table public.plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  tier public.plan_tier not null default 'basis',
  status public.plan_status not null default 'generating',

  -- Input snapshot (what the player selected)
  handicap numeric(4,1) not null,
  sessions_per_week integer not null,
  facilities text[] not null default '{}',
  season text not null,
  goals text,

  -- AI output
  category text not null,
  preview_data jsonb,    -- PlanPreview subset (shown before payment)
  full_plan jsonb,       -- Full GeneratedPlan (only accessible after payment)
  pdf_url text,          -- S3/Supabase Storage URL for Basis-tier PDF

  -- Stripe
  stripe_session_id text,
  stripe_payment_intent text,
  paid_at timestamptz,

  -- Metadata
  ai_model text,
  ai_tokens_used integer,
  generation_time_ms integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.plans enable row level security;

-- Anyone can view their own plans (by user_id or email for anonymous)
create policy "Users can view own plans"
  on public.plans for select
  using (auth.uid() = user_id);

create policy "Anon can view plan by id"
  on public.plans for select
  using (true);  -- Preview pages need public read access (content gated in app)

-- Service role handles inserts/updates via API routes

-- ─── Test Results ───
create table public.test_results (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.plans(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  test_date date not null default current_date,

  -- Putting
  putting_3m_accuracy numeric(5,2),
  putting_6m_accuracy numeric(5,2),

  -- Physical
  medicine_ball_throw numeric(5,2),
  vertical_jump numeric(5,2),
  hip_rotation_mobility numeric(5,2),

  -- Launch monitor
  driver_clubhead_speed numeric(5,2),
  iron7_clubhead_speed numeric(5,2),
  driver_carry_distance numeric(6,2),

  -- PEI (Precision Efficiency Index)
  pei_25m numeric(5,2),
  pei_50m numeric(5,2),
  pei_75m numeric(5,2),
  pei_100m numeric(5,2),
  pei_125m numeric(5,2),
  pei_150m numeric(5,2),

  -- On-course
  fairway_accuracy numeric(5,2),
  gir_simulation numeric(5,2),

  -- Mental
  focus_test numeric(5,2),
  preshot_routine_consistency numeric(5,2),
  competition_simulation numeric(5,2),

  notes text,
  created_at timestamptz default now()
);

alter table public.test_results enable row level security;

create policy "Users can view own test results"
  on public.test_results for select
  using (auth.uid() = user_id);

create policy "Users can insert own test results"
  on public.test_results for insert
  with check (auth.uid() = user_id);

create policy "Users can update own test results"
  on public.test_results for update
  using (auth.uid() = user_id);

-- ─── Subscriptions ───
create type public.subscription_status as enum ('active', 'past_due', 'canceled', 'incomplete');

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tier public.plan_tier not null,
  status public.subscription_status not null default 'incomplete',

  stripe_customer_id text not null,
  stripe_subscription_id text unique,

  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.subscriptions enable row level security;

create policy "Users can view own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- ─── Indexes ───
create index idx_plans_user_id on public.plans(user_id);
create index idx_plans_email on public.plans(email);
create index idx_plans_status on public.plans(status);
create index idx_plans_stripe_session on public.plans(stripe_session_id);
create index idx_test_results_plan_id on public.test_results(plan_id);
create index idx_test_results_user_id on public.test_results(user_id);
create index idx_subscriptions_user_id on public.subscriptions(user_id);
create index idx_subscriptions_stripe_sub on public.subscriptions(stripe_subscription_id);

-- ─── Updated At Trigger ───
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger set_plans_updated_at
  before update on public.plans
  for each row execute function public.handle_updated_at();

create trigger set_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.handle_updated_at();
