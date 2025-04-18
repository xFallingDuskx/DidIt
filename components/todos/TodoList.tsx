import { observer } from '@legendapp/state/react';
import { FlashList } from '@shopify/flash-list';
import { Dimensions, Text } from 'react-native';
import { activeTodos$ } from '../../supalegend';
import { Todo } from '../../utils';
import TodoItem from './TodoItem';

const TodoList = observer(() => {
  // Get the activeTodos from the state and subscribe to updates
  const activeTodos = Object.values(activeTodos$.get() || {});
  const { width, height } = Dimensions.get('window');

  const renderItem = ({ item: todo, index }: { item: Todo; index: number }) => (
    <TodoItem todo={todo} isLastItem={index === activeTodos.length - 1} />
  );
  if (activeTodos) {
    return (
      <FlashList
        data={activeTodos}
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
});

export default TodoList;
