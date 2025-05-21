import notifee from '@notifee/react-native';
import { TODO_NOTIFICATION_ID } from './constants';
import { TODO_PRESS_ACTIONS } from './pressActions';

export async function createTodoReminderCategory() {
  await notifee.setNotificationCategories([
    {
      id: TODO_NOTIFICATION_ID,
      actions: TODO_PRESS_ACTIONS,
    },
  ]);

  return TODO_NOTIFICATION_ID;
}
