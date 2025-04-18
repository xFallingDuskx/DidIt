import { Text } from 'react-native';
import { TabView, TodoList } from '../../components';

export default function Screen() {
  return (
    <TabView className='relative items-center justify-start'>
      <Text className='text-2xl font-bold'>Todos</Text>
      <TodoList />
    </TabView>
  );
}
