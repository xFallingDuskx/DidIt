import { T, TabView, TodoDisplay, TodoInput, TodoSearch, TodoSelect } from '../../components';
import { TodoTabProvider } from '../../contexts/TodoContext';

export default function Screen() {
  return (
    <TodoTabProvider>
      <TabView className='relative items-center !pb-0 justify-start pt-4'>
        <T font='header' weight='semibold' className='text-2xl mb-1'>
          Todos
        </T>
        <TodoSelect />
        <TodoSearch />
        <TodoDisplay />
        <TodoInput />
      </TabView>
    </TodoTabProvider>
  );
}
