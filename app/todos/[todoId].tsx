import { FontAwesome6 } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Input, Modal, ScreenView, T } from '../../components';
import DateTimePicker from '../../components/form/DateTimePicker';
import TodoInputActionItem from '../../components/todos/TodoInputActionItem';
import { deleteTodo, EditableTodo, editTodo, useTodos } from '../../supalegend';
import { isInCurrentYear, join } from '../../utils';

export default function TodosDetailedView() {
  const router = useRouter();
  const navigation = useNavigation();
  const { todoId } = useLocalSearchParams();
  const { todoMap } = useTodos();
  const todo = useMemo(() => {
    if (typeof todoId !== 'string') {
      return null;
    }
    const todoItem = todoMap[todoId];
    return todoItem;
  }, [todoId, todoMap]);
  const [todoChanges, setTodoChanges] = useState<EditableTodo>({});
  const editingTodo = useMemo(() => ({ ...todo, ...todoChanges }), [todo, todoChanges]);
  const [openPicker, setOpenPicker] = useState<'dueDate' | 'dueTime' | null>(null);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  // Save before navigating back — meant to address swipes to go back
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (__: any) => {
      handleSave();
    });

    return unsubscribe;
  }, [navigation, todoChanges]);

  const handleEdit = (updates: EditableTodo) => {
    setTodoChanges({ ...todoChanges, ...updates });
  };

  const handleSave = () => {
    if (Object.keys(todoChanges).length > 0) {
      editTodo(todo.id, todoChanges);
      setTodoChanges({});
    }
  };

  const handleGoBack = () => {
    handleSave();
    router.back();
  };

  const handleDelete = () => {
    router.back();
    deleteTodo(todo.id);
  };

  const handleDueChange = (__event, newValue: Date | null) => {
    if (openPicker === 'dueDate') {
      handleEdit({ due_date: newValue ? moment.utc(newValue).format('YYYY-MM-DD') : null });
    }

    if (openPicker === 'dueTime') {
      handleEdit({ due_time: newValue ? moment.utc(newValue).format('HH:mm') : null });
    }

    setOpenPicker(null); // Close the picker
  };

  const handleReminderTimeUseChange = () => {
    handleEdit({ use_local_time: !editingTodo.use_local_time });
  };

  // NEXT: better composition — use context ?
  if (!todo) {
    return (
      <ScreenView className='py-2 px-4'>
        <Pressable onPress={handleGoBack} className='p-2'>
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
    <>
      <ScreenView className='py-2 relative'>
        <View className='px-4 flex-row justify-between mb-4'>
          <Pressable onPress={handleGoBack} className='p-2'>
            <FontAwesome6 name='chevron-left' size={20} color='#64748b' />
          </Pressable>

          <Pressable onPress={() => setConfirmationVisible(true)} className='p-2'>
            <FontAwesome6 name='trash' size={18} color='#64748b' className='p-2' />
          </Pressable>
        </View>

        <View className='px-4 mb-4'>
          <Input
            value={editingTodo.text}
            onChangeText={(text) => handleEdit({ text })}
            placeholder='Title'
            onBlur={handleSave}
            multiline={true}
            className='px-2 py-1 font-header-medium text-3xl border-b-2 border-transparent focus:border-accent'
          />
        </View>

        <View
          className={join(
            'px-6 pt-2.5 mb-4 bg-surface-tab flex-row gap-1.5',
            !(editingTodo.due_date && editingTodo.due_time) && 'pb-2.5'
          )}
        >
          <T weight='semibold' className='mr-0.5'>
            Due:
          </T>
          <View className='flex-1 flex items-center'>
            <View className={join('flex-row gap-2', !editingTodo.due_date && 'w-1/2 mr-auto')}>
              <TodoInputActionItem
                type='dueDate'
                onPress={() => setOpenPicker('dueDate')}
                value={
                  !editingTodo.due_date
                    ? undefined
                    : isInCurrentYear(editingTodo.due_date)
                    ? moment(editingTodo.due_date).format('ddd MMM D')
                    : moment(editingTodo.due_date).format('MMM D, YYYY')
                }
              />
              {editingTodo.due_date && (
                <TodoInputActionItem
                  type='dueTime'
                  onPress={() => setOpenPicker('dueTime')}
                  value={
                    editingTodo.due_time
                      ? moment.utc(editingTodo.due_time, 'HH:mm').local().format('h:mm A')
                      : undefined
                  }
                />
              )}
            </View>

            {editingTodo.due_date && editingTodo.due_time && (
              <View className='flex-row items-center justify-end mt-1'>
                <T className='text-sm'>
                  {editingTodo.use_local_time
                    ? 'Time will adjust in different timezones'
                    : 'Time will use same time, regardless of timezone.'}
                </T>
                <Pressable onPress={handleReminderTimeUseChange} className='p-1'>
                  <T weight='medium' className='text-accent text-sm'>
                    Change
                  </T>
                </Pressable>
              </View>
            )}
          </View>
        </View>

        <View className='px-4 mb-4'>
          <Input
            value={editingTodo.details}
            onChangeText={(text) => handleEdit({ details: text })}
            placeholder='Details'
            onBlur={handleSave}
            multiline={true}
            className='px-2 py-1 font-body border-b border-transparent focus:border-accent overflow-hidden'
          />
        </View>

        {todo && (
          <View className='absolute bottom-5 left-5'>
            <T className='text-muted text-sm'>Updated {moment(todo.updated_at).calendar()}</T>
            <T className='text-muted text-sm'>Created {moment(todo.created_at).calendar()}</T>
          </View>
        )}
      </ScreenView>

      <DateTimePicker
        isOpen={openPicker !== null}
        mode={openPicker === 'dueDate' ? 'date' : 'time'}
        value={
          openPicker === 'dueDate'
            ? moment(editingTodo.due_date).toDate()
            : moment.utc(editingTodo.due_time, 'HH:mm').local().toDate()
        }
        onChange={handleDueChange}
      />
      <Modal
        animationType='fade'
        isOpen={confirmationVisible}
        onClose={() => setConfirmationVisible(false)}
        title='Confirm Delete'
        message='Are you sure you want to delete this todo? This action cannot be undone.'
        actions={[
          { label: 'Cancel', onPress: () => setConfirmationVisible(false) },
          { label: 'Delete', onPress: handleDelete, closeModal: true, labelClassName: 'text-danger' },
        ]}
      />
    </>
  );
}
