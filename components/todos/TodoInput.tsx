import moment from 'moment';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useTodoTab } from '../../contexts/TodoContext';
import { addTodo, EditableTodo } from '../../supalegend';
import { join } from '../../utils';
import Input from '../form/Input';
import TodoInputActionBar from './TodoInputActionBar';

export default function TodoInput() {
  const { inputRef, openPicker, resetInput, dueDate, dueTime, showDetails, searchBarInFocus } = useTodoTab();
  const [text, setText] = useState('');
  const [details, setDetails] = useState('');
  const [inFocus, setInFocus] = useState(false);
  const showAllOptions = inFocus || openPicker;

  const handleReset = () => {
    setText('');
    setDetails('');
    resetInput();
  };

  const handleSubmitEditing = () => {
    handleReset();
    const todoFields: EditableTodo = {
      text: text,
      details: details === '' ? null : details,
      due_date: dueDate ? moment.utc(dueDate).format('YYYY-MM-DD') : null,
      due_time: dueTime ? moment.utc(dueTime).format('HH:mm') : null,
    };

    if (todoFields.text?.length > 0) {
      addTodo(todoFields);
    }
  };

  // Reset input if focus is lost for 2 seconds
  useEffect(() => {
    let timeout;
    if (!inFocus && !openPicker) {
      timeout = setTimeout(() => {
        if (!inFocus) {
          resetInput();
          setDetails('');
        }
      }, 2000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [inFocus, openPicker]);

  if (searchBarInFocus) {
    return <></>;
  }

  const ParentView = Platform.OS === 'ios' ? KeyboardAvoidingView : View;

  return (
    <ParentView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className={join('flex w-screen')}>
      {showAllOptions && <TodoInputActionBar />}
      <View className={join('flex w-full pt-3 px-4 pb-3', inFocus ? 'bg-surface' : 'bg-surface-tab mt-2')}>
        <View className={join('flex-row gap-1 items-center w-full')}>
          <Input
            ref={inputRef}
            value={text}
            onChangeText={(text) => setText(text)}
            onSubmitEditing={handleSubmitEditing}
            setInFocus={setInFocus}
            placeholder='What do you want to do next?'
            className={join('input-rounded flex-1 !mb-0', inFocus && 'border-accent')}
          />
        </View>
        {showAllOptions && showDetails && (
          <Input
            value={details}
            onChangeText={(text) => setDetails(text)}
            onSubmitEditing={handleSubmitEditing}
            placeholder='Add details...'
            setInFocus={setInFocus}
            multiline={true}
            numberOfLines={4}
            submitBehavior='submit'
            className='px-4'
          />
        )}
      </View>
    </ParentView>
  );
}
