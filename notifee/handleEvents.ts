import notifee, { EventDetail, EventType } from '@notifee/react-native';
import { router } from 'expo-router';

// Used by Android to handle notifications when the app is in the background
// and the user clicks on them. iOS handles this automatically.
async function onInitial() {
  const initialNotification = await notifee.getInitialNotification();
  if (initialNotification) {
    const { notification, pressAction } = initialNotification;
    const detail: EventDetail = { notification, pressAction };
    onEvent(EventType.PRESS, detail, 'background');
  }
}

async function onEvent(
  type: EventType,
  detail: EventDetail,
  __presence: 'foreground' | 'background',
) {
  const { notification, pressAction } = detail;
  const { id, data } = notification;

  // User clicks todo notification
  if (
    type === EventType.PRESS &&
    pressAction.id === 'default' &&
    data.type === 'todo-with-time' &&
    id
  ) {
    router.navigate({
      pathname: '/todos/[todoId]',
      params: { todoId: id },
    });
  }
}

export default async function onNotificationEvents() {
  onInitial();

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    onEvent(type, detail, 'background');
  });

  const unsubscribeForegroundEvent = notifee.onForegroundEvent(
    async ({ type, detail }) => {
      onEvent(type, detail, 'foreground');
    },
  );

  return { unsubscribeForegroundEvent };
}
