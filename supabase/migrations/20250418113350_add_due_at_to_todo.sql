alter table todos
  add column due_at timestamptz
  default null
  constraint todos_due_at_check
    check (due_at is null or due_at > now());