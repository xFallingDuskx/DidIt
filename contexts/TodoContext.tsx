import { createContext, ReactNode, useContext, useRef, useState } from 'react';
import { Keyboard, TextInput } from 'react-native';

interface TodoTabContextType {
  editingTodoId: string | null;
  setEditingTodoId: (id: string | null) => void;
  inputRef: React.RefObject<TextInput>;
}

const TodoContext = createContext<TodoTabContextType | undefined>(undefined);

export const TodoTabProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const inputRef = useRef<TextInput>(null);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const handleSetEditingTodoId = (id: string | null) => {
    setEditingTodoId(id);
    if (id) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
      Keyboard.dismiss();
    }
  };

  const handleSetInputRef = (ref: TextInput) => {
    inputRef.current = ref;
  };

  return (
    <TodoContext.Provider value={{ inputRef, editingTodoId, setEditingTodoId: handleSetEditingTodoId }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoTab = (): TodoTabContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoTab must be used within a TodoProvider');
  }
  return context;
};
