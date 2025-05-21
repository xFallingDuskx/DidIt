// Channels are required for Android notifications
import notifee, { AndroidImportance } from '@notifee/react-native';
import { TODO_NOTIFICATION_ID } from './constants';

export async function createTodoReminderChannel() {
  // Create a channel (required for Android)
  return await notifee.createChannel({
    id: TODO_NOTIFICATION_ID,
    name: 'Todo Reminders',
    importance: AndroidImportance.DEFAULT,
    sound: 'default',
    vibration: true,
  });
}
