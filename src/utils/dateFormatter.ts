import dayjs from 'dayjs';

export const formatDateDayMonth = (date: number | Date) => {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
  }).format(date);
};

export const formatPureDateDayMonth = (date: number | string | Date) => {
  return dayjs(date).format('MMM DD');
};

export const formatPureDateMonthYear = (date: number | string | Date) => {
  return dayjs(date).format('MMM YYYY');
};

export const durationBetween = (
  startDate: number | string | Date,
  endDate: number | string | Date,
  unit: 'day' | 'month' | 'year',
) => {
  return dayjs(endDate).diff(startDate, unit, true);
};

export const formatDateDayMonthYear = (date: number | Date) => {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};
