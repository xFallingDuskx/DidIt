import { Session, User } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../supabase';
import { todos$, user$ } from '../utils/SupaLegend';
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
  user$.set({} as User);
  todos$.set({});
}

/**
 * Initialize user session and fetch data for the logged-in user
 * @param session The session object from Supabase
 */
async function fetchUserTodos(session: Session) {
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

interface SessionProviderProps {
  children: ReactNode;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const SessionProvider = ({ children, isLoading, setIsLoading }: SessionProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session.user?.id) {
        user$.set(session.user);
      }
      setIsLoading(false);
    });
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session || !session.user?.id) {
        clearState();
        setSession(session);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      await fetchUserTodos(session);
      setSession(session);
      user$.set(session.user);
      setIsLoading(false);
    });
  }, []);

  return <SessionContext.Provider value={{ session, isLoading }}>{children}</SessionContext.Provider>;
};
