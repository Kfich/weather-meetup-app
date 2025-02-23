import { format, addDays, startOfDay, endOfDay } from 'date-fns';

export const dateUtils = {
  getNextFriday: (fromDate = new Date()) => {
    const currentDay = fromDate.getDay();
    const daysUntilFriday = (5 - currentDay + 7) % 7;
    return addDays(fromDate, daysUntilFriday);
  },

  formatDateTime: (date) => format(date, 'yyyy-MM-dd'),
  formatDisplayDate: (date) => format(date, 'MMM d, yyyy'),
  formatDisplayTime: (date) => format(date, 'h:mm a'),

  getDayBoundaries: (date) => ({
    start: startOfDay(date),
    end: endOfDay(date)
  })
};