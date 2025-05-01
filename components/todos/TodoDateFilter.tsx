import { FontAwesome6 } from '@expo/vector-icons';
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { useTodoTab } from '../../contexts/TodoContext';
import { join, useCurrentDate } from '../../utils';
import T from '../util/T';
import TodoDateRangeSelect from './TodoDateRangeSelect';

export default function TodoDateFilter() {
  const { tabView, byDateRange, setByDateRange } = useTodoTab();
  const { currentDate } = useCurrentDate();

  const dateOptions = useMemo(
    () => [
      {
        label: 'Today',
        selected:
          byDateRange?.start === currentDate &&
          byDateRange?.end === currentDate,
        onPress: () => setByDateRange({ start: currentDate, end: currentDate }),
      },
      {
        label: 'Next 3 Days',
        selected:
          byDateRange?.start === currentDate &&
          byDateRange?.end === moment().add(3, 'days').format('YYYY-MM-DD'),
        onPress: () =>
          setByDateRange({
            start: currentDate,
            end: moment().add(3, 'days').format('YYYY-MM-DD'),
          }),
      },
      {
        label: 'This Week',
        selected:
          byDateRange?.start ===
            moment().startOf('week').format('YYYY-MM-DD') &&
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
          byDateRange?.start ===
            moment().add(1, 'week').startOf('week').format('YYYY-MM-DD') &&
          byDateRange?.end ===
            moment().add(1, 'week').endOf('week').format('YYYY-MM-DD'),
        onPress: () =>
          setByDateRange({
            start: moment().add(1, 'week').startOf('week').format('YYYY-MM-DD'),
            end: moment().add(1, 'week').endOf('week').format('YYYY-MM-DD'),
          }),
      },
    ],
    [byDateRange, currentDate, setByDateRange],
  );

  // Set default date range to today if not set
  useEffect(() => {
    if (!byDateRange?.start && !byDateRange?.end) {
      setByDateRange({
        start: currentDate,
        end: currentDate,
      });
    }
  }, [byDateRange, currentDate, setByDateRange]);

  if (tabView !== 'by date') {
    return <></>;
  }

  return (
    <View className="relative">
      <TodoDateRangeSelect />
      <View className="mt-5 mb-3 flex-row justify-center gap-2">
        <DateDisplay date={byDateRange?.start || currentDate} />
        {byDateRange?.start !== byDateRange?.end && (
          <>
            <T font="header" weight="bold" className="text-4xl">
              -
            </T>
            <DateDisplay date={byDateRange?.end || currentDate} />
          </>
        )}
      </View>
      <View className="flex-row gap-3">
        {dateOptions.map(({ label, onPress, selected }) => (
          <Pressable
            key={label}
            className={join('py-2 px-2 flex-row gap-1')}
            onPress={onPress}
          >
            {selected && <FontAwesome6 name="calendar" color="#1877f2" />}
            <T
              weight={selected ? 'bold' : 'medium'}
              className={join('text-sm', selected && 'text-accent')}
            >
              {label}
            </T>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function DateDisplay({ date }: { date: string }) {
  const ordinalDate = moment(date).format('Do');
  const monthYear = moment(date).format('MMMM YYYY');
  return (
    <View className="flex items-center">
      <T font="header" weight="bold" className="text-5xl">
        {ordinalDate}
      </T>
      <T font="header" className="text-gray-400 -translate-y-1">
        {monthYear}
      </T>
    </View>
  );
}
