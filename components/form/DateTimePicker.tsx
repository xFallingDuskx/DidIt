import RNDateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import Modal from '../util/Modal';
import T from '../util/T';

interface DateTimePickerProps {
  isOpen: boolean;
  mode: 'date' | 'time';
  value: Date | null;
  onChange: (event: DateTimePickerEvent, selectedDate: Date | null) => void;
}

export default function DateTimePicker({ isOpen, value, onChange, ...props }: DateTimePickerProps) {
  const [date, setDate] = useState(value || new Date());

  const handleChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    setDate(selectedDate);

    if (Platform.OS === 'android') {
      if (event.type === 'set') {
        // confirm
        onChange(event, selectedDate);
      }
      if (event.type === 'dismissed') {
        // clear
        onChange(event, null);
      }
    }
  };

  const handleClose = () => {
    onChange(null, value);
  };

  const handleClear = () => {
    onChange(null, null);
  };

  const handleConfirm = () => {
    onChange(null, date);
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (isOpen) {
        DateTimePickerAndroid.open({
          ...props,
          value: date,
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
        },
        {
          label: 'Confirm',
          onPress: handleConfirm,
        },
      ]}
    >
      <View className='flex items-center gap-1'>
        <RNDateTimePicker {...props} value={date} onChange={handleChange} />
        {props.mode === 'date' && <T>{moment(date).format('dddd, MMMM D, YYYY')}</T>}
        {/* {props.mode === 'time' && <Text className='font-body'>{momenttz.tz.guess().replace('_', ' ')}</Text>} */}
      </View>
    </Modal>
  );
}
