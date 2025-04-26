-- TIMEZONE
alter table todos
  add column timezone text;

update todos
set timezone = 'America/New_York' -- for existing test data
where timezone is null;

alter table todos
  alter column timezone set not null;

-- USE LOCAL TIME
alter table todos
  add column use_local_time boolean
  default true;

update todos
set use_local_time = true
where use_local_time is null;

alter table todos
  alter column use_local_time set not null;