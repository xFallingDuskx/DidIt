import { observable } from '@legendapp/state';
import { User } from '@supabase/supabase-js';

export const user$ = observable<User>();
