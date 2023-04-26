export type BisectArrayOptions<T> = {
    key: (a: T) => number;
    cmp?: (a: T, b: T) => number;
    asReversed: boolean;
    items: T[];
};
export declare class BisectArray<TData> extends Array<TData> {
    private opts;
    constructor(opts: BisectArrayOptions<TData>);
    pop(): TData | undefined;
    push(...items: TData[]): number;
    private binarySearch;
    private shouldSwap;
    isValidCmp(): boolean | undefined;
    isReversed(): boolean;
}
export declare class ReverseSortedArray<T> extends BisectArray<T> {
    constructor(key: (key: T) => number, ...items: T[]);
}
export declare class SortedArray<T> extends BisectArray<T> {
    constructor(key: (key: T) => number, ...items: T[]);
}
export declare class ReverseNumberArray extends BisectArray<number> {
    constructor(...items: number[]);
}
export declare class SortedNumberArray extends BisectArray<number> {
    constructor(...items: number[]);
}
export declare class ReverseStringArray extends BisectArray<string> {
    constructor(...items: string[]);
}
export declare class SortedStringArray extends BisectArray<string> {
    constructor(...items: string[]);
}
export declare class ReverseCompareArray<T> extends BisectArray<T> {
    constructor(cmp: (a: T, b: T) => number, ...items: T[]);
}
export declare class SortedCompareArray<T> extends BisectArray<T> {
    constructor(cmp: (a: T, b: T) => number, ...items: T[]);
}
