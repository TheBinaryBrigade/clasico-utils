declare const ___TOF: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
export type TypeOf = typeof ___TOF;
export type AnyFn = (...args: any) => any;
export type ElementType<T> = T extends (infer U)[] ? U : never;
export type FlattenArray<T extends unknown[]> = ElementType<T[]>;
export type FlattenTuple<T extends unknown[]> = {
    [K in keyof T]: ElementType<T[K]>;
};
export {};
