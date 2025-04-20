import moment from 'moment';

export function isInCurrentYear(date: Date) {
  const givenYear = moment(date).year();
  const currentYear = moment().year();
  return givenYear === currentYear;
}
