import { useSelector } from '@legendapp/state/react';
import { FlashList } from '@shopify/flash-list';
import { Dimensions, Text } from 'react-native';
import { todos$ } from '../../supalegend';
import { Todo } from '../../utils';
import TodoItem from './TodoItem';

export default function TodoList() {
  const allTodos = useSelector(todos$) || {};
  const todos = Object.values(allTodos).filter((todo) => !todo.deleted);

  const renderItem = ({ item: todo, index }: { item: Todo; index: number }) => (
    <TodoItem todo={todo} isLastItem={index === todos.length - 1} />
  );

  const { width, height } = Dimensions.get('window');
  if (todos && todos.length > 0) {
    return (
      <FlashList
        data={todos}
        renderItem={renderItem}
        estimatedItemSize={40}
        estimatedListSize={{
          height: height,
          width: width,
        }}
        showsVerticalScrollIndicator={false}
        className='bg-surface-tab rounded-xl '
      />
    );
  }

  return <Text>No activeTodos available</Text>;
}
