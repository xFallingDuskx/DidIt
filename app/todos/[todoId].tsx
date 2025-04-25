import { FontAwesome6 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, TextInput, View } from 'react-native';
import { ScreenView, T } from '../../components';
import { deleteTodo, EditableTodo, editTodo, todos$ } from '../../supalegend';

export default function TodosDetailedView() {
  const router = useRouter();
  const { todoId } = useLocalSearchParams();
  const todos = todos$.get();
  const todo = useMemo(() => {
    if (typeof todoId !== 'string') {
      return null;
    }
    const todoItem = todos[todoId];
    return todoItem;
  }, [todoId, todos]);
  const [todoChanges, setTodoChanges] = useState<EditableTodo>({});

  const handleEdit = (updates: EditableTodo) => {
    setTodoChanges({ ...todoChanges, ...updates });
  };

  const handleSave = () => {
    if (Object.keys(todoChanges).length > 0) {
      editTodo(todo.id, todoChanges);
      setTodoChanges({});
    }
  };

  const handleDelete = () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this todo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          router.back();
          deleteTodo(todo.id);
        },
      },
    ]);
  };

  if (!todo) {
    return (
      <ScreenView className='py-2 px-4'>
        <Pressable onPress={() => router.back()} className='p-2'>
          <FontAwesome6 name='chevron-left' size={20} color='#64748b' />
        </Pressable>
        <View className='flex-1 items-center justify-center'>
          <T weight='bold' className='text-xl text-center'>
            Todo not found
          </T>
        </View>
      </ScreenView>
    );
  }

  return (
    <ScreenView className='py-2 px-4'>
      <View className='flex-row justify-between mb-4'>
        <Pressable onPress={() => router.back()} className='p-2'>
          <FontAwesome6 name='chevron-left' size={20} color='#64748b' />
        </Pressable>

        <Pressable onPress={handleDelete}>
          <FontAwesome6 name='trash' size={20} color='#64748b' className='p-2' />
        </Pressable>
      </View>

      <View className='mb-4'>
        <TextInput
          value={todoChanges.text ?? todo.text}
          onChangeText={(text) => handleEdit({ text })}
          placeholder='Title'
          onBlur={handleSave}
          multiline={true}
          className='px-2 py-1 font-header-medium text-3xl border-b-2 border-transparent focus:border-accent'
        />
      </View>
      <View className='mb-4'>
        <TextInput
          value={todoChanges.details ?? todo.details}
          onChangeText={(text) => handleEdit({ details: text })}
          placeholder='Details'
          onBlur={handleSave}
          multiline={true}
          className='px-2 py-1 font-body border-b border-transparent focus:border-accent overflow-hidden'
        />
      </View>
    </ScreenView>
  );
}
