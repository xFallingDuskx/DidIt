import { FlashList } from '@shopify/flash-list';
import moment from 'moment';
import { useCallback, useMemo } from 'react';
import { Dimensions } from 'react-native';
import { useTodoTab } from '../../contexts/TodoContext';
import { isInCurrentYear, Todo } from '../../utils';
import T from '../util/T';
import TodoItem from './TodoItem';
import TodoViewPlaceholder from './TodoViewPlaceholder';

interface TodoListProps {
  todosAll: Todo[];
  todosByDate: Record<string, Todo[]>;
  todosUnplanned: Todo[];
  todosPastDue: Todo[];
}

export default function TodoList({ todosAll, todosByDate, todosUnplanned, todosPastDue }: TodoListProps) {
  const { tabView, searchTerm } = useTodoTab();

  const filterTodos = useCallback(
    (todos: Todo[]) => {
      if (searchTerm === '') {
        return todos;
      }

      return todos.filter((todo) => {
        const searchTermLower = searchTerm.toLowerCase();
        if (todo.text.toLowerCase().includes(searchTermLower)) {
          return true;
        }
        if (todo.details && todo.details.toLowerCase().includes(searchTermLower)) {
          return true;
        }
        return false;
      });
    },
    [searchTerm]
  );

  const chosenTodos = useMemo(() => {
    switch (tabView) {
      case 'all':
        return filterTodos(todosAll);
      case 'unplanned':
        return todosUnplanned;
      case 'past due':
        return todosPastDue;
      default:
        return [];
    }
  }, [tabView, todosAll, todosUnplanned, todosPastDue, filterTodos]);

  const renderItem = ({ item: todo, index }: { item: Todo; index: number }) => (
    <TodoItem todo={todo} isLastItem={index === chosenTodos.length - 1} />
  );

  const { width, height } = Dimensions.get('window');

  if (tabView === 'by date') {
    let dataForList: (Todo | string)[] = [];
    let firstTodoIdByDate: Record<string, string> = {};
    let lastTodoIdByDate: Record<string, string> = {};
    for (const date in todosByDate) {
      dataForList.push(date);
      const todos = todosByDate[date];
      dataForList.push(...todos);
      firstTodoIdByDate[date] = todos[0].id;
      lastTodoIdByDate[date] = todos[todos.length - 1].id;
    }

    return (
      <FlashList
        data={dataForList}
        renderItem={({ item }) => {
          if (typeof item === 'string') {
            // Rendering header
            return (
              <T font='header' className='text-xl pb-1'>
                {isInCurrentYear(item) ? moment(item).format('ddd, MMM D') : moment(item).format('MMM D, YYYY')}
              </T>
            );
          } else {
            // Render item
            return (
              <TodoItem
                todo={item}
                isFirstItem={item.id === firstTodoIdByDate[item.due_date]}
                isLastItem={item.id === lastTodoIdByDate[item.due_date]}
                isForSection={true}
              />
            );
          }
        }}
        getItemType={(item) => {
          // To achieve better performance, specify the type based on the item
          return typeof item === 'string' ? 'sectionHeader' : 'row';
        }}
        showsVerticalScrollIndicator={false}
        estimatedListSize={{
          height: height,
          width: width,
        }}
        estimatedItemSize={50}
        contentContainerStyle={{
          paddingTop: 10,
        }}
        ListEmptyComponent={<TodoViewPlaceholder />}
      />
    );
  }

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
