import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import DateTimePicker from '../form/DateTimePicker';

type TodoInputActionItemType = 'dueDate' | 'dueTime';
interface TodoInputActionItemProps {
  type: TodoInputActionItemType;
}

const TypeMap: Record<TodoInputActionItemType, { icon: string; label: string }> = {
  dueDate: { icon: 'calendar-plus', label: 'Due Date' },
  dueTime: { icon: 'clock', label: 'Due Time' },
};

export default function TodoInputActionItem({ type }: TodoInputActionItemProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleChange = (event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate;
    console.log('currentDate', currentDate); // REMOVE
  };

  return (
    <>
      <Pressable onPress={() => setIsPickerOpen(true)} className='flex-row gap-1 items-center justify-center px-3 py-2 bg-white rounded-full shadow-md'>
        <FontAwesome6 name={TypeMap[type].icon} size={16} color='black' />
        <Text className='font-body-light'>{TypeMap[type].label}</Text>
      </Pressable>
      <DateTimePicker
        isOpen={isPickerOpen}
        mode={type === 'dueDate' ? 'date' : 'time'}
        value={new Date()}
        onChange={(event, selectedDate) => {
          handleChange(event, selectedDate);
          setIsPickerOpen(false);
        }}
      />
    </>
  );
}
