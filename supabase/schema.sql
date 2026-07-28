create table if not exists public.se_teuk_records (
  id uuid primary key default gen_random_uuid(),
  student_identifier text not null,
  grade smallint not null check (grade between 1 and 3),
  subject text not null,
  activity_title text not null,
  input_payload jsonb not null default '{}'::jsonb,
  draft_text text not null,
  review_notes jsonb not null default '[]'::jsonb,
  model text default 'Gemini 3.5 Flash-Lite',
  created_at timestamptz not null default now()
);
create index if not exists se_teuk_records_created_at_idx on public.se_teuk_records (created_at desc);
alter table public.se_teuk_records enable row level security;
-- ?꾨줈?뺤뀡?먯꽌??Supabase Auth ?ъ슜?먮퀎 ?뺤콉??異붽??섏꽭??

