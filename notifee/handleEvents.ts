import notifee, { EventDetail, EventType } from '@notifee/react-native';
import { router } from 'expo-router';
import { toggleDone } from '../supalegend';
import { TODO_ACTION_DID_IT, TODO_DATA_TYPE } from './constants';

// Used by Android to handle notifications when the app is in the background
// and the user clicks on them. iOS handles this automatically.
async function onInitial() {
  const initialNotification = await notifee.getInitialNotification();
  if (initialNotification) {
    const { notification, pressAction } = initialNotification;
    const detail: EventDetail = { notification, pressAction };
    setTimeout(() => {
      // give the app time to load
      onEvent(EventType.PRESS, detail, 'background');
    }, 3000);
  }
}

export async function onEvent(
  type: EventType,
  detail: EventDetail,
  __presence: 'foreground' | 'background',
) {
  const { notification, pressAction } = detail;
  const { id, data } = notification;

  switch (type) {
    case EventType.PRESS:
      // User clicks todo notification
      if (pressAction.id === 'default' && data.type === TODO_DATA_TYPE) {
        router.navigate({
          pathname: '/todos/[todoId]',
          params: { todoId: id },
        });
      }
      break;
    case EventType.ACTION_PRESS:
      if (pressAction.id === TODO_ACTION_DID_IT) {
        console.log('will mark todo as complete', id); // REMOVE
        // TASK: test toggle done in background
        // TASK: resolve circular dependency
        toggleDone(id, true);
      }
      break;
    default:
      break;
  }
}

export default async function onNotificationEvents() {
  const unsubscribeForegroundEvent = notifee.onForegroundEvent(
    async ({ type, detail }) => {
      onEvent(type, detail, 'foreground');
    },
  );

  onInitial();
  return { unsubscribeForegroundEvent };
}
