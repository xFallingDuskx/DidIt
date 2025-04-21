import { useTodos } from '../../supalegend';
import TodoList from './TodoList';

export default function TodoDisplay() {
  const { todosAll, todosByDate, todosUnplanned, todosPastDue } = useTodos();

  return (
    <TodoList
      todosAll={todosAll}
      todosByDate={todosByDate}
      todosUnplanned={todosUnplanned}
      todosPastDue={todosPastDue}
    />
  );
}
