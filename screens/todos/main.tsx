import { Text } from 'react-native';
import { NewTodo, TabView, TodoList } from '../../components';
import { TodoTabProvider } from '../../contexts/TodoContext';

export default function Screen() {
  return (
    <TodoTabProvider>
      <TabView className='relative items-center justify-start'>
        <Text className='text-2xl font-header-semibold my-4'>Todos</Text>
        <TodoList />
        <NewTodo />
      </TabView>
    </TodoTabProvider>
  );
}
