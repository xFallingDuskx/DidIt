import moment from 'moment';
import momenttz from 'moment-timezone';
import { useEffect, useState } from 'react';

export function getUserCurrentTimezone() {
  return momenttz.tz.guess(true);
}

export function isInCurrentYear(date: Date | string) {
  const givenYear = moment(date).year();
  const currentYear = moment().year();
  return givenYear === currentYear;
}

export function dateWithTime(
  dateStr: string,
  timeStr: string,
  timezone?: string,
): Date {
  const userTimezone = timezone || getUserCurrentTimezone();
  const combinedDateTime = momenttz
    .utc(`${dateStr} ${timeStr}`, 'YYYY-MM-DD HH:mm')
    .tz(userTimezone);
  return combinedDateTime.toDate();
}

/**
 * Adjusts a given date to a target timezone while keeping the same local time as in the original timezone.
 *
 * @param utcDate - The original date object (assumed to be in UTC).
 * @param fromTimezone - The timezone of the original date.
 * @param toTimezone - The target timezone to which the date should be adjusted.
 * @returns A string in ISO 8601 format representing the adjusted date and time.
 *
 * @example
 * Example:
 * timezoneDateEquivalent(
 *   new Date('2025-03-20T12:00:00Z'),
 *   'America/New_York',
 *   'America/Chicago',
 * );
 * // Returns {"date": 2025-03-20T13:00:00.000Z, "timeWithOffset": "2025-03-20T08:00:00-05:00"} (when outside of Daylight Saving Time)
 * // because the original time in New York is 8am (2025-03-20T08:00:00-04:00)
 */
export function timezoneDateEquivalent(
  utcDate: Date,
  fromTimezone: string,
  toTimezone?: string,
) {
  const fromMoment = momenttz.tz(utcDate, fromTimezone);
  const toMoment = momenttz.tz(
    fromMoment.format('YYYY-MM-DDTHH:mm:ss'),
    toTimezone || getUserCurrentTimezone(),
  );
  const timeWithOffset = toMoment.format();
  const date = new Date(timeWithOffset);
  return { date, timeWithOffset };
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
