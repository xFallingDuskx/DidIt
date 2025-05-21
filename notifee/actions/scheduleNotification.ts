import notifee, { TimestampTrigger } from '@notifee/react-native';
import { timeoutAsyncFunction } from '../../utils';
import { createTodoReminderChannel } from '../channels';
import { requestNotificationPermissions } from '../config';
import { NotificationData } from '../util';

interface OnDisplayNotificationProps {
  id?: string;
  title?: string;
  body?: string;
  channelId?: string;
  data?: NotificationData;
  trigger: TimestampTrigger;
}

export async function scheduleNotification({
  id,
  title,
  body,
  channelId,
  data,
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

  const notificationId = await timeoutAsyncFunction(() =>
    notifee.createTriggerNotification(
      {
        id,
        title,
        body,
        data,
        android: {
          channelId: resolvedChannelId,
          pressAction: {
            id: 'default',
          },
        },
      },
      trigger,
    ),
  );
  return notificationId;
}
