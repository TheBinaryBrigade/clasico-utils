export type RegexReplaceList = [RegExp, string][];
declare const _default: {
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
    PLURALS: RegexReplaceList;
    SINGULARS: RegexReplaceList;
};
export default _default;
