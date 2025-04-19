import RNDateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import Modal from '../util/Modal';

interface DateTimePickerProps {
  isOpen: boolean;
  mode: 'date' | 'time';
  value: Date | null;
  onChange: (event: DateTimePickerEvent, selectedDate: Date | undefined) => void;
}

export default function DateTimePicker({ isOpen, onChange, ...props }: DateTimePickerProps) {
  const [date, setDate] = useState(props.value || new Date());

  const handleChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    setDate(selectedDate || new Date());

    if (Platform.OS === 'android') {
      console.log('event.type', event.type); // REMOVE
      if (event.type === 'set') {
        // confirm
        onChange(event, selectedDate);
      }
      if (event.type === 'dismissed') {
        // clear
        onChange(event, undefined);
      }
    }
  };

  const handleClose = () => {
    onChange(null, props.value);
  };

  const handleClear = () => {
    setDate(null);
    onChange(null, undefined);
  };

  const handleConfirm = () => {
    setDate(date);
    onChange(null, date);
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (isOpen) {
        DateTimePickerAndroid.open({
          ...props,
          onChange: handleChange,
          positiveButton: {
            label: 'Confirm',
          },
          negativeButton: {
            label: 'Clear',
          },
        });
      } else {
        DateTimePickerAndroid.dismiss(props.mode);
      }
    }
  }, [isOpen, props]);

  return (
    <Modal
      title={`select ${props.mode}`}
      isOpen={isOpen && Platform.OS !== 'android'}
      onClose={handleClose}
      actions={[
        {
          label: 'Clear',
          onPress: handleClear,
          closeModal: true,
        },
        {
          label: 'Confirm',
          onPress: handleConfirm,
          closeModal: true,
        },
      ]}
    >
      <View className='flex-row justify-center'>
        {/* TASK: Show full date — i.e. Monday, January 1, 2023 */}
        <RNDateTimePicker {...props} onChange={handleChange} />
      </View>
    </Modal>
  );
}
