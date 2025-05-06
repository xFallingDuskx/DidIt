import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import moment from 'moment';
import { Alert, Pressable, View } from 'react-native';
import { deleteTodo, toggleDone } from '../../supalegend';
import { isInCurrentYear, isTodoPastDue, Todo } from '../../utils';
import join from '../../utils/join';
import T from '../util/T';

interface TodoItemProps {
  todo: Todo;
  isFirstItem?: boolean;
  isLastItem: boolean;
  isForSection?: boolean;
}

export default function TodoItem({
  todo,
  isFirstItem,
  isLastItem,
  isForSection = false,
}: TodoItemProps) {
  const router = useRouter();

  const handleStatusPress = () => {
    toggleDone(todo.id);
  };

  const handleEditPress = () => {
    router.navigate({
      pathname: '/todos/[todoId]',
      params: { todoId: todo.id },
    });
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
    <View
      key={todo.id}
      className={join(
        'flex-row gap-1 p-4 pl-2 bg-surface',
        isLastItem && 'rounded-b-xl',
        isFirstItem && 'rounded-t-xl',
        isForSection && isLastItem && 'mb-5',
      )}
    >
      <Pressable onPress={handleStatusPress} className="pl-2 pr-1">
        <FontAwesome6
          name={todo.done ? 'check-circle' : 'circle'}
          size={20}
          color={todo.done ? '#16a34a' : '#000'}
          className={join(todo.done && 'opacity-70')}
        />
      </Pressable>
      <Pressable
        className="flex-1 flex"
        onPress={handleEditPress}
        onLongPress={handleDeletePress}
      >
        <T
          weight="medium"
          className={join('flex-1 pr-4 text-lg', todo.done && 'line-through')}
        >
          {todo.text}
        </T>
        {todo.details && (
          <T
            ellipsizeMode="tail"
            numberOfLines={3}
            className={join(
              'flex-1 pr-4 text-sm text-muted',
              todo.done && 'line-through',
            )}
          >
            {todo.details}
          </T>
        )}
        {todo.due_date && (
          <View className="flex-row items-center gap-1">
            {!isForSection && (
              <T
                className={join(
                  'text-sm',
                  isTodoPastDue(todo) && !todo.done
                    ? 'text-danger'
                    : 'text-muted',
                )}
              >
                {isInCurrentYear(todo.due_date)
                  ? moment(todo.due_date).format('ddd, MMM D')
                  : moment(todo.due_date).format('MMM D, YYYY')}
              </T>
            )}
            {todo.due_time && (
              <T
                className={join(
                  'text-sm',
                  isTodoPastDue(todo) && !todo.done
                    ? 'text-danger'
                    : 'text-muted',
                )}
              >
                {!isForSection ? '@ ' : ''}
                {moment.utc(todo.due_time, 'HH:mm').local().format('h:mma')}
              </T>
            )}
          </View>
        )}
      </Pressable>
    </View>
  );
}
