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
  const { inputRef, editingTodoId, setEditingTodoId, openPicker, resetInput, dueDate, dueTime } = useTodoTab();
  const [text, setText] = useState('');
  const [inFocus, setInFocus] = useState(false);

  const handleSubmitEditing = ({ nativeEvent: { text } }) => {
    setText('');
    resetInput();
    const todoFields: EditableTodo = {
      text,
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
    setText('');
  };

  // Reset input if focus is lost for 2 seconds
  useEffect(() => {
    let timeout;
    if (!inFocus && !openPicker) {
      timeout = setTimeout(() => {
        if (!inFocus) {
          resetInput();
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
      // Fetch the todo from the database and set it to the text state
      // This is a placeholder, replace with actual fetch logic
      const text = todos$.get()[editingTodoId]?.text;
      if (text) {
        setText(text);
      }
    }

    if (!editingTodoId) {
      setText('');
    }
  }, [editingTodoId]);

  return (
    <KeyboardAvoidingView behavior='padding' className={join('flex w-screen')}>
      {(inFocus || openPicker) && <TodoInputActionBar />}
      <View
        className={join(
          'flex-row gap-1 items-center w-full pt-3 px-4 pb-3',
          inFocus ? 'bg-surface' : 'bg-surface-tab mt-2'
        )}
      >
        <Input
          ref={inputRef}
          value={text}
          onChangeText={(text) => setText(text)}
          onSubmitEditing={handleSubmitEditing}
          setInFocus={setInFocus}
          placeholder='What do you want to do next?'
          className={join('input-rounded flex-1 mb-0 h-12 !py-0', inFocus && 'border-accent')}
        />
        {editingTodoId && (
          <Pressable className='bg-accent rounded-full py-2 px-3' onPress={handleCancelEditing}>
            <FontAwesome6 name='xmark' size={20} color='#fff' />
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
