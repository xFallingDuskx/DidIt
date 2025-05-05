import notifee, { AuthorizationStatus } from '@notifee/react-native';

// Request permissions (required for iOS)
export async function requestNotificationPermissions() {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    return true;
  }

  console.log('no notification permissions given');
  return false;
}
