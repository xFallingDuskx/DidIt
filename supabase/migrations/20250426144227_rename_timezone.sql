-- drop the existing timezone column
alter table todos
  drop column timezone;

-- add the new due_timezone column
alter table todos
  add column due_timezone text;

-- set a default value for due_timezone if needed
update todos
set due_timezone = 'America/New_York' -- replace with a sensible default
where due_timezone is null;

-- set the due_timezone column to not null if required
alter table todos
  alter column due_timezone set not null;