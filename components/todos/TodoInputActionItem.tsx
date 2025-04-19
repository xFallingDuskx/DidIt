import { FontAwesome6 } from '@expo/vector-icons';
import moment from 'moment';
import { Platform, Pressable, Text } from 'react-native';
import { useTodoTab } from '../../contexts/TodoContext';
import { join } from '../../utils';
import DateTimePicker from '../form/DateTimePicker';

export type TodoInputActionItemType = 'dueDate' | 'dueTime';
interface TodoInputActionItemProps {
  type: TodoInputActionItemType;
  value?: string;
}

interface TodoInputActionItemInfo {
  icon: string;
  label: string;
  iconForValue?: string;
}

const TypeMap: Record<TodoInputActionItemType, TodoInputActionItemInfo> = {
  dueDate: { icon: 'calendar-plus', label: 'Due Date', iconForValue: 'calendar' },
  dueTime: { icon: 'clock', label: 'Due Time' },
};

export default function TodoInputActionItem({ type, value }: TodoInputActionItemProps) {
  const { inputRef, openPicker, setOpenPicker, dueDate, setDueDate, dueTime, setDueTime } = useTodoTab();

  const handleChange = (__event, newValue: Date | undefined) => {
    if (type === 'dueDate') {
      setDueDate(newValue);
    }

    if (type === 'dueTime') {
      setDueTime(newValue);
    }

    setOpenPicker(null); // Close the picker
    inputRef.current?.focus(); // Focus back on the input
  };

  return (
    <>
      <Pressable
        onPress={() => {
          setOpenPicker(type);
        }}
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
        <Text className='font-body-light'>{value || TypeMap[type].label}</Text>
      </Pressable>
      <DateTimePicker
        isOpen={openPicker === type}
        mode={type === 'dueDate' ? 'date' : 'time'}
        value={type === 'dueDate' ? dueDate : dueTime}
        onChange={handleChange}
      />
    </>
  );
}
