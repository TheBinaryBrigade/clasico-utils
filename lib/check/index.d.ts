declare const _default: {
    isNil: (x: unknown) => x is null | undefined;
    isNumber: (x: unknown) => x is number;
    isBigInt: (x: unknown) => x is bigint;
    isString: (x: unknown) => x is string;
    isBoolean: (x: unknown) => x is boolean;
    isFunction: (x: unknown) => x is Function;
    isObject: (x: unknown) => x is object;
    isNumeric: (x: unknown) => boolean;
    isValidBoolean: (x: any) => boolean;
    isTrue: (x: unknown) => boolean;
    isFalse: (x: unknown) => boolean;
    isArray: (x: unknown) => x is unknown[];
    isSet: (x: unknown) => x is Set<unknown>;
    isIterable: (x: any) => x is Iterable<unknown>;
    isDate: (x: unknown) => boolean;
    isError: (x: any, errorLike?: boolean) => x is Error;
};
export default _default;
