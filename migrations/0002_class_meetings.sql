create table if not exists class_meetings (
  id text primary key,
  series_id text not null,
  course_code text not null,
  title text not null,
  meet_url text,
  starts_at timestamptz not null,
  duration_min integer not null default 90,
  status text not null default 'posted',
  roster text not null default '',
  populi_note text,
  posted_by text,
  created_at timestamptz not null default now()
);
create index if not exists class_meetings_starts_at_idx on class_meetings (starts_at);
create index if not exists class_meetings_series_id_idx on class_meetings (series_id);
