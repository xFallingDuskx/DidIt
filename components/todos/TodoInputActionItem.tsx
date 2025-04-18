import { FontAwesome6 } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';

type TodoInputActionItemType = 'dueDate' | 'dueTime';
interface TodoInputActionItemProps {
  type: TodoInputActionItemType;
}

export default function TodoInputActionItem({ type }: TodoInputActionItemProps) {
  const map: Record<TodoInputActionItemType, { icon: string; label: string }> = {
    dueDate: { icon: 'calendar-plus', label: 'Due Date' },
    dueTime: { icon: 'clock', label: 'Due Time' },
  };

  return (
    <Pressable className='flex-row gap-1 items-center justify-center px-3 py-2 bg-white rounded-full shadow-md'>
      <FontAwesome6 name={map[type].icon} size={16} color='black' />
      <Text className='font-body-light'>{map[type].label}</Text>
    </Pressable>
  );
}
