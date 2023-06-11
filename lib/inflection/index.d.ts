export type RegexReplaceList = [RegExp, string][];
declare const _default: {
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
    PLURALS: RegexReplaceList;
    SINGULARS: RegexReplaceList;
};
export default _default;
