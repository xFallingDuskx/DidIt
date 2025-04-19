import { generateId, Todo } from '../../utils';
import { todos$ } from '../observerables/todos';
import { user$ } from '../observerables/user';

export type EditableTodo = Partial<Pick<Todo, 'text' | 'due_date' | 'due_time'>>;

export async function addTodo(fields: EditableTodo) {
  const id = generateId();
  // Add keyed by id to the todos$ observable to trigger a create in Supabase
  todos$[id].assign({
    id,
    ...fields,
    user_id: user$.peek().id,
  });
}

export function editTodo(id: string, updates: EditableTodo) {
  todos$[id].assign({
    ...updates,
    updated_at: new Date().toISOString(),
  });
}

export function deleteTodo(id: string) {
  todos$[id].deleted.set(true);
  todos$[id].updated_at.set(new Date().toISOString());
}

export function toggleDone(id: string) {
  todos$[id].done.set((prev) => !prev);
  todos$[id].updated_at.set(new Date().toISOString());
}
