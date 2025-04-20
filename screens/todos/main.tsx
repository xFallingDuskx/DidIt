import { T, TabView, TodoInput, TodoList, TodoSelect } from '../../components';
import { TodoTabProvider } from '../../contexts/TodoContext';

export default function Screen() {
  return (
    <TodoTabProvider>
      <TabView className='relative items-center !pb-0 justify-start pt-4'>
        <T font='header' weight='semibold' className='text-2xl mb-1'>
          Todos
        </T>
        <TodoSelect />
        <TodoList />
        <TodoInput />
      </TabView>
    </TodoTabProvider>
  );
}
