import {startOfMonth} from 'date-fns/startOfMonth';
import {endOfMonth} from 'date-fns/endOfMonth';
import {startOfWeek} from 'date-fns/startOfWeek';
import {endOfWeek} from 'date-fns/endOfWeek';
import {eachDayOfInterval} from 'date-fns/eachDayOfInterval';
import {isBefore} from 'date-fns/isBefore';
import {isSameMonth} from 'date-fns/isSameMonth';

export const MIN_CALENDAR_DATE = new Date(2026, 4, 1);

export const getCalendarGridDays = (currentDate: Date): Date[] => {
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const firstDayOfGrid = startOfWeek(firstDayOfMonth);
  const lastDayOfGrid = endOfWeek(lastDayOfMonth);

  return eachDayOfInterval({
    start: firstDayOfGrid,
    end: lastDayOfGrid,
  });
}

export const isBeforeMinMonth = (date: Date): boolean => {
  return isBefore(startOfMonth(date), startOfMonth(MIN_CALENDAR_DATE));
}

export const isDayInCurrentMonth = (day: Date, currentMonth: Date) => {
  return isSameMonth(day, currentMonth);
}
