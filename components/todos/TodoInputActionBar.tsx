import moment from 'moment';
import { View } from 'react-native';
import { useTodoTab } from '../../contexts/TodoContext';
import { isInCurrentYear } from '../../utils';
import DateTimePicker from '../form/DateTimePicker';
import TodoInputActionItem from './TodoInputActionItem';

export default function TodoInputActionBar() {
  const { dueDate, dueTime, openPicker, setDueDate, setDueTime, setOpenPicker, inputRef, showDetails, setShowDetails } =
    useTodoTab();

  const handleDueChange = (__event, newValue: Date | null) => {
    if (openPicker === 'dueDate') {
      setDueDate(newValue);
    }

    if (openPicker === 'dueTime') {
      setDueTime(newValue);
    }

    setOpenPicker(null); // Close the picker
    inputRef.current?.focus(); // Focus back on the input
  };

  return (
    <>
      <View className='flex-row items-center gap-2 pt-4 px-4 pb-2 overflow-x-auto'>
        {!showDetails && <TodoInputActionItem type='details' onPress={() => setShowDetails(true)} />}
        <TodoInputActionItem
          type='dueDate'
          onPress={() => setOpenPicker('dueDate')}
          value={
            !dueDate
              ? undefined
              : isInCurrentYear(dueDate)
              ? moment(dueDate).format('ddd MMM DD')
              : moment(dueDate).format('MMM Do, YYYY')
          }
        />
        {dueDate && (
          <TodoInputActionItem
            type='dueTime'
            onPress={() => setOpenPicker('dueTime')}
            value={dueTime ? moment(dueTime).format('h:mm A') : undefined}
          />
        )}
      </View>
      {(openPicker === 'dueDate' || openPicker === 'dueTime') && (
        <DateTimePicker
          isOpen={true}
          mode={openPicker === 'dueDate' ? 'date' : 'time'}
          value={openPicker === 'dueDate' ? dueDate : dueTime}
          onChange={handleDueChange}
        />
      )}
    </>
  );
}
