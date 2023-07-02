declare function hashCode(str: any, coerceToString?: boolean): number | null;
declare function capitalize(str: string): string;
declare function retry<T>(operation: () => Promise<T>, maxRetries: number, delay: number): Promise<T>;
declare function sleep(ms: number): Promise<unknown>;
declare const _default: {
    hashCode: typeof hashCode;
    isPrime: (num: number) => boolean;
    capitalize: typeof capitalize;
    retry: typeof retry;
    sleep: typeof sleep;
};
export default _default;
