import { createContext, ReactNode, useContext, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { TodoInputActionItemType } from '../components/todos/TodoInputActionItem';

export type TodoTabView = 'all' | 'by date' | 'unplanned' | 'past due';
export type TodoByDateOptions = 'today' | 'next 3 days' | 'this week' | 'next week';

// in the format YYYY-MM-DD
export interface DateRange {
  start: string;
  end: string;
}

interface TodoTabContextType {
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
  searchBarInFocus: boolean;
  setSearchBarInFocus: (inFocus: boolean) => void;
  byDateRange: DateRange | null;
  setByDateRange: (range: DateRange | null) => void;
}

const TodoContext = createContext<TodoTabContextType | undefined>(undefined);

export const TodoTabProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const inputRef = useRef<TextInput>(null);
  const [openPicker, setOpenPicker] = useState(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [dueTime, setDueTime] = useState<Date | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [tabView, setTabView] = useState<TodoTabView>('by date');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchBarInFocus, setSearchBarInFocus] = useState(false);
  const [byDateRange, setByDateRange] = useState<DateRange | null>(null);

  const resetInput = () => {
    setDueDate(null);
    setDueTime(null);
    setShowDetails(false);
  };

  return (
    <TodoContext.Provider
      value={{
        inputRef,
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
        searchBarInFocus,
        setSearchBarInFocus,
        byDateRange,
        setByDateRange,
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
