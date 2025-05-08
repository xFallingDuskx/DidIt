import notifee, { TimestampTrigger } from '@notifee/react-native';
import { timeoutAsyncFunction } from '../../utils';
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
  title,
  body,
  channelId,
  trigger,
}: OnDisplayNotificationProps) {
  await requestNotificationPermissions();
  const resolvedChannelId = channelId || (await createTodoReminderChannel());

  if (!title) {
    console.error('Title is required to schedule a notification');
    return;
  }
  if (!trigger) {
    console.error('Trigger is required to schedule a notification');
    return;
  }

  const createTriggerNotificationFunc = notifee.createTriggerNotification(
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

  const notificationId = await timeoutAsyncFunction(
    () => createTriggerNotificationFunc,
  );
  return notificationId;
}
