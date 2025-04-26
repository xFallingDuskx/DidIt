import { generateId, Todo } from '../../utils';
import { todos$ } from '../observerables/todos';
import { user$ } from '../observerables/user';

export type EditableTodo = Partial<Pick<Todo, 'text' | 'details' | 'due_date' | 'due_time' | 'use_local_time'>>;

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
    ...todos$[id].peek(),
    ...updates,
  });
}

export function deleteTodo(id: string) {
  todos$[id].deleted.set(true);
}

export function toggleDone(id: string) {
  todos$[id].done.set((prev) => !prev);
}
