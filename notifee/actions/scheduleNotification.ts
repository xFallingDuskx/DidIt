import notifee from '@notifee/react-native';
import { createTodoReminderChannel } from '../channels';
import { requestNotificationPermissions } from '../config';
import { createFiveSecondTrigger } from './createTrigger';

interface OnDisplayNotificationProps {
  title?: string;
  body?: string;
}

export async function scheduleNotification({
  title = 'Scheduled Todo Reminder',
  body = 'You have a new todo reminder.',
}: OnDisplayNotificationProps) {
  await requestNotificationPermissions();
  const channelId = await createTodoReminderChannel();
  const fiveSecondTrigger = createFiveSecondTrigger();

  const notificationId = await notifee.createTriggerNotification(
    {
      title,
      body,
      android: {
        channelId,
      },
    },
    fiveSecondTrigger,
  );

  return notificationId;
}
