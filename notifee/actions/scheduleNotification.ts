import notifee, { TimestampTrigger } from '@notifee/react-native';
import { timeoutAsyncFunction } from '../../utils';
import { createTodoReminderCategory } from '../categories';
import { createTodoReminderChannel } from '../channels';
import { requestNotificationPermissions } from '../config';
import { PressAction } from '../pressActions';
import { NotificationData } from '../util';

interface OnDisplayNotificationProps {
  id?: string;
  title?: string;
  body?: string;
  channelId?: string;
  categoryId?: string;
  data?: NotificationData;
  trigger: TimestampTrigger;
  androidPressActions?: PressAction[];
}

export async function scheduleNotification({
  id,
  title,
  body,
  channelId,
  categoryId,
  data,
  trigger,
  androidPressActions,
}: OnDisplayNotificationProps) {
  await requestNotificationPermissions();
  const resolvedChannelId = channelId || (await createTodoReminderChannel());
  const resolvedCategoryId = categoryId || (await createTodoReminderCategory());

  if (!title) {
    console.error('Title is required to schedule a notification');
    return;
  }
  if (!trigger) {
    console.error('Trigger is required to schedule a notification');
    return;
  }
  if (trigger.timestamp < Date.now()) {
    console.log(
      'Trigger timestamp must be in the future to schedule a notification',
    );
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
          actions: [
            ...androidPressActions.map((action) => ({
              title: action.title,
              pressAction: {
                id: action.id,
              },
            })),
          ],
        },
        ios: {
          categoryId: resolvedCategoryId,
        },
      },
      trigger,
    ),
  );
  return notificationId;
}
