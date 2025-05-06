import { Tables } from './database.types';
export { default as capitalize } from './capitalize';
export { default as generateId } from './generateId';
export { default as join } from './join';
export type { Todo };

// Types
type Todo = Tables<'todos'>;

// Date & Time
export {
  dateWithTime,
  isInCurrentYear,
  isPastDate,
  timezoneDateEquivalent,
  useCurrentDate,
} from './datetime';

// Util
export { default as timeoutAsyncFunction } from './timeoutAsyncFunction';

// Todos
export { isTodoPastDue } from './todoUtils';
