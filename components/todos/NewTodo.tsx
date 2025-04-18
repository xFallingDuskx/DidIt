import { FontAwesome6 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTodoTab } from '../../contexts/TodoContext';
import { join } from '../../utils';
import { addTodo, editTodo, todos$ } from '../../utils/SupaLegend';
import Input from '../form/Input';

export default function NewTodo() {
  const { inputRef, editingTodoId, setEditingTodoId } = useTodoTab();
  const [text, setText] = useState('');
  const [inFocus, setInFocus] = useState(false);

  const handleSubmitEditing = ({ nativeEvent: { text } }) => {
    setText('');
    if (editingTodoId) {
      editTodo(editingTodoId, text);
      setEditingTodoId(null);
      return;
    }

    addTodo(text);
  };

  const handleCancelEditing = () => {
    setEditingTodoId(null);
    setText('');
  };

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
    <View
      className={join('flex-row gap-1 items-center w-screen px-4 pt-4 mb-4', inFocus ? 'bg-surface' : 'bg-surface-tab')}
    >
      <Input
        ref={inputRef}
        value={text}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={handleSubmitEditing}
        setInFocus={setInFocus}
        placeholder='What do you want to do next?'
        className={join('input-rounded flex-1 mb-0 h-16', inFocus && 'border-accent')}
      />
      {editingTodoId && (
        <Pressable className='bg-accent rounded-full py-2 px-3' onPress={handleCancelEditing}>
          <FontAwesome6 name='xmark' size={20} color='#fff' />
        </Pressable>
      )}
    </View>
  );
}
