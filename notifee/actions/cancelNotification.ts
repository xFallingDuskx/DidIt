import notifee from '@notifee/react-native';
import { timeoutAsyncFunction } from '../../utils';

export async function cancelNotification(notificationId: string) {
  return timeoutAsyncFunction(() => notifee.cancelNotification(notificationId));
}
