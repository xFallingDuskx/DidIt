import moment from 'moment';
import momenttz from 'moment-timezone';
import { useEffect, useState } from 'react';

export function isInCurrentYear(date: Date | string) {
  const givenYear = moment(date).year();
  const currentYear = moment().year();
  return givenYear === currentYear;
}

export function dateWithTime(dateStr: string, timeStr: string): Date {
  const userTimezone = momenttz.tz.guess();
  const combinedDateTime = momenttz
    .utc(`${dateStr} ${timeStr}`, 'YYYY-MM-DD HH:mm')
    .tz(userTimezone);
  return combinedDateTime.toDate();
}

export function isPastDate(date: Date) {
  const now = moment();
  const givenDate = moment(date);
  return givenDate.isBefore(now);
}

export function useCurrentDate() {
  const [formattedDate, setFormattedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedDate(moment().format('YYYY-MM-DD'));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return { currentDate: formattedDate };
}
