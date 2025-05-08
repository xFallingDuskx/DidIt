import {
  TabView,
  TodoDisplay,
  TodoInput,
  TodoSearch,
  TodoViewToggle,
} from '../../components';
import TodoDateFilter from '../../components/todos/TodoDateFilter';
import T from '../../components/util/T';
import { TodoTabProvider } from '../../contexts/TodoContext';

export default function Screen() {
  return (
    <TodoTabProvider>
      <TabView className="relative items-center !pb-0 justify-start pt-4">
        <T font="header" weight="semibold" className="text-2xl mb-1">
          Todos
        </T>
        <TodoViewToggle />
        <TodoSearch />
        <TodoDateFilter />
        <TodoDisplay />
        <TodoInput />
      </TabView>
    </TodoTabProvider>
  );
}
