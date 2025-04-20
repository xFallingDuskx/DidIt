import { FontAwesome6 } from '@expo/vector-icons';
import moment from 'moment';
import { Alert, Pressable, Text, View } from 'react-native';
import { useTodoTab } from '../../contexts/TodoContext';
import { deleteTodo, toggleDone } from '../../supalegend';
import { Todo } from '../../utils';
import join from '../../utils/join';

interface TodoItemProps {
  todo: Todo;
  isLastItem: boolean;
}

export default function TodoItem({ todo, isLastItem }: TodoItemProps) {
  const { setEditingTodoId } = useTodoTab();

  const handleStatusPress = () => {
    toggleDone(todo.id);
  };
  const handleEditPress = () => {
    setEditingTodoId(todo.id);
  };
  const handleDeletePress = () => {
    // FUTURE: create cloud function to delete todos
    Alert.alert('Delete Todo', 'Are you sure you want to delete this todo?', [
      {
        text: 'Nevermind',
        // onPress: () => Alert
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          deleteTodo(todo.id);
        },
      },
    ]);
  };

  return (
    <View key={todo.id} className={join('flex-row gap-2 p-4 bg-surface', isLastItem && 'rounded-b-xl')}>
      <Pressable onPress={handleStatusPress}>
        <FontAwesome6
          name={todo.done ? 'check-circle' : 'circle'}
          size={20}
          color={todo.done ? '#16a34a' : '#000'}
          className={join(todo.done && 'opacity-70')}
        />
      </Pressable>
      <View className='flex'>
        <Text
          onPress={handleEditPress}
          onLongPress={handleDeletePress}
          className={join('flex-1 text-lg font-body-medium', todo.done && 'line-through')}
        >
          {todo.text}
        </Text>
        {todo.details && (
          <Text
            onPress={handleEditPress}
            onLongPress={handleDeletePress}
            className={join('font-body text-sm text-gray-500', todo.done && 'line-through')}
          >
            {todo.details}
          </Text>
        )}
        {todo.due_date && (
          <View className='flex-row items-center gap-1'>
            <Text className='font-body text-sm text-gray-500'>{moment(todo.due_date).format('MMM D, YYYY')}</Text>
            {todo.due_time && (
              <Text className='font-body text-sm text-gray-500'>
                {'@'} {moment.utc(todo.due_time, 'HH:mm').local().format('h:mm A')}
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
