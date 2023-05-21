import * as types from "./@types";
declare const _default: {
    check: {
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
    /**
     * @deprecated change `parser` to `template`
     */
    parser: {
        SentenceParser: {
            new (options?: import("./template").TemplateParserOptions, ctx?: import("./template/eval").EvalContext, logs?: import("./template").ParserLog[]): {
                options: import("./template").TemplateParserOptions;
                ctx: import("./template/eval").EvalContext;
                logs: import("./template").ParserLog[];
                builtinFunctions(): {
                    $if: (condition: boolean, ifTrue: any, ifFalse: any) => any;
                    $abs: (x: any) => number;
                    $all: (...args: any[]) => boolean;
                    $any: (...args: any[]) => boolean;
                    $bool: (x: any) => boolean;
                    $float: (x: any) => number;
                    $str: (x: any) => string;
                    $format: (fmt: string, ...args: any[]) => string;
                    $int: (x: any) => number;
                    $isnil: (x: any) => boolean;
                    $isinstance: (x: any, ...types: ("string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function")[]) => boolean;
                    $tisstring: (x: any) => boolean;
                    $tisnumber: (x: any) => boolean;
                    $tisboolean: (x: any) => boolean;
                    $tisundefined: (x: any) => boolean;
                    $tisobject: (x: any) => boolean;
                    $len: (x: any) => number;
                    $max: (...args: any[]) => any;
                    $min: (...args: any[]) => any;
                    $pow: (a: number, b: number) => number;
                    $round: (a: number) => number;
                    $substring: (x: string, start: number, end?: number | undefined) => string;
                    $type: (x: any) => "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
                    $math: (key: string, ...args: any[]) => any;
                    $getattr: (obj: any, ...path: string[]) => any;
                    $concat: (...args: any[]) => string;
                    $hasattr: (obj: any, ...path: string[]) => boolean;
                    $isset: (obj: any) => boolean;
                    $includes: (x: any, value: any) => any;
                    $endsWith: (x: any, searchString: string, endPos?: number | undefined) => any;
                    $startsWith: (x: any, searchString: string, pos?: number | undefined) => boolean;
                    $lower: (x: any) => string;
                    $upper: (x: any) => string;
                    $now: () => Date;
                };
                fixName(name: string): string;
                fnExists(name: string): boolean;
                varExists(name: string): boolean;
                addVar(name: string, value: any): void;
                addFunction(name: string, cb: types.AnyFn): void;
                clearLogs(): void;
                parse(sentence: string): import("./template").ParseTemplateResult;
            };
        };
        TemplateParser: {
            new (options?: import("./template").TemplateParserOptions, ctx?: import("./template/eval").EvalContext, logs?: import("./template").ParserLog[]): {
                options: import("./template").TemplateParserOptions;
                ctx: import("./template/eval").EvalContext;
                logs: import("./template").ParserLog[];
                builtinFunctions(): {
                    $if: (condition: boolean, ifTrue: any, ifFalse: any) => any;
                    $abs: (x: any) => number;
                    $all: (...args: any[]) => boolean;
                    $any: (...args: any[]) => boolean;
                    $bool: (x: any) => boolean;
                    $float: (x: any) => number;
                    $str: (x: any) => string;
                    $format: (fmt: string, ...args: any[]) => string;
                    $int: (x: any) => number;
                    $isnil: (x: any) => boolean;
                    $isinstance: (x: any, ...types: ("string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function")[]) => boolean;
                    $tisstring: (x: any) => boolean;
                    $tisnumber: (x: any) => boolean;
                    $tisboolean: (x: any) => boolean;
                    $tisundefined: (x: any) => boolean;
                    $tisobject: (x: any) => boolean;
                    $len: (x: any) => number;
                    $max: (...args: any[]) => any;
                    $min: (...args: any[]) => any;
                    $pow: (a: number, b: number) => number;
                    $round: (a: number) => number;
                    $substring: (x: string, start: number, end?: number | undefined) => string;
                    $type: (x: any) => "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
                    $math: (key: string, ...args: any[]) => any;
                    $getattr: (obj: any, ...path: string[]) => any;
                    $concat: (...args: any[]) => string;
                    $hasattr: (obj: any, ...path: string[]) => boolean;
                    $isset: (obj: any) => boolean;
                    $includes: (x: any, value: any) => any;
                    $endsWith: (x: any, searchString: string, endPos?: number | undefined) => any;
                    $startsWith: (x: any, searchString: string, pos?: number | undefined) => boolean;
                    $lower: (x: any) => string;
                    $upper: (x: any) => string;
                    $now: () => Date;
                };
                fixName(name: string): string;
                fnExists(name: string): boolean;
                varExists(name: string): boolean;
                addVar(name: string, value: any): void;
                addFunction(name: string, cb: types.AnyFn): void;
                clearLogs(): void;
                parse(sentence: string): import("./template").ParseTemplateResult;
            };
        };
        lval: <T>(sentence: string, ctx?: import("./template/eval").EvalContext | undefined) => {
            result: string | number | boolean | Date | T | null | undefined;
            logs: import("./template").ParserLog[];
        };
    };
    template: {
        SentenceParser: {
            new (options?: import("./template").TemplateParserOptions, ctx?: import("./template/eval").EvalContext, logs?: import("./template").ParserLog[]): {
                options: import("./template").TemplateParserOptions;
                ctx: import("./template/eval").EvalContext;
                logs: import("./template").ParserLog[];
                builtinFunctions(): {
                    $if: (condition: boolean, ifTrue: any, ifFalse: any) => any;
                    $abs: (x: any) => number;
                    $all: (...args: any[]) => boolean;
                    $any: (...args: any[]) => boolean;
                    $bool: (x: any) => boolean;
                    $float: (x: any) => number;
                    $str: (x: any) => string;
                    $format: (fmt: string, ...args: any[]) => string;
                    $int: (x: any) => number;
                    $isnil: (x: any) => boolean;
                    $isinstance: (x: any, ...types: ("string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function")[]) => boolean;
                    $tisstring: (x: any) => boolean;
                    $tisnumber: (x: any) => boolean;
                    $tisboolean: (x: any) => boolean;
                    $tisundefined: (x: any) => boolean;
                    $tisobject: (x: any) => boolean;
                    $len: (x: any) => number;
                    $max: (...args: any[]) => any;
                    $min: (...args: any[]) => any;
                    $pow: (a: number, b: number) => number;
                    $round: (a: number) => number;
                    $substring: (x: string, start: number, end?: number | undefined) => string;
                    $type: (x: any) => "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
                    $math: (key: string, ...args: any[]) => any;
                    $getattr: (obj: any, ...path: string[]) => any;
                    $concat: (...args: any[]) => string;
                    $hasattr: (obj: any, ...path: string[]) => boolean;
                    $isset: (obj: any) => boolean;
                    $includes: (x: any, value: any) => any;
                    $endsWith: (x: any, searchString: string, endPos?: number | undefined) => any;
                    $startsWith: (x: any, searchString: string, pos?: number | undefined) => boolean;
                    $lower: (x: any) => string;
                    $upper: (x: any) => string;
                    $now: () => Date;
                };
                fixName(name: string): string;
                fnExists(name: string): boolean;
                varExists(name: string): boolean;
                addVar(name: string, value: any): void;
                addFunction(name: string, cb: types.AnyFn): void;
                clearLogs(): void;
                parse(sentence: string): import("./template").ParseTemplateResult;
            };
        };
        TemplateParser: {
            new (options?: import("./template").TemplateParserOptions, ctx?: import("./template/eval").EvalContext, logs?: import("./template").ParserLog[]): {
                options: import("./template").TemplateParserOptions;
                ctx: import("./template/eval").EvalContext;
                logs: import("./template").ParserLog[];
                builtinFunctions(): {
                    $if: (condition: boolean, ifTrue: any, ifFalse: any) => any;
                    $abs: (x: any) => number;
                    $all: (...args: any[]) => boolean;
                    $any: (...args: any[]) => boolean;
                    $bool: (x: any) => boolean;
                    $float: (x: any) => number;
                    $str: (x: any) => string;
                    $format: (fmt: string, ...args: any[]) => string;
                    $int: (x: any) => number;
                    $isnil: (x: any) => boolean;
                    $isinstance: (x: any, ...types: ("string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function")[]) => boolean;
                    $tisstring: (x: any) => boolean;
                    $tisnumber: (x: any) => boolean;
                    $tisboolean: (x: any) => boolean;
                    $tisundefined: (x: any) => boolean;
                    $tisobject: (x: any) => boolean;
                    $len: (x: any) => number;
                    $max: (...args: any[]) => any;
                    $min: (...args: any[]) => any;
                    $pow: (a: number, b: number) => number;
                    $round: (a: number) => number;
                    $substring: (x: string, start: number, end?: number | undefined) => string;
                    $type: (x: any) => "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
                    $math: (key: string, ...args: any[]) => any;
                    $getattr: (obj: any, ...path: string[]) => any;
                    $concat: (...args: any[]) => string;
                    $hasattr: (obj: any, ...path: string[]) => boolean;
                    $isset: (obj: any) => boolean;
                    $includes: (x: any, value: any) => any;
                    $endsWith: (x: any, searchString: string, endPos?: number | undefined) => any;
                    $startsWith: (x: any, searchString: string, pos?: number | undefined) => boolean;
                    $lower: (x: any) => string;
                    $upper: (x: any) => string;
                    $now: () => Date;
                };
                fixName(name: string): string;
                fnExists(name: string): boolean;
                varExists(name: string): boolean;
                addVar(name: string, value: any): void;
                addFunction(name: string, cb: types.AnyFn): void;
                clearLogs(): void;
                parse(sentence: string): import("./template").ParseTemplateResult;
            };
        };
        lval: <T>(sentence: string, ctx?: import("./template/eval").EvalContext | undefined) => {
            result: string | number | boolean | Date | T | null | undefined;
            logs: import("./template").ParserLog[];
        };
    };
    inflection: {
        camelize: (string: string, uppercaseFirstLetter?: boolean) => string;
        dasherize: (word: string) => string;
        humanize: (word: string) => string;
        ordinal: (number: string | number) => string;
        ordinalize: (number: string | number) => string;
        parameterize: (string: string, separator?: string) => string;
        pluralize: (word: string) => string;
        singularize: (word: string) => string;
        tableize: (word: string) => string;
        titleize: (word: string) => string;
        transliterate: (string: string) => string;
        underscore: (word: string) => string;
        UNCOUNTABLES: Set<string>;
        PLURALS: import("./inflection").RegexReplaceList;
        SINGULARS: import("./inflection").RegexReplaceList;
    };
    utils: {
        hashCode: (str: any, coerceToString?: boolean) => number | null;
        capitalize: (str: string) => string;
    };
    date: {
        parse: (input: any) => Date | null;
        isWeekend: (date: Date) => boolean;
        between: (date: Date, startDate: Date, endDate: Date) => boolean;
        timeSince: (date: Date) => [number, import("./date").TimeUnit];
    };
    fuzzy: {
        similarity: (str1: string, str2: string, gramSize?: number) => number;
        topSimilar: <T_1 = string>(value: T_1, values: T_1[], key: (obj: T_1) => string, topK?: number, thresh?: number, gramSize?: number) => T_1[];
    };
    array: {
        BisectArray: typeof import("./array/sorted").BisectArray;
        ReverseSortedArray: typeof import("./array/sorted").ReverseSortedArray;
        SortedArray: typeof import("./array/sorted").SortedArray;
        ReverseNumberArray: typeof import("./array/sorted").ReverseNumberArray;
        SortedNumberArray: typeof import("./array/sorted").SortedNumberArray;
        ReverseStringArray: typeof import("./array/sorted").ReverseStringArray;
        SortedStringArray: typeof import("./array/sorted").SortedStringArray;
        ReverseCompareArray: typeof import("./array/sorted").ReverseCompareArray;
        SortedCompareArray: typeof import("./array/sorted").SortedCompareArray;
    };
    diff: {
        compare: (a: string, b: string) => import("./diff").DiffResult;
    };
};
export default _default;
