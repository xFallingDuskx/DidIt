import { useTodoTab } from '../../contexts/TodoContext';
import SearchInput from '../form/SearchInput';

export default function TodoSearch() {
  const { tabView, searchTerm, setSearchTerm, setSearchBarInFocus } =
    useTodoTab();

  if (tabView !== 'all') {
    return <></>;
  }

  return (
    <SearchInput
      query={searchTerm}
      setQuery={(text) => setSearchTerm(text)}
      setInFocus={setSearchBarInFocus}
      placeholder="Search todos"
      className="mx-6 w-full"
    />
  );
}
