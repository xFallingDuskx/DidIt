import notifee from '@notifee/react-native';
import { createTodoReminderChannel } from '../channels';
import { requestNotificationPermissions } from '../config';
import { createFiveSecondTrigger } from './createTrigger';

interface OnDisplayNotificationProps {
  title?: string;
  body?: string;
}

// TASK: test on iOS
// TASK: show notification when app is in foreground
export async function scheduleNotification({
  title = 'Scheduled Todo Reminder',
  body = 'You have a new todo reminder.',
}: OnDisplayNotificationProps) {
  await requestNotificationPermissions();
  const channelId = await createTodoReminderChannel();
  const fiveSecondTrigger = createFiveSecondTrigger();

  console.log('scheduling notification'); // REMOVE
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
