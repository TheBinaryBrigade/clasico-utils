"use strict";
// const subtractSeconds = (date: Date, seconds: number) => {
//   date.setSeconds(date.getSeconds() - seconds);
//   return date;
// };
Object.defineProperty(exports, "__esModule", { value: true });
const isWeekend = (date) => {
    const day = date.getDay(); // get day of week as integer (0 - 6)
    // 0 is Sunday, 6 is Saturday
    return day === 0 || day === 6;
};
const between = (date, startDate, endDate) => {
    return date >= startDate && date <= endDate;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parse = (input) => {
    try {
        const inputDate = new Date(input);
        const isValidDate = !isNaN(inputDate.getTime());
        if (isValidDate) {
            return inputDate;
        }
    }
    catch (ignored) { /* empty */ }
    return null;
};
exports.default = {
    // subtractSeconds,
    parse,
    isWeekend,
    between,
};
