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
  try {
    const inputDate = new Date(input);
    const isValidDate = !isNaN(inputDate.getTime());

    if (isValidDate) {
      return inputDate;
    }
  } catch (ignored) { /* empty */ }

  return null;
};

export default {
  // subtractSeconds,
  parse,
  isWeekend,
  between,
};