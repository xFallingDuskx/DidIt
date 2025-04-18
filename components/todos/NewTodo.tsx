import { useState } from 'react';
import { View } from 'react-native';
import { join } from '../../utils';
import { addTodo } from '../../utils/SupaLegend';
import Input from '../form/Input';

export default function NewTodo() {
  const [text, setText] = useState('');
  const [inFocus, setInFocus] = useState(false);

  const handleSubmitEditing = ({ nativeEvent: { text } }) => {
    setText('');
    addTodo(text);
  };

  return (
    <View className={join('w-screen px-4 pt-4', inFocus ? 'bg-surface' : 'bg-surface-tab')}>
      <Input
        value={text}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={handleSubmitEditing}
        setInFocus={setInFocus}
        placeholder='What do you want to do next?'
        className={join('input-rounded', inFocus && 'border-accent')}
      />
    </View>
  );
}
