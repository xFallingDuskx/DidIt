-- Corrected SQL syntax for altering the table
alter table todos
  drop column due_at;

alter table todos
  add column due_date date default null;

alter table todos
  add column due_time time default null;