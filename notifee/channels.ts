// Channels are required for Android notifications
import notifee, { AndroidImportance } from '@notifee/react-native';

export async function createTodoReminderChannel() {
  // Create a channel (required for Android)
  return await notifee.createChannel({
    id: 'todo-reminders',
    name: 'Todo Reminders',
    importance: AndroidImportance.DEFAULT,
    sound: 'default',
    vibration: true,
  });
}
