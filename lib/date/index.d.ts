declare function parse(input: any): Date | null;
declare const _default: {
    subtractSeconds: (date: Date, seconds: number) => Date;
    parse: typeof parse;
    weekend: (date: Date) => boolean;
    between: (date: Date, startDate: Date, endDate: Date) => boolean;
};
export default _default;
