import dayjs from 'dayjs';

export const getDate = (d: Date): string => {
  const year = d.getFullYear();
  const month = ('00' + (d.getMonth() + 1)).slice(-2);
  const day = ('00' + d.getDate()).slice(-2);
  return `${year}/${month}/${day}`;
};

export const addDate = (d: Date, add: number, type: string): Date => {
  return dayjs(d).add(add, type).toDate();
};

export const isHolyday = (date: Date, publicHolidays: Date[] = []) => {
  const result = publicHolidays.find(
    (publicHoliday) => getDate(publicHoliday) == getDate(date)
  );

  if (result) return true;

  return date.getDay() === 6 || date.getDay() === 0;
};
