import { FontAwesome6 } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';
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
    <Pressable
      key={todo.id}
      onPress={handlePress}
      className={join('flex-row gap-2 p-4 bg-surface', isLastItem && 'rounded-b-lg')}
    >
      <FontAwesome6 name={todo.done ? 'check-circle' : 'circle'} size={20} color='#000' />
      <Text className='text-lg'>{todo.text}</Text>
    </Pressable>
  );
}
