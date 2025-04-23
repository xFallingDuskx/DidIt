import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import { DatePickerRangeProps, DatePickerSingleProps } from 'react-native-ui-datepicker/lib/typescript/datetime-picker';

interface DateTimePickerUIProps
  extends Omit<DatePickerSingleProps, 'mode' | 'onChange'>,
    Omit<DatePickerRangeProps, 'mode' | 'onChange'> {
  mode: 'single' | 'range';
  date?: DateType;
  startDate?: DateType;
  endDate?: DateType;
  onChangeSingle?: (date: DateType) => void;
  onChangeRange?: (startDate: DateType, endDate: DateType) => void;
}

export default function DateTimePickerUI({ onChangeSingle, onChangeRange, ...props }: DateTimePickerUIProps) {
  const defaultStyles = useDefaultStyles();

  return (
    <DateTimePicker
      {...props}
      onChange={(update: { startDate?: DateType; endDate?: DateType; date?: DateType }) => {
        if (props.mode === 'range' && onChangeRange) {
          onChangeRange(update.startDate as DateType, update.endDate as DateType);
        }
        if (props.mode === 'single' && onChangeSingle) {
          onChangeSingle(update.date as DateType);
        }
      }}
      showOutsideDays={true}
      styles={{
        ...defaultStyles,
        day_cell: { height: 20 },
        range_fill: { backgroundColor: '#bae6fd' },
        range_start_label: { color: 'white' },
        range_end_label: { color: 'white' },
        button_next_image: { tintColor: '#1877f2' },
        button_prev_image: { tintColor: '#1877f2' },
        month_selector_label: { color: 'black', fontFamily: 'HeaderBold', fontSize: 20 },
        year_selector_label: { color: 'black', fontFamily: 'HeaderBold', fontSize: 20 },
        selected_month: { backgroundColor: '#1877f2' },
        selected_year: { backgroundColor: '#1877f2' },
        month_label: { color: 'black' },
        day_label: { color: 'black' },
        today: { borderColor: '#1877f2', borderWidth: 1 },
        today_label: { color: '#1877f2' },
        selected: { backgroundColor: '#1877f2' },
        selected_label: { color: 'white' },
      }}
    />
  );
}
