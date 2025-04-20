import moment from 'moment';

export function isInCurrentYear(date: Date | string) {
  const givenYear = moment(date).year();
  const currentYear = moment().year();
  return givenYear === currentYear;
}
