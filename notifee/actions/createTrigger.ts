import { TimestampTrigger, TriggerType } from '@notifee/react-native';

export function createFiveSecondTrigger(): TimestampTrigger {
  const now = new Date().getTime();
  const triggerTime = now + 5000; // 5 seconds from now

  return {
    type: TriggerType.TIMESTAMP,
    timestamp: triggerTime,
  };
}
