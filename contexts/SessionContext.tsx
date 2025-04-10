import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../supabase';
import { todos$ } from '../utils/SupaLegend';
import { Tables } from '../utils/database.types';

type SessionContextType = {
  session: Session | null;
  isLoading: boolean;
};

const SessionContext = createContext<SessionContextType>({} as SessionContextType);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

/** Clear the state of the app when the user logs out */
function clearState() {
  todos$.set({});
}

/**
 * Initialize user session and fetch data for the logged-in user
 * @param session The session object from Supabase
 */
async function fetchUserTodos(session: Session) {
  if (Object.keys(todos$.peek()).length > 0) return

  const { error, data } = await supabase.from('todos').select('*').eq('user_id', session.user.id);
  if (error) {
    Alert.alert('Error fetching todos:', error.message);
  }
  if (data) {
    const todosMap = data.reduce((acc, todo) => {
      acc[todo.id] = todo;
      return acc;
    }, {} as Record<string, Tables<'todos'>>);
    todos$.set(todosMap);
  }
}

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session || !session.user) {
        clearState();
        setSession(session);
        return;
      }

      setIsLoading(true);
      await fetchUserTodos(session);
      setSession(session);
      setIsLoading(false);
    });
  }, []);

  return <SessionContext.Provider value={{ session, isLoading }}>{children}</SessionContext.Provider>;
};
