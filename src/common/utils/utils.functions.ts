import { add } from 'date-fns';

export const fromToday = (numDays, withTime = false) => {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
};
