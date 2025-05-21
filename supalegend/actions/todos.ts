import { cancelNotification, scheduleTodoNotification } from '../../notifee';
import { generateId, Todo } from '../../utils';
import { todos$ } from '../observerables/todos';
import { user$ } from '../observerables/user';

export type EditableTodo = Partial<
  Pick<Todo, 'text' | 'details' | 'due_date' | 'due_time' | 'use_local_time'>
>;

export async function addTodo(fields: EditableTodo) {
  const id = generateId();
  todos$[id].assign({
    id,
    use_local_time: false,
    ...fields,
    user_id: user$.peek().id,
  });
  await scheduleTodoNotification({ id, ...fields });
}

export async function editTodo(id: string, updates: EditableTodo) {
  const updatedTodo: Todo = {
    ...todos$[id].peek(),
    ...updates,
  };
  todos$[id].assign(updatedTodo);
  await cancelNotification(id); // Cancel in case due date/time has changed or been removed
  await scheduleTodoNotification(updatedTodo);
}

export async function deleteTodo(id: string) {
  todos$[id].deleted.set(true);
  await cancelNotification(id);
}

export async function toggleDone(id: string) {
  const done = !todos$[id].done.peek();
  todos$[id].done.set(done);

  if (done) {
    await cancelNotification(id);
  } else {
    await scheduleTodoNotification(todos$[id].peek());
  }
}
