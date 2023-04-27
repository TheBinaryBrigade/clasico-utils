import * as types from "./@types";
import * as std from "./std";
declare const _default: {
    check: {
        isNil: (x: any) => boolean;
        isNumber: (x: any) => boolean;
        isString: (x: any) => boolean;
        isBoolean: (x: any) => boolean;
        isFunction: (x: any) => boolean;
        isObject: (x: any) => boolean;
        isNumeric: (x: any) => boolean;
        isValidBoolean: (x: any) => boolean;
        isTrue: (x: any) => boolean;
        isFalse: (x: any) => boolean;
        isArray: (x: any) => boolean;
        isSet: (x: any) => boolean;
        isIterable: (x: any) => boolean;
        isDate: (x: any) => boolean;
        isError: (x: any, errorLike?: boolean) => boolean;
    };
    parser: {
        SentenceParser: {
            new (options?: import("./eval").SentenceParserOptions, ctx?: import("./eval/eval").EvalContext): {
                options: import("./eval").SentenceParserOptions;
                ctx: import("./eval/eval").EvalContext;
                fixName(name: string): string;
                fnExists(name: string): boolean;
                varExists(name: string): boolean;
                addVar(name: string, value: any): void;
                addFunction(name: string, cb: types.AnyFn): void;
                parse(sentence: string): {
                    result: string;
                    warnings: {
                        lineNumber: number;
                        message: string;
                    }[];
                    errors: {
                        lineNumber: number;
                        message: string;
                        error: Error;
                    }[];
                };
            };
        };
        builtinFunctions: () => {
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
        parseSentence: (sentence: string, _ctx?: import("./eval/eval").EvalContext) => {
            result: string;
            warnings: {
                lineNumber: number;
                message: string;
            }[];
            errors: {
                lineNumber: number;
                message: string;
                error: Error;
            }[];
        };
    };
    inflection: {
        camelize: (string: string, uppercaseFirstLetter?: boolean) => string;
        dasherize: (word: string) => string;
        humanize: (word: string) => string;
        ordinal: (number: string) => string;
        ordinalize: (number: string) => string;
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
        subtractSeconds: (date: Date, seconds: number) => Date;
        parse: (input: any) => Date | null;
        isWeekend: (date: Date) => boolean;
        between: (date: Date, startDate: Date, endDate: Date) => boolean;
    };
    fuzzy: {
        similarity: (str1: string, str2: string, gramSize?: number) => number;
        topSimilar: <T = string>(value: T, values: T[], key: (obj: T) => string, topK?: number, gramSize?: number) => T[];
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
    std: typeof std;
};
export default _default;
