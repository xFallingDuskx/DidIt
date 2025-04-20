import { FlashList } from '@shopify/flash-list';
import { Dimensions } from 'react-native';
import { useTodoTab } from '../../contexts/TodoContext';
import { Todo } from '../../utils';
import TodoItem from './TodoItem';
import TodoViewPlaceholder from './TodoViewPlaceholder';

interface TodoListProps {
  todosAll: Todo[];
  todosByDate: Record<string, Todo[]>;
  todosUnplanned: Todo[];
  todosPastDue: Todo[];
}

export default function TodoList({ todosAll, todosUnplanned, todosPastDue }: TodoListProps) {
  const { tabView } = useTodoTab();

  let chosenTodos: Todo[] = [];
  switch (tabView) {
    case 'all':
      chosenTodos = todosAll;
      break;
    case 'by date':
      // TASK: show todos by date
      chosenTodos = todosAll;
      break;
    case 'unplanned':
      chosenTodos = todosUnplanned;
      break;
    case 'past due':
      chosenTodos = todosPastDue;
      break;
    default:
      break;
  }

  const renderItem = ({ item: todo, index }: { item: Todo; index: number }) => (
    <TodoItem todo={todo} isLastItem={index === chosenTodos.length - 1} />
  );

  const { width, height } = Dimensions.get('window');
  return (
    <FlashList
      data={chosenTodos}
      renderItem={renderItem}
      estimatedItemSize={40}
      estimatedListSize={{
        height: height,
        width: width,
      }}
      showsVerticalScrollIndicator={false}
      className='bg-surface-tab rounded-xl'
      ListEmptyComponent={<TodoViewPlaceholder />}
    />
  );
}
