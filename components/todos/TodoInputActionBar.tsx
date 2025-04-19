import { View } from 'react-native';
import TodoInputActionItem from './TodoInputActionItem';
import { useState } from 'react';

export default function TodoInputActionBar() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <View className='flex-row items-center gap-2 pt-4 px-4 pb-2 overflow-x-auto'>
      <TodoInputActionItem type='dueDate' />
      {date && <TodoInputActionItem type='dueTime' />}
    </View>
  );
}
