import moment from 'moment';
import { Tables } from './database.types';
import { dateWithTime, isPastDate } from './datetime';

// also typing here to prevent circular dependency
type Todo = Tables<'todos'>;

export function isTodoPastDue(todo: Todo) {
  if (!todo.due_date) {
    return false;
  }

  if (
    todo.due_time &&
    !isPastDate(dateWithTime(todo.due_date, todo.due_time))
  ) {
    return false;
  }

  return isPastDate(moment(todo.due_date).toDate());
}
