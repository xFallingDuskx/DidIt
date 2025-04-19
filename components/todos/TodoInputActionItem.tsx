import { FontAwesome6 } from '@expo/vector-icons';
import { Platform, Pressable, Text } from 'react-native';
import { useTodoTab } from '../../contexts/TodoContext';
import { join } from '../../utils';
import DateTimePicker from '../form/DateTimePicker';

export type TodoInputActionItemType = 'dueDate' | 'dueTime';
interface TodoInputActionItemProps {
  type: TodoInputActionItemType;
}

const TypeMap: Record<TodoInputActionItemType, { icon: string; label: string }> = {
  dueDate: { icon: 'calendar-plus', label: 'Due Date' },
  dueTime: { icon: 'clock', label: 'Due Time' },
};

export default function TodoInputActionItem({ type }: TodoInputActionItemProps) {
  const { inputRef, openPicker, setOpenPicker } = useTodoTab();

  const handleChange = (event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate;
    console.log('currentDate', currentDate); // REMOVE

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
        <FontAwesome6 name={TypeMap[type].icon} size={16} color='black' />
        <Text className='font-body-light'>{TypeMap[type].label}</Text>
      </Pressable>
      <DateTimePicker
        isOpen={openPicker === type}
        mode={type === 'dueDate' ? 'date' : 'time'}
        value={new Date()}
        onChange={handleChange}
      />
    </>
  );
}
