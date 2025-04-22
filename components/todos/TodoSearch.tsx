import { useTodoTab } from '../../contexts/TodoContext';
import { join } from '../../utils';
import Input from '../form/Input';

export default function TodoSearch() {
  const { tabView, searchTerm, setSearchTerm, searchBarInFocus, setSearchBarInFocus } = useTodoTab();

  if (tabView !== 'all') {
    return <></>;
  }

  return (
    <Input
      key='todo-search'
      value={searchTerm}
      onChangeText={(text) => setSearchTerm(text)}
      setInFocus={setSearchBarInFocus}
      placeholder='Search todos'
      enterKeyHint='search'
      className={join('input-rounded w-full mx-2', searchBarInFocus ? 'border-accent' : 'border-transparent')}
    />
  );
}
