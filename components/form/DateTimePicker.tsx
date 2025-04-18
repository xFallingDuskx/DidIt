import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useEffect } from 'react';
import { Platform } from 'react-native';

interface DateTimePickerProps {
  isOpen: boolean;
  mode: 'date' | 'time';
  value: Date;
  onChange: (event: any, selectedDate: Date | undefined) => void;
  is24Hour?: boolean;
}

export default function DateTimePicker({ isOpen, ...props }: DateTimePickerProps) {
  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    if (isOpen) {
      DateTimePickerAndroid.open({
        ...props,
      });
    } else {
      DateTimePickerAndroid.dismiss(props.mode);
    }
  }, [isOpen, props]);

  if (!isOpen || Platform.OS === 'android') {
    return <></>;
  }

  return <RNDateTimePicker {...props} />;
}
