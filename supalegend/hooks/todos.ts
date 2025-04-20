import { useSelector } from '@legendapp/state/react';
import moment from 'moment';
import { todos$ } from '../observerables/todos';

export default function useTodos() {
  const _todos = useSelector(todos$) || {};
  const activeTodos = Object.values(_todos).filter((todo) => !todo.deleted);
  const incompleteTodos = activeTodos.filter((todo) => !todo.done);
  const completedTodos = activeTodos.filter((todo) => todo.done);

  // For 'all' view, sort by created_at
  const incompleteTodosAll = incompleteTodos.sort((a, b) => {
    return a.created_at.localeCompare(b.created_at);
  });
  const completedTodosAll = completedTodos.sort((a, b) => {
    return a.created_at.localeCompare(b.created_at);
  });
  const todosAll = [...incompleteTodosAll, ...completedTodosAll];

  // For 'by date' view, sort by date
  const todosByDate = todosAll.reduce((acc, todo) => {
    const date = todo.due_date;
    if (!date) {
      return acc;
    }

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(todo);
    return acc;
  }, {});

  // For 'unplanned' view, filter todos without due date
  const todosUnplanned = todosAll.filter((todo) => !todo.due_date);

  // For 'past due' view, filter todos with past due date
  const todosPastDue = incompleteTodos
    .filter((todo) => todo.due_date && moment(todo.due_date).isBefore(moment(), 'day'))
    .sort((a, b) => {
      return a.due_date.localeCompare(b.due_date);
    });

  return { todos: activeTodos, todosAll, todosByDate, todosUnplanned, todosPastDue };
}
