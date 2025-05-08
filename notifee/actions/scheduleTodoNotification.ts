import { TimestampTrigger, TriggerType } from '@notifee/react-native';
import { todos$ } from '../../supalegend/observerables/todos';
import {
  dateWithTime,
  getUserCurrentTimezone,
  timeoutAsyncFunction,
  timezoneDateEquivalent,
  Todo,
} from '../../utils';
import { scheduleNotification } from './scheduleNotification';

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
  // TEST: scheduling notification in local time
  if (useLocalTime) {
    const utcDate = dateWithTime(dueDateString, dueTimeString, 'UTC');
    const dateEquivalent = timezoneDateEquivalent(utcDate, originalTimezone);
    return dateEquivalent.date;
  }

  const adjustedDate = dateWithTime(dueDateString, dueTimeString);
  return adjustedDate;
}

export async function scheduleTodoNotification(
  todo: Partial<Todo>,
  todoId?: string,
) {
  const existingTodo = todos$.get()[todo.id];
  const dueDateString = todo?.due_date || existingTodo?.due_date;
  const dueTimeString = todo?.due_time || existingTodo?.due_time;
  let trigger: TimestampTrigger;

  if (dueDateString && dueTimeString) {
    const useLocalTime =
      todo?.use_local_time || existingTodo?.use_local_time || false;
    const dueTimezone =
      todo?.due_timezone ||
      existingTodo?.due_timezone ||
      getUserCurrentTimezone();
    const dueDate = getDateAndTime(
      dueDateString,
      dueTimeString,
      useLocalTime,
      dueTimezone,
    );
    trigger = createDateAndTimeTrigger(dueDate);
  }

  if (!todo.text) {
    console.log('No text — cannot schedule todo notification');
    return;
  }

  const id = todoId || todo?.id || existingTodo?.id;
  const scheduleNotificationFunc = scheduleNotification({
    id,
    title: todo.text,
    body: todo?.details || undefined,
    trigger,
  });
  const notificationID = await timeoutAsyncFunction(
    () => scheduleNotificationFunc,
  );
  console.log('scheduled notification', notificationID); // REMOVE
  return notificationID;
}
