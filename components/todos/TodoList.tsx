import { observer } from '@legendapp/state/react';
import { FlashList } from '@shopify/flash-list';
import { Dimensions, Text } from 'react-native';
import { todos$ } from '../../utils/SupaLegend';
import { Tables } from '../../utils/database.types';
import TodoItem from './TodoItem';

const TodoList = observer(() => {
  // Get the todos from the state and subscribe to updates
  const todos = todos$.get();
  const { width, height } = Dimensions.get('window');

  const renderItem = ({ item: todo, index }: { item: Tables<'todos'>; index: number }) => (
    <TodoItem todo={todo} isLastItem={index === Object.keys(todos).length - 1} />
  );
  if (todos)
    return (
      <FlashList
        data={Object.values(todos)}
        renderItem={renderItem}
        estimatedItemSize={Object.keys(todos).length}
        estimatedListSize={{
          height: height,
          width: width,
        }}
        className='bg-surface-tab rounded-t-xl'
      />
    );

  return <Text>No todos available</Text>;
});

export default TodoList;
