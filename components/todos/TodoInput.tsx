import { FontAwesome6 } from '@expo/vector-icons';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Pressable, View } from 'react-native';
import { useTodoTab } from '../../contexts/TodoContext';
import { addTodo, EditableTodo, editTodo, todos$ } from '../../supalegend';
import { join } from '../../utils';
import Input from '../form/Input';
import TodoInputActionBar from './TodoInputActionBar';

export default function TodoInput() {
  const {
    inputRef,
    editingTodoId,
    setEditingTodoId,
    openPicker,
    resetInput,
    dueDate,
    setDueDate,
    setDueTime,
    dueTime,
    showDetails,
    setShowDetails,
  } = useTodoTab();
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
    if (editingTodoId) {
      editTodo(editingTodoId, todoFields);
      setEditingTodoId(null);
      return;
    }

    addTodo(todoFields);
  };

  const handleCancelEditing = () => {
    setEditingTodoId(null);
    handleReset();
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

  useEffect(() => {
    if (editingTodoId) {
      const todo = todos$.get()[editingTodoId];
      if (!todo) return;

      setText(todo.text);

      if (todo.details) {
        setShowDetails(true);
        setDetails(todo.details);
      }
      if (todo.due_date) {
        setDueDate(moment(todo.due_date).toDate());
      }
      if (todo.due_time) {
        setDueTime(moment.utc(todo.due_time, 'HH:mm').local().toDate());
      }
    }

    if (!editingTodoId) {
      setText('');
    }
  }, [editingTodoId]);

  return (
    <KeyboardAvoidingView behavior='padding' className={join('flex w-screen')}>
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
          {editingTodoId && (
            <Pressable className='bg-accent rounded-full py-2 px-3' onPress={handleCancelEditing}>
              <FontAwesome6 name='xmark' size={20} color='#fff' />
            </Pressable>
          )}
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
    </KeyboardAvoidingView>
  );
}
