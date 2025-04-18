import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { addTodo } from '../../utils/SupaLegend';

const NewTodo = () => {
  const [text, setText] = useState('');

  const handleSubmitEditing = ({ nativeEvent: { text } }) => {
    setText('');
    addTodo(text);
  };

  return (
    <View className='bg-surface-tab w-screen px-4 pb-2 pt-4'>
      <TextInput
        value={text}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={handleSubmitEditing}
        placeholder='What do you want to do next?'
        className='bg-surface border-muted rounded-full border text-lg px-4'
      />
    </View>
  );
};

export default NewTodo;
