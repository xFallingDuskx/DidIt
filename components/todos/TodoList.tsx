import { observer } from '@legendapp/state/react';
import { FlashList } from '@shopify/flash-list';
import { Dimensions, Text } from 'react-native';
import { todos$ } from '../../utils/SupaLegend';
import { Tables } from '../../utils/database.types';
import TodoItem from './TodoItem';

const TodoList = observer(() => {
  // Get the todos from the state and subscribe to updates
  const todos = todos$.get() || {};
  const filteredTodos = Object.values(todos).filter((todo) => !todo.deleted);
  const { width, height } = Dimensions.get('window');

  const renderItem = ({ item: todo, index }: { item: Tables<'todos'>; index: number }) => (
    <TodoItem todo={todo} isLastItem={index === filteredTodos.length - 1} />
  );
  if (todos) {
    return (
      <FlashList
        data={filteredTodos}
        renderItem={renderItem}
        estimatedItemSize={Object.keys(todos).length}
        estimatedListSize={{
          height: height,
          width: width,
        }}
        showsVerticalScrollIndicator={false}
        className='bg-surface-tab rounded-xl '
      />
    );
  }

  return <Text>No todos available</Text>;
});

export default TodoList;
