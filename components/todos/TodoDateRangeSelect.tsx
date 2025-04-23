import { Octicons } from '@expo/vector-icons';
import moment from 'moment';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { DateType } from 'react-native-ui-datepicker';
import { useTodoTab } from '../../contexts/TodoContext';
import DateTimePickerUI from '../form/DateTimePickerUI';
import ToggleGroup from '../form/ToggleGroup';
import Modal from '../util/Modal';

export default function TodoDateRangeSelect() {
  const { setByDateRange } = useTodoTab();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<'single' | 'range'>('single');
  const [selectedStart, setSelectedStart] = useState<DateType>();
  const [selectedEnd, setSelectedEnd] = useState<DateType>();

  const handleConfirm = () => {
    const end = mode === 'single' ? selectedStart : selectedEnd;
    const dateRangeStart = moment(selectedStart.valueOf()).format('YYYY-MM-DD');
    const dateRangeEnd = moment(end.valueOf()).format('YYYY-MM-DD');
    setByDateRange({
      start: dateRangeStart,
      end: dateRangeEnd,
    });
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Select Date${mode === 'range' ? ' Range' : ''}`}
        actions={[
          {
            label: 'Cancel',
            onPress: () => setIsModalOpen(false),
            closeModal: true,
          },
          {
            label: 'Done',
            onPress: handleConfirm,
            closeModal: true,
          },
        ]}
      >
        <DateTimePickerUI
          mode={mode}
          date={selectedStart}
          startDate={selectedStart}
          endDate={selectedEnd}
          onChangeSingle={(date) => {
            setSelectedStart(date);
          }}
          onChangeRange={(startDate, endDate) => {
            setSelectedStart(startDate);
            setSelectedEnd(endDate);
          }}
        />
        <ToggleGroup
          options={[
            { label: 'Single Date', value: 'single' },
            { label: 'Date Range', value: 'range' },
          ]}
          selectedValue={mode}
          onChange={(value: 'single' | 'range') => {
            setMode(value);
          }}
          className='-mt-8 mb-2'
        />
      </Modal>
      <Pressable onPress={() => setIsModalOpen(true)} className='absolute right-0'>
        <Octicons name='calendar' size={20} color='#1877f2' />
      </Pressable>
    </>
  );
}
