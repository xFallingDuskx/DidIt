import moment from 'moment';
import momenttz from 'moment-timezone';

export function isInCurrentYear(date: Date | string) {
  const givenYear = moment(date).year();
  const currentYear = moment().year();
  return givenYear === currentYear;
}

export function dateWithTime(dateStr: string, timeStr: string): Date {
  const userTimezone = momenttz.tz.guess();
  const combinedDateTime = momenttz.utc(`${dateStr} ${timeStr}`, 'YYYY-MM-DD HH:mm').tz(userTimezone);
  return combinedDateTime.toDate();
}

export function isPastDate(date: Date) {
  const now = moment();
  const givenDate = moment(date);
  return givenDate.isBefore(now);
}
