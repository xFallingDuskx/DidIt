-- Add user_id column ass nullable
alter table todos
    add column user_id uuid references auth.users;

-- Populate the column with a default value for existing rows
update todos
set user_id = 'aa12e9e3-1d4e-409b-b3b1-df61951b6769' -- test user
where user_id is null;

-- Alter the column to be not null
alter table todos
    alter column user_id set not null;

-- Enable RLS
alter table todos enable row level security;
create policy "Individuals can create todos." on todos for
    insert with check (auth.uid() = user_id);
create policy "Individuals can view their own todos. " on todos for
    select using ((select auth.uid()) = user_id);
create policy "Individuals can update their own todos." on todos for
    update using ((select auth.uid()) = user_id);
create policy "Individuals can delete their own todos." on todos for
    delete using ((select auth.uid()) = user_id);