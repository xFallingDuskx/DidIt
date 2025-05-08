import notifee, { TimestampTrigger } from '@notifee/react-native';
import { createTodoReminderChannel } from '../channels';
import { requestNotificationPermissions } from '../config';

interface OnDisplayNotificationProps {
  id?: string;
  title?: string;
  body?: string;
  channelId?: string;
  trigger: TimestampTrigger;
}

// TASK: write function to delete notification
export async function scheduleNotification({
  id,
  title = 'Scheduled Todo Reminder',
  body = 'You have a new todo reminder.',
  channelId,
  trigger,
}: OnDisplayNotificationProps) {
  await requestNotificationPermissions();
  const resolvedChannelId = channelId || (await createTodoReminderChannel());

  if (!trigger) {
    console.error('Trigger is required to schedule a notification');
    return;
  }

  const notificationId = await notifee.createTriggerNotification(
    {
      id,
      title,
      body,
      android: {
        channelId: resolvedChannelId,
      },
    },
    trigger,
  );

  return notificationId;
}
