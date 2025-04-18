import { generateId } from '../../utils';
import { todos$ } from '../observerables/todos';
import { user$ } from '../observerables/user';

export async function addTodo(text: string) {
  const id = generateId();
  // Add keyed by id to the todos$ observable to trigger a create in Supabase
  todos$[id].assign({
    id,
    text,
    user_id: user$.peek().id,
  });
}

export function editTodo(id: string, text: string) {
  todos$[id].text.set(text);
  todos$[id].updated_at.set(new Date().toISOString());
}

export function deleteTodo(id: string) {
  todos$[id].deleted.set(true);
  todos$[id].updated_at.set(new Date().toISOString());
}

export function toggleDone(id: string) {
  todos$[id].done.set((prev) => !prev);
  todos$[id].updated_at.set(new Date().toISOString());
}
