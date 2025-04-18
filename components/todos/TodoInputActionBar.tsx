import { View } from 'react-native';
import TodoInputActionItem from './TodoInputActionItem';

export default function TodoInputActionBar() {
  return (
    <View className='flex-row items-center gap-2 pt-4 px-4 pb-2 overflow-x-auto'>
      <TodoInputActionItem type='dueDate' />
      <TodoInputActionItem type='dueTime' />
    </View>
  );
}
