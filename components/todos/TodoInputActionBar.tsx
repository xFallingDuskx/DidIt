import moment from 'moment';
import { View } from 'react-native';
import { useTodoTab } from '../../contexts/TodoContext';
import TodoInputActionItem from './TodoInputActionItem';

export default function TodoInputActionBar() {
  const { dueDate } = useTodoTab();

  return (
    <View className='flex-row items-center gap-2 pt-4 px-4 pb-2 overflow-x-auto'>
      <TodoInputActionItem type='dueDate' value={dueDate ? moment(dueDate).format('dddd, MMMM D, YYYY') : undefined} />
      {dueDate && <TodoInputActionItem type='dueTime' />}
    </View>
  );
}
