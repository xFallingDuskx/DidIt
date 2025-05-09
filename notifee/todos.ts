import { TimestampTrigger, TriggerType } from '@notifee/react-native';
import {
  dateWithTime,
  getUserCurrentTimezone,
  timezoneDateEquivalent,
  Todo,
} from '../utils';
import { scheduleNotification } from './actions/scheduleNotification';

function createDateAndTimeTrigger(date: Date): TimestampTrigger {
  return {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
  };
}

function getDateAndTime(
  dueDateString: string,
  dueTimeString: string,
  useLocalTime: boolean,
  originalTimezone: string,
): Date {
  if (useLocalTime) {
    const utcDate = dateWithTime(dueDateString, dueTimeString, 'UTC');
    const dateEquivalent = timezoneDateEquivalent(utcDate, originalTimezone);
    return dateEquivalent.date;
  }

  const adjustedDate = dateWithTime(dueDateString, dueTimeString);
  return adjustedDate;
}

export async function scheduleTodoNotification(todo: Partial<Todo>) {
  const id = todo?.id;
  if (!id) {
    console.error('Todo ID is required to schedule a notification');
    return;
  }

  const dueDateString = todo?.due_date;
  const dueTimeString = todo?.due_time;
  let trigger: TimestampTrigger;

  if (dueDateString && dueTimeString) {
    const dueDate = getDateAndTime(
      dueDateString,
      dueTimeString,
      todo?.use_local_time || false,
      todo?.due_timezone || getUserCurrentTimezone(),
    );
    trigger = createDateAndTimeTrigger(dueDate);
  }

  if (!trigger) {
    return;
  }

  const notificationID = await scheduleNotification({
    id,
    title: todo.text,
    body: todo?.details || undefined,
    trigger,
  });
  return notificationID;
}
