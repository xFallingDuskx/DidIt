import { FontAwesome6 } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { Tables } from '../../utils/database.types';
import join from '../../utils/join';
import { toggleDone } from '../../utils/SupaLegend';

interface TodoItemProps {
  todo: Tables<'todos'>;
  isLastItem: boolean;
}

export default function TodoItem({ todo, isLastItem }: TodoItemProps) {
  const handlePress = () => {
    toggleDone(todo.id);
  };

  return (
    <View key={todo.id} className={join('flex-row gap-2 p-4 bg-surface', isLastItem && 'rounded-b-xl')}>
      <Pressable onPress={handlePress}>
        <FontAwesome6
          name={todo.done ? 'check-circle' : 'circle'}
          size={20}
          color={todo.done ? '#16a34a' : '#000'}
          className={join(todo.done && 'opacity-70')}
        />
      </Pressable>
      <Text className={join('text-lg font-body-medium', todo.done && 'line-through')}>{todo.text}</Text>
    </View>
  );
}
