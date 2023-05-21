export type TimeUnit = "years" | "year" | "months" | "month" | "days" | "day" | "hours" | "hour" | "minutes" | "minute" | "seconds" | "second";
declare const _default: {
    parse: (input: any) => Date | null;
    isWeekend: (date: Date) => boolean;
    between: (date: Date, startDate: Date, endDate: Date) => boolean;
    timeSince: (date: Date) => [number, TimeUnit];
};
export default _default;
