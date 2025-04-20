import { FontAwesome6 } from '@expo/vector-icons';
import { Platform, Pressable } from 'react-native';
import { join } from '../../utils';
import T from '../util/T';

export type TodoInputActionItemType = 'dueDate' | 'dueTime' | 'details';
interface TodoInputActionItemProps {
  type: TodoInputActionItemType;
  onPress: () => void;
  value?: string;
}

interface TodoInputActionItemInfo {
  icon: string;
  label: string;
  iconForValue?: string;
}

const TypeMap: Record<TodoInputActionItemType, TodoInputActionItemInfo> = {
  dueDate: { icon: 'calendar-plus', label: 'Date', iconForValue: 'calendar' },
  dueTime: { icon: 'clock', label: 'Time' },
  details: { icon: 'd', label: 'Details' },
};

export default function TodoInputActionItem({ type, value, onPress }: TodoInputActionItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className={join(
        'flex-row gap-1 items-center justify-center px-3 py-2 bg-white rounded-full',
        Platform.OS === 'ios' && 'shadow'
      )}
    >
      <FontAwesome6
        name={value && TypeMap[type].iconForValue ? TypeMap[type].iconForValue : TypeMap[type].icon}
        size={16}
        color='black'
      />
      <T weight='medium'>{value || TypeMap[type].label}</T>
    </Pressable>
  );
}
