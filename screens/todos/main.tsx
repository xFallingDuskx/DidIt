import { T, TabView, TodoInput, TodoList } from '../../components';
import { TodoTabProvider } from '../../contexts/TodoContext';

export default function Screen() {
  return (
    <TodoTabProvider>
      <TabView className='relative items-center !pb-0 justify-start'>
        <T font='header' weight='semibold' className='text-2xl my-4'>
          Todos
        </T>
        <TodoList />
        <TodoInput />
      </TabView>
    </TodoTabProvider>
  );
}
