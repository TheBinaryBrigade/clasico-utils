import * as types from "./@types";
declare const _default: {
    check: {
        isNil: (x: unknown) => x is null | undefined;
        isNumber: (x: unknown) => x is number;
        isBigInt: (x: unknown) => x is bigint;
        isString: (x: unknown) => x is string;
        isBoolean: (x: unknown) => x is boolean;
        isFunction: (x: unknown) => x is types.AnyFn;
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
                    $int: (x: any, radix: any) => number;
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
                    $int: (x: any, radix: any) => number;
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
                    $int: (x: any, radix: any) => number;
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
                    $int: (x: any, radix: any) => number;
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
        camelize: (str: string, uppercaseFirstLetter?: boolean) => string;
        dasherize: (word: string) => string;
        humanize: (word: string) => string;
        ordinal: (num: string | number) => string;
        ordinalize: (num: string | number) => string;
        parameterize: (str: string, separator?: string) => string;
        pluralize: (word: string) => string;
        singularize: (word: string) => string;
        tableize: (word: string) => string;
        titleize: (word: string) => string;
        transliterate: (str: string) => string;
        underscore: (word: string) => string;
        UNCOUNTABLES: Set<string>;
        PLURALS: import("./inflection").RegexReplaceList;
        SINGULARS: import("./inflection").RegexReplaceList;
    };
    utils: {
        hashCode: (str: any, coerceToString?: boolean) => number | null;
        isPrime: (num: number) => boolean;
        capitalize: (str: string) => string;
        retry: <T_1>(operation: () => Promise<T_1>, maxRetries: number, delay: number) => Promise<T_1>;
        sleep: (ms: number) => Promise<unknown>;
    };
    date: {
        parse: (input: any) => Date | null;
        isWeekend: (date: Date) => boolean;
        between: (date: Date, startDate: Date, endDate: Date) => boolean;
        timeSince: (date: Date) => [number, import("./date").TimeUnit];
    };
    fuzzy: {
        similarity: (str1: string, str2: string, gramSize?: number) => number;
        topSimilar: <T_2 = string>(value: T_2, values: T_2[], key: (obj: T_2) => string, topK?: number, thresh?: number, gramSize?: number) => T_2[];
    };
    array: {
        chunkArray: typeof import("./array/zip").chunkArray;
        noDuplicates: typeof import("./array/remove.duplicates").noDuplicates;
        walkBackString: typeof import("./array/remove.duplicates").walkBackString;
        findAllCommonPrefixes: typeof import("./array/remove.duplicates").findAllCommonPrefixes;
        removeDuplicates: typeof import("./array/remove.duplicates").removeDuplicates;
        zip: typeof import("./array/zip").zip;
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
    nlp: {
        stemmer: (word: string) => string;
        PART_OF_SPEECH_MAP: {
            readonly CC: {
                readonly title: "Coordinating conjunction";
                readonly description: "A word that connects words, phrases, or clauses of equal rank.";
                readonly examples: readonly ["and", "but", "or"];
            };
            readonly CD: {
                readonly title: "Cardinal number";
                readonly description: "A word that denotes quantity.";
                readonly examples: readonly ["one", "two", "three"];
            };
            readonly DT: {
                readonly title: "Determiner";
                readonly description: "A word that introduces a noun and specifies it as known or unknown, and often specifies quantity.";
                readonly examples: readonly ["a", "an", "the"];
            };
            readonly EX: {
                readonly title: "Existential there";
                readonly description: "A word used to introduce a sentence in which the existence of something is asserted.";
                readonly examples: readonly ["There"];
            };
            readonly FW: {
                readonly title: "Foreign word";
                readonly description: "A word or phrase that is not native to the language but used in certain contexts.";
                readonly examples: readonly ["rendezvous", "hacienda", "sushi"];
            };
            readonly IN: {
                readonly title: "Preposition or subordinating conjunction";
                readonly description: "A word that relates the noun or pronoun to another word in the sentence or introduces a subordinate clause.";
                readonly examples: readonly ["in", "on", "because"];
            };
            readonly JJ: {
                readonly title: "Adjective";
                readonly description: "A word that describes or modifies a noun or pronoun.";
                readonly examples: readonly ["happy", "green", "loud"];
            };
            readonly JJR: {
                readonly title: "Adjective, comparative";
                readonly description: "An adjective that compares two things.";
                readonly examples: readonly ["happier", "greener", "louder"];
            };
            readonly JJS: {
                readonly title: "Adjective, superlative";
                readonly description: "An adjective that describes the highest degree of something.";
                readonly examples: readonly ["happiest", "greenest", "loudest"];
            };
            readonly LS: {
                readonly title: "List item marker";
                readonly description: "A word or symbol that denotes an item in a list.";
                readonly examples: readonly ["1.", "a)", "*"];
            };
            readonly MD: {
                readonly title: "Modal";
                readonly description: "A verb that is used with another verb to express necessity, possibility, intention, or ability.";
                readonly examples: readonly ["can", "will", "must"];
            };
            readonly NN: {
                readonly title: "Noun, singular or mass";
                readonly description: "A word that represents a person, place, thing, or idea.";
                readonly examples: readonly ["cat", "city", "love"];
            };
            readonly NNS: {
                readonly title: "Noun, plural";
                readonly description: "A word that represents multiple persons, places, or things.";
                readonly examples: readonly ["cats", "cities", "loves"];
            };
            readonly NNP: {
                readonly title: "Proper noun, singular";
                readonly description: "A name used for an individual person, place, or organization, spelled with an initial capital letter.";
                readonly examples: readonly ["Alice", "Paris", "Apple"];
            };
            readonly NNPS: {
                readonly title: "Proper noun, plural";
                readonly description: "Names used for a specific group of people, places, or things, spelled with an initial capital letter.";
                readonly examples: readonly ["Americans", "Alps", "Aristotles"];
            };
            readonly PDT: {
                readonly title: "Predeterminer";
                readonly description: "A word that is placed before a determiner to modify the noun that follows.";
                readonly examples: readonly ["all", "both", "half"];
            };
            readonly POS: {
                readonly title: "Possessive ending";
                readonly description: "A suffix added to nouns to indicate possession.";
                readonly examples: readonly ["'s", "'"];
            };
            readonly PRP: {
                readonly title: "Personal pronoun";
                readonly description: "A word that substitutes for a noun or noun phrase and represents people or things.";
                readonly examples: readonly ["I", "you", "he", "she", "it"];
            };
            readonly PRP$: {
                readonly title: "Possessive pronoun";
                readonly description: "A pronoun that shows ownership.";
                readonly examples: readonly ["my", "your", "his", "her", "its"];
            };
            readonly RB: {
                readonly title: "Adverb";
                readonly description: "A word that modifies verbs, adjectives, or other adverbs, expressing manner, place, time, or degree.";
                readonly examples: readonly ["quickly", "there", "very"];
            };
            readonly RBR: {
                readonly title: "Adverb, comparative";
                readonly description: "An adverb that compares two actions.";
                readonly examples: readonly ["quicker", "more quickly", "less quickly"];
            };
            readonly RBS: {
                readonly title: "Adverb, superlative";
                readonly description: "An adverb that describes the highest degree of an action.";
                readonly examples: readonly ["quickest", "most quickly"];
            };
            readonly RP: {
                readonly title: "Particle";
                readonly description: "A word that is used with verbs to create phrasal verbs.";
                readonly examples: readonly ["up", "out", "on"];
            };
            readonly SYM: {
                readonly title: "Symbol";
                readonly description: "A character used as a conventional representation of an object, function, or process.";
                readonly examples: readonly ["&", "%", "$"];
            };
            readonly TO: {
                readonly title: "Preposition/Infinitival to";
                readonly description: "A preposition or a part of an infinitive verb.";
                readonly examples: readonly ["to the store", "to run"];
            };
            readonly UH: {
                readonly title: "Interjection";
                readonly description: "An exclamation, especially as a part of speech, e.g., ah! or dear me!.";
                readonly examples: readonly ["oh", "wow", "uh"];
            };
            readonly VB: {
                readonly title: "Verb, base form";
                readonly description: "The basic form of a verb from which other forms are derived.";
                readonly examples: readonly ["be", "have", "do"];
            };
            readonly VBD: {
                readonly title: "Verb, past tense";
                readonly description: "A verb form that indicates actions or states in the past.";
                readonly examples: readonly ["was", "had", "did"];
            };
            readonly VBG: {
                readonly title: "Verb, gerund or present participle";
                readonly description: "A verb form that ends in -ing and functions as a noun or modifies nouns.";
                readonly examples: readonly ["running", "having", "doing"];
            };
            readonly VBN: {
                readonly title: "Verb, past participle";
                readonly description: "A verb form that typically ends in -ed or -en and is used to form passive verb tenses or adjectives.";
                readonly examples: readonly ["eaten", "written", "done"];
            };
            readonly VBP: {
                readonly title: "Verb, non-3rd person singular present";
                readonly description: "A verb form that does not agree with third-person singular subjects in the present tense.";
                readonly examples: readonly ["am", "have", "run"];
            };
            readonly VBZ: {
                readonly title: "Verb, 3rd person singular present";
                readonly description: "A verb form that agrees with third-person singular subjects in the present tense.";
                readonly examples: readonly ["is", "has", "runs"];
            };
            readonly WDT: {
                readonly title: "Wh-determiner";
                readonly description: "A determiner that introduces a relative clause, typically referring back to something previously mentioned.";
                readonly examples: readonly ["which", "that", "what"];
            };
            readonly WP: {
                readonly title: "Wh-pronoun";
                readonly description: "A pronoun that introduces a relative clause, referring back to something previously mentioned.";
                readonly examples: readonly ["who", "whom", "whose"];
            };
            readonly WP$: {
                readonly title: "Possessive wh-pronoun";
                readonly description: "A pronoun that shows ownership and introduces a relative clause.";
                readonly examples: readonly ["whose"];
            };
            readonly WRB: {
                readonly title: "Wh-adverb";
                readonly description: "An adverb that introduces a question or relative clause.";
                readonly examples: readonly ["where", "when", "why"];
            };
        };
        isStopWord: (word: string, lang?: "english") => boolean;
        removeStopWords: (input: string, lang?: "english") => string;
    };
};
export default _default;
