import { Tables } from './database.types';
export { default as generateId } from './generateId';
export { default as join } from './join';
export type { Todo };

// Types
type Todo = Tables<'todos'>;

// Date & Time
export { isInCurrentYear } from './datetime';
