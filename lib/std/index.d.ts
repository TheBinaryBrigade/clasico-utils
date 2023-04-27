export declare class Option<T> {
}
export declare class Result<TReturn, E = Error, Fn extends (...any: any[]) => TReturn = (...any: any[]) => TReturn, FnArgs extends any[] = Parameters<Fn>> {
    fn: Fn;
    result?: TReturn | undefined;
    error?: E | undefined;
    ran: boolean;
    constructor(fn: Fn, result?: TReturn | undefined, error?: E | undefined, ran?: boolean);
    match(callbacks: {
        onOk: (result: TReturn) => void;
        onError: (error: E) => void;
        /** this will be called when both result and error are undefined */
        debug?: (result?: TReturn, error?: E) => void;
    }): [TReturn | undefined, E | undefined];
    run(...args: FnArgs): this;
    isErr(): boolean | null;
    isOk(): boolean | null;
}
