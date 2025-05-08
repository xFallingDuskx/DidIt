import { cancelNotification, scheduleTodoNotification } from '../../notifee';
import { generateId, Todo } from '../../utils';
import { todos$ } from '../observerables/todos';
import { user$ } from '../observerables/user';

export type EditableTodo = Partial<
  Pick<Todo, 'text' | 'details' | 'due_date' | 'due_time' | 'use_local_time'>
>;

export async function addTodo(fields: EditableTodo) {
  const id = generateId();
  // Add keyed by id to the todos$ observable to trigger a create in Supabase
  todos$[id].assign({
    id,
    ...fields,
    user_id: user$.peek().id,
  });
  await scheduleTodoNotification({ id, ...fields });
}

export function editTodo(id: string, updates: EditableTodo) {
  todos$[id].assign({
    ...todos$[id].peek(),
    ...updates,
  });
  // TASK: check notification changes with edit
}

export function deleteTodo(id: string) {
  todos$[id].deleted.set(true);
  cancelNotification(id);
}

export function toggleDone(id: string) {
  const done = !todos$[id].done.peek();
  todos$[id].done.set(done);

  if (done) {
    cancelNotification(id);
  } else {
    scheduleTodoNotification(todos$[id].peek());
  }
}
