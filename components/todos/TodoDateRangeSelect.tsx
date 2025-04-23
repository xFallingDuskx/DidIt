import { Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable } from 'react-native';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import Modal from '../util/Modal';

const datePickerStyles = {
  button_next: { backgroundColor: '#1877f2' }, // Change the color of the next button
  button_prev: { backgroundColor: '#1877f2' }, // Change the color of the previous button
  month_selector_label: { color: 'black', fontFamily: 'HeaderBold', fontSize: 20 }, // Change the label color of the month selector
  year_selector_label: { color: 'black', fontFamily: 'HeaderBold', fontSize: 20 }, // Change the label color of the year selector
  month_label: { color: 'black' }, // Change the label color of the month
  selected_month_label: { color: 'black' }, // Change the label color of the selected month
  day_label: { color: 'black' }, // Change the label color of the days
  today: { borderColor: '#1877f2', borderWidth: 1 }, // Add a border to today's date
  today_label: { color: '#1877f2' }, // Change the label color of today's date
  selected: { backgroundColor: '#1877f2' }, // Highlight the selected day
  selected_label: { color: 'white' }, // Highlight the selected day label
};

export default function TodoDateRangeSelect() {
  const defaultStyles = useDefaultStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedStart, setSelectedStart] = useState<DateType>();
  const [selectedEnd, setSelectedEnd] = useState<DateType>();

  const handleSelect = () => {};

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Select Date Range'
        actions={[
          {
            label: 'Cancel',
            onPress: () => setIsModalOpen(false),
            closeModal: true,
          },
          {
            label: 'Done',
            onPress: () => {
              setIsModalOpen(false);
              // Handle the selected date range here
              console.log('Selected Date Range:', { startDate, endDate });
            },
            closeModal: true,
          },
        ]}
      >
        <DateTimePicker
          mode='range'
          date={selectedStart}
          startDate={selectedStart}
          endDate={selectedEnd}
          onChange={({ startDate, endDate }) => {
            setSelectedStart(startDate);
            setSelectedEnd(endDate);
          }}
          showOutsideDays={true}
          className='text-xl rounded-md'
          styles={{
            ...defaultStyles,
            day_cell: { height: 20 }, // Change the color of the day cell
            range_fill: { backgroundColor: '#93c5fd' }, // Change the color of the range fill
            range_start_label: { color: 'white' }, // Change the label color of the start date
            range_end_label: { color: 'white' }, // Change the label color of the end date
            button_next: { backgroundColor: '#1877f2', borderRadius: '25px', color: 'red' }, // Change the color of the next button
            button_prev: { backgroundColor: '#1877f2', borderRadius: '25px' }, // Change the color of the previous button
            month_selector_label: { color: 'black', fontFamily: 'HeaderBold', fontSize: 20 }, // Change the label color of the month selector
            year_selector_label: { color: 'black', fontFamily: 'HeaderBold', fontSize: 20 }, // Change the label color of the year selector
            month_label: { color: 'black' }, // Change the label color of the month
            selected_month_label: { color: 'black' }, // Change the label color of the selected month
            day_label: { color: 'black' }, // Change the label color of the days
            today: { borderColor: '#1877f2', borderWidth: 1 }, // Add a border to today's date
            today_label: { color: '#1877f2' }, // Change the label color of today's date
            selected: { backgroundColor: '#1877f2' }, // Highlight the selected day
            selected_label: { color: 'white' }, // Highlight the selected day label
          }}
        />
      </Modal>
      <Pressable onPress={() => setIsModalOpen(true)} className='absolute right-0'>
        <Octicons name='calendar' size={20} color='#1877f2' />
      </Pressable>
    </>
  );
}
