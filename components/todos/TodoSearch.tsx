import { useState } from 'react';
import { useTodoTab } from '../../contexts/TodoContext';
import Input from '../form/Input';
import { join } from '../../utils';

export default function TodoSearch() {
  const { tabView, searchTerm, setSearchTerm } = useTodoTab();
  const [inFocus, setInFocus] = useState(false);

  if (tabView !== 'all') {
    return <></>;
  }

  return (
    <Input
      value={searchTerm}
      onChangeText={(text) => setSearchTerm(text)}
      setInFocus={setInFocus}
      placeholder='Search todos'
      enterKeyHint='search'
      className={join('input-rounded w-full mx-2', inFocus ? 'border-accent' : 'border-transparent')}
    />
  );
}
