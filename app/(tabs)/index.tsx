import { Pressable } from 'react-native';
import {
  TabView,
  TodoDisplay,
  TodoInput,
  TodoSearch,
  TodoViewToggle,
} from '../../components';
import TodoDateFilter from '../../components/todos/TodoDateFilter';
import { TodoTabProvider } from '../../contexts/TodoContext';
import T from '../../components/util/T';
import { onDisplayNotification } from '../../notifee';
import { scheduleNotification } from '../../notifee/actions/scheduleNotification';

export default function Screen() {
  const handleNotificationPress = () => {
    // onDisplayNotification({});
    scheduleNotification({});
  };

  return (
    <TodoTabProvider>
      <TabView className="relative items-center !pb-0 justify-start pt-4">
        <T font="header" weight="semibold" className="text-2xl mb-1">
          Todos
        </T>
        <Pressable onPress={handleNotificationPress} className="mb-2">
          <T>Trigger Notification</T>
        </Pressable>
        <TodoViewToggle />
        <TodoSearch />
        <TodoDateFilter />
        <TodoDisplay />
        <TodoInput />
      </TabView>
    </TodoTabProvider>
  );
}
