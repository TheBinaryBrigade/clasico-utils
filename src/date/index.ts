// const subtractSeconds = (date: Date, seconds: number) => {
//   date.setSeconds(date.getSeconds() - seconds);
//   return date;
// };

const isWeekend = (date: Date) => {
  const day = date.getDay(); // get day of week as integer (0 - 6)
  // 0 is Sunday, 6 is Saturday
  return day === 0 || day === 6;
};

const between = (date: Date, startDate: Date, endDate: Date) => {
  return date >= startDate && date <= endDate;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parse = (input: any): Date | null => {
  const inputDate = new Date(input);
  const isValidDate = !isNaN(inputDate.getTime());

  if (isValidDate) {
    return inputDate;
  }

  return null;
};

export type TimeUnit =
  "years"
  | "year"
  | "months"
  | "month"
  | "days"
  | "day"
  | "hours"
  | "hour"
  | "minutes"
  | "minute"
  | "seconds"
  | "second";

const timeSince = (date: Date): [number, TimeUnit] => {
  const seconds = Math.floor((+new Date() - +date) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    interval = Math.floor(interval);
    return [interval, interval === 1 ? "year" : "years"];
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    interval = Math.floor(interval);
    return [interval, interval === 1 ? "month" : "months"];
  }

  interval = seconds / 86400;
  if (interval > 1) {
    interval = Math.floor(interval);
    return [interval, interval === 1 ? "day" : "days"];
  }

  interval = seconds / 3600;
  if (interval > 1) {
    interval = Math.floor(interval);
    return [interval, interval === 1 ? "hour" : "hours"];
  }

  interval = seconds / 60;
  if (interval > 1) {
    interval = Math.floor(interval);
    return [interval, interval === 1 ? "minute" : "minutes"];
  }

  interval = Math.floor(seconds);
  return [interval, interval === 1 ? "second" : "seconds"];
};

export default {
  // subtractSeconds,
  parse,
  isWeekend,
  between,
  timeSince,
};