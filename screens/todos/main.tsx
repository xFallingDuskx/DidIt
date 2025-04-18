import { Text } from 'react-native';
import { TodoInput, TabView, TodoList } from '../../components';
import { TodoTabProvider } from '../../contexts/TodoContext';

export default function Screen() {
  return (
    <TodoTabProvider>
      <TabView className='relative items-center justify-start'>
        <Text className='text-2xl font-header-semibold my-4'>Todos</Text>
        <TodoList />
        <TodoInput />
      </TabView>
    </TodoTabProvider>
  );
}
