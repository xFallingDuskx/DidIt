import { Tables } from './database.types';
export { default as generateId } from './generateId';
export { default as join } from './join';

// Types
type Todo = Tables<'todos'>;
export type { Todo };

// Date & Time
export { isInCurrentYear } from './datetime';
