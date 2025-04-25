import { useSelector } from '@legendapp/state/react';
import { isTodoPastDue, Todo } from '../../utils';
import { todos$ } from '../observerables/todos';

// PERFORMANCE: this does multiple passes over the todos array, which is not ideal.
export default function useTodos() {
  const _todos = useSelector(todos$) || {};
  const activeTodos = Object.values(_todos).filter((todo) => !todo.deleted);

  const incompleteTodos = activeTodos.filter((todo) => !todo.done);
  const completedTodos = activeTodos.filter((todo) => todo.done);

  // For 'all' view, sort by created_at
  const incompleteTodosAll = incompleteTodos.sort((a, b) => {
    return -(a.created_at ?? '').localeCompare(b.created_at ?? '');
  });
  const completedTodosAll = completedTodos.sort((a, b) => {
    return -(a.created_at ?? '').localeCompare(b.created_at ?? '');
  });
  const todosAll = [...incompleteTodosAll, ...completedTodosAll];

  // For 'by date' view, sort by date
  const todosByDate: Record<string, Todo[]> = todosAll.reduce((acc, todo) => {
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
  const sortedDates = Object.keys(todosByDate).sort((a, b) => {
    return a.localeCompare(b);
  });

  const sortedTodosByDate = sortedDates.reduce((acc, date) => {
    acc[date] = todosByDate[date];
    return acc;
  }, {});

  // For 'unplanned' view, filter todos without due date
  const todosUnplanned = todosAll.filter((todo) => !todo.due_date);

  // For 'past due' view, filter todos with past due date
  const todosPastDue = incompleteTodos.filter(isTodoPastDue).sort((a, b) => {
    return a.due_date.localeCompare(b.due_date);
  });

  return { todos: activeTodos, todosAll, todosByDate: sortedTodosByDate, todosUnplanned, todosPastDue };
}
