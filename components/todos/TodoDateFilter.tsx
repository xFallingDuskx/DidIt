import { FontAwesome6 } from '@expo/vector-icons';
import moment from 'moment';
import { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { useTodoTab } from '../../contexts/TodoContext';
import { join, useCurrentDate } from '../../utils';
import T from '../util/T';

export default function TodoDateFilter() {
  const { tabView, byDateRange, setByDateRange } = useTodoTab();
  const { formattedDate } = useCurrentDate();

  const dateOptions = useMemo(
    () => [
      {
        label: 'Today',
        selected: byDateRange?.start === formattedDate && byDateRange?.end === formattedDate,
        onPress: () => setByDateRange({ start: formattedDate, end: formattedDate }),
      },
      {
        label: 'Next 3 Days',
        selected:
          byDateRange?.start === formattedDate && byDateRange?.end === moment().add(3, 'days').format('YYYY-MM-DD'),
        onPress: () => setByDateRange({ start: formattedDate, end: moment().add(3, 'days').format('YYYY-MM-DD') }),
      },
      {
        label: 'This Week',
        selected:
          byDateRange?.start === moment().startOf('week').format('YYYY-MM-DD') &&
          byDateRange?.end === moment().endOf('week').format('YYYY-MM-DD'),
        onPress: () =>
          setByDateRange({
            start: moment().startOf('week').format('YYYY-MM-DD'),
            end: moment().endOf('week').format('YYYY-MM-DD'),
          }),
      },
      {
        label: 'Next Week',
        selected:
          byDateRange?.start === moment().add(1, 'week').startOf('week').format('YYYY-MM-DD') &&
          byDateRange?.end === moment().add(1, 'week').endOf('week').format('YYYY-MM-DD'),
        onPress: () =>
          setByDateRange({
            start: moment().add(1, 'week').startOf('week').format('YYYY-MM-DD'),
            end: moment().add(1, 'week').endOf('week').format('YYYY-MM-DD'),
          }),
      },
    ],
    [byDateRange, formattedDate]
  );

  if (tabView !== 'by date') {
    return <></>;
  }

  return (
    <View className='flex-row gap-2'>
      {dateOptions.map(({ label, onPress, selected }) => (
        <Pressable key={label} className={join('py-2 px-3 flex-row gap-1')} onPress={onPress}>
          {selected && <FontAwesome6 name='calendar' color='#1877f2' />}
          <T weight={selected ? 'bold' : 'medium'} className={join('text-sm', selected && 'text-accent')}>
            {label}
          </T>
        </Pressable>
      ))}
    </View>
  );
}
