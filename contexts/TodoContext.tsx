import { createContext, ReactNode, useContext, useRef, useState } from 'react';
import { Keyboard, TextInput } from 'react-native';
import { TodoInputActionItemType } from '../components/todos/TodoInputActionItem';

export type TodoTabView = 'all' | 'by date' | 'unplanned' | 'past due';

interface TodoTabContextType {
  editingTodoId: string | null;
  setEditingTodoId: (id: string | null) => void;
  inputRef: React.RefObject<TextInput>;
  openPicker: TodoInputActionItemType | null;
  setOpenPicker: (isOpen: TodoInputActionItemType | null) => void;
  dueDate: Date | null;
  setDueDate: (date: Date | null) => void;
  dueTime: Date | null;
  setDueTime: (date: Date | null) => void;
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
  resetInput: () => void;
  tabView: TodoTabView;
  setTabView: (view: TodoTabView) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const TodoContext = createContext<TodoTabContextType | undefined>(undefined);

export const TodoTabProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const inputRef = useRef<TextInput>(null);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [openPicker, setOpenPicker] = useState(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [dueTime, setDueTime] = useState<Date | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [tabView, setTabView] = useState<TodoTabView>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const resetInput = () => {
    setDueDate(null);
    setDueTime(null);
    setShowDetails(false);
  };

  const handleSetEditingTodoId = (id: string | null) => {
    setEditingTodoId(id);
    if (id) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
      Keyboard.dismiss();
    }
  };

  return (
    <TodoContext.Provider
      value={{
        inputRef,
        editingTodoId,
        setEditingTodoId: handleSetEditingTodoId,
        openPicker,
        setOpenPicker,
        dueDate,
        setDueDate,
        dueTime,
        setDueTime,
        showDetails,
        setShowDetails,
        tabView,
        setTabView,
        resetInput,
        searchTerm,
        setSearchTerm,
      }}
    >
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
