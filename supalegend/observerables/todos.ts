import { observable } from '@legendapp/state';
import { supabase } from '../../supabase/index';
import { customSynced } from '../config';

// use_local_time = `true` means to keep the time consistent between timezones (e.g. 8:00 AM in New York is 8:00 AM in London)
export const todos$ = observable(
  customSynced({
    supabase,
    collection: 'todos',
    select: (from) =>
      from.select(
        'id,user_id,counter,text,details,done,created_at,updated_at,due_date,due_time,due_timezone,use_local_time,deleted',
      ),
    actions: ['read', 'create', 'update', 'delete'],
    realtime: true,
    // Persist data and pending changes locally
    persist: {
      name: 'todos',
      retrySync: true, // Persist pending changes and retry
    },
    retry: {
      infinite: true, // Retry changes with exponential backoff
    },
  }),
);
