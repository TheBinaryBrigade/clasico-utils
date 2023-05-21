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
    const inputDate = new Date(input);
    const isValidDate = !isNaN(inputDate.getTime());
    if (isValidDate) {
        return inputDate;
    }
    return null;
};
const timeSince = (date) => {
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
exports.default = {
    // subtractSeconds,
    parse,
    isWeekend,
    between,
    timeSince,
};
