import notifee from '@notifee/react-native';
import { createTodoReminderChannel } from '../channels';
import { requestNotificationPermissions } from '../config';

interface OnDisplayNotificationProps {
  title?: string;
  body?: string;
}

export async function onDisplayNotification({
  title = 'Todo Reminder',
  body = 'You have a new todo reminder.',
}: OnDisplayNotificationProps) {
  await requestNotificationPermissions();
  const channelId = await createTodoReminderChannel();

  const notificationId = await notifee.displayNotification({
    title,
    body,
    android: {
      channelId,
    },
  });

  return notificationId;
}
