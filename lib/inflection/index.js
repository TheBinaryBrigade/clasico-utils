"use strict";
// This code is a port of (i.e., based on) the inflection project (https://github.com/jpvanhal/inflection),
// which is licensed under the MIT License.
// Copyright (C) 2012-2020 Janne Vanhala
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const PLURALS = [
    [/(quiz)$/i, "$1zes"],
    [/^(oxen)$/i, "$1"],
    [/^(ox)$/i, "$1en"],
    [/(m|l)ice$/i, "$1ice"],
    [/(m|l)ouse$/i, "$1ice"],
    [/(passer)s?by$/i, "$1sby"],
    [/(matr|vert|ind)(?:ix|ex)$/i, "$1ices"],
    [/(x|ch|ss|sh)$/i, "$1es"],
    [/([^aeiouy]|qu)y$/i, "$1ies"],
    [/(hive)$/i, "$1s"],
    [/([lr])f$/i, "$1ves"],
    [/([^f])fe$/i, "$1ves"],
    [/sis$/i, "ses"],
    [/([ti])a$/i, "$1a"],
    [/([ti])um$/i, "$1a"],
    [/(buffal|potat|tomat)o$/i, "$1oes"],
    [/(bu)s$/i, "$1ses"],
    [/(alias|status)$/i, "$1es"],
    [/(octop|vir)i$/i, "$1i"],
    [/(octop|vir)us$/i, "$1i"],
    [/^(ax|test)is$/i, "$1es"],
    [/s$/i, "s"],
    [/$/i, "s"],
];
const SINGULARS = [
    [/(database)s$/i, "$1"],
    [/(quiz)zes$/i, "$1"],
    [/(matr)ices$/i, "$1ix"],
    [/(vert|ind)ices$/i, "$1ex"],
    [/(passer)sby$/i, "$1by"],
    [/^(ox)en/i, "$1"],
    [/(alias|status)(es)?$/i, "$1"],
    [/(octop|vir)(us|i)$/i, "$1us"],
    [/^(a)x[ie]s$/i, "$1xis"],
    [/(cris|test)(is|es)$/i, "$1is"],
    [/(shoe)s$/i, "$1"],
    [/(o)es$/i, "$1"],
    [/(bus)(es)?$/i, "$1"],
    [/(m|l)ice$/i, "$1ouse"],
    [/(x|ch|ss|sh)es$/i, "$1"],
    [/(m)ovies$/i, "$1ovie"],
    [/(s)eries$/i, "$1eries"],
    [/([^aeiouy]|qu)ies$/i, "$1y"],
    [/([lr])ves$/i, "$1f"],
    [/(tive)s$/i, "$1"],
    [/(hive)s$/i, "$1"],
    [/([^f])ves$/i, "$1fe"],
    [/(t)he(sis|ses)$/i, "$1hesis"],
    [/(s)ynop(sis|ses)$/i, "$1ynopsis"],
    [/(p)rogno(sis|ses)$/i, "$1rognosis"],
    [/(p)arenthe(sis|ses)$/i, "$1arenthesis"],
    [/(d)iagno(sis|ses)$/i, "$1iagnosis"],
    [/(b)a(sis|ses)$/i, "$1asis"],
    [/(a)naly(sis|ses)$/i, "$1nalysis"],
    [/([ti])a$/i, "$1um"],
    [/(n)ews$/i, "$1ews"],
    [/(ss)$/i, "$1"],
    [/s$/i, ""],
];
const UNCOUNTABLES = new Set([
    "equipment",
    "fish",
    "information",
    "jeans",
    "money",
    "rice",
    "series",
    "sheep",
    "species",
]);
/**

A convenience function to add appropriate rules to plurals and singular
for irregular words.

@param singular: irregular word in singular form
@param plural: irregular word in plural form
 */
const _irregular = (singular, plural) => {
    const caseinsensitive = (x) => {
        return Array
            .from(x)
            .map((char) => "[" + char + char.toUpperCase() + "]")
            .join("");
    };
    const insert = (arr, index, elem) => {
        arr.splice(index, 0, [new RegExp(elem[0], "i"), elem[1]]);
    };
    const pluralInsert = (index, elem) => {
        insert(PLURALS, index, elem);
    };
    const singularInsert = (index, elem) => {
        insert(SINGULARS, index, elem);
    };
    if (singular[0].toUpperCase() == plural[0].toUpperCase()) {
        pluralInsert(0, [
            `(${singular[0]})${singular.slice(1)}$`,
            "$1" + plural.slice(1)
        ]);
        pluralInsert(0, [
            `(${plural[0]})${plural.slice(1)}$`,
            "$1" + plural.slice(1)
        ]);
        singularInsert(0, [
            `(${plural[0]})${plural.slice(1)}$`,
            "$1" + singular.slice(1)
        ]);
    }
    else {
        pluralInsert(0, [
            `${singular[0].toUpperCase()}${caseinsensitive(singular.slice(1))}$`,
            plural[0].toUpperCase() + plural.slice(1)
        ]);
        pluralInsert(0, [
            `${singular[0].toLowerCase()}${caseinsensitive(singular.slice(1))}$`,
            plural[0].toLowerCase() + plural.slice(1)
        ]);
        pluralInsert(0, [
            `${plural[0].toUpperCase()}${caseinsensitive(plural.slice(1))}$`,
            plural[0].toUpperCase() + plural.slice(1)
        ]);
        pluralInsert(0, [
            `${plural[0].toLowerCase()}${caseinsensitive(plural.slice(1))}$`,
            plural[0].toLowerCase() + plural.slice(1)
        ]);
        singularInsert(0, [
            `${plural[0].toUpperCase()}${caseinsensitive(plural.slice(1))}$`,
            singular[0].toUpperCase() + singular.slice(1)
        ]);
        singularInsert(0, [
            `${plural[0].toLowerCase()}${caseinsensitive(plural.slice(1))}$`,
            singular[0].toLowerCase() + singular.slice(1)
        ]);
    }
};
const camelize = (string, uppercaseFirstLetter = true) => {
    const camelCase = dasherize(string)
        .replace(/-/, " ")
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
        .replace(/\s+/g, "");
    const result = uppercaseFirstLetter
        ? camelCase.charAt(0).toUpperCase() + camelCase.slice(1)
        : camelCase;
    return result;
};
/** Replace underscores with dashes in the string.
 Example: dasherize("puni_puni") returns 'puni-puni'
 */
const dasherize = (word) => {
    return word.replace(/_/g, "-");
};
/**
  Capitalize the first word and turn underscores into spaces and strip a
  trailing "_id", if any. Like titleize, this is meant for creating pretty output.

  Examples:

  >>> humanize("employee_salary")
  'Employee salary'
  >>> humanize("author_id")
  'Author'
  */
const humanize = (word) => {
    word = word.replace(/_id$/i, "");
    word = word.replace(/_/g, " ");
    word = word.replace(/([a-z\d]*)/g, (m) => {
        return m.toLowerCase();
    });
    word = word.replace(/^\w/, (m) => {
        return m.toUpperCase();
    });
    return word;
};
/**
  Return the suffix that should be added to a number to denote the position
  in an ordered sequence such as 1st, 2nd, 3rd, 4th.

  Examples:
  >>> ordinal(1)
  'st'
  >>> ordinal(2)
  'nd'
  >>> ordinal(1002)
  'nd'
  >>> ordinal(1003)
  'rd'
  >>> ordinal(-11)
  'th'
  >>> ordinal(-1021)
  'st'
  */
const ordinal = (number) => {
    const n = Math.abs(parseInt(number));
    if ([11, 12, 13].includes(n % 100)) {
        return "th";
    }
    else {
        switch (n % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }
};
/**
  Turn a number into an ordinal string used to denote the position in an
  ordered sequence such as 1st, 2nd, 3rd, 4th.

  Examples:

  >>> ordinalize(1)
  '1st'
  >>> ordinalize(2)
  '2nd'
  >>> ordinalize(1002)
  '1002nd'
  >>> ordinalize(1003)
  '1003rd'
  >>> ordinalize(-11)
  '-11th'
  >>> ordinalize(-1021)
  '-1021st'
  */
const ordinalize = (number) => {
    return number + ordinal(number);
};
const parameterize = (string, separator = "-") => {
    const cleaned = transliterate(string);
    let param = cleaned.replace(/[^\d\w-]+/gmi, separator);
    if (separator !== "") {
        while (param.startsWith(separator)) {
            param = param.slice(separator.length);
        }
        while (param.endsWith(separator)) {
            param = param.slice(0, param.length - separator.length);
        }
    }
    return param.toLowerCase();
};
const pluralize = (word) => {
    const isUpper = /[A-Z]/.test(word.charAt(0));
    const endsWithLetter = /[A-Za-z]$/.test(word);
    if (!word || UNCOUNTABLES.has(word.toLowerCase()) || !endsWithLetter) {
        return word;
    }
    for (const elem of PLURALS) {
        const rule = elem[0];
        const replacement = elem[1];
        if (rule.test(word)) {
            const result = word.replace(rule, replacement);
            return isUpper ? utils_1.default.capitalize(result) : result;
        }
    }
    return word;
};
const singularize = (word) => {
    const isUpper = /[A-Z]/.test(word.charAt(0));
    for (const u of UNCOUNTABLES) {
        const regex = new RegExp(`\\b${u}\\b`, "i");
        if (regex.test(word)) {
            return word;
        }
    }
    for (const elem of SINGULARS) {
        const rule = elem[0];
        const replacement = elem[1];
        if (rule.test(word)) {
            const result = word.replace(rule, replacement);
            return isUpper ? utils_1.default.capitalize(result) : result;
        }
    }
    return word;
};
const tableize = (word) => {
    return pluralize(underscore(word));
};
const titleize = (word) => {
    return humanize(underscore(word))
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};
const transliterate = (string) => {
    const normalized = string.normalize("NFKD");
    return normalized
        .replace(/[\u0300-\u036f]/g, "") // remove combining diacritical marks
        // eslint-disable-next-line no-control-regex
        .replace(/[^\x00-\x7F]/g, "") // remove non-ASCII characters
        .trim();
};
const underscore = (word) => {
    let underscored = word.replace(/([a-z\d])([A-Z])/g, "$1_$2"); // split camelCase
    underscored = underscored.replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2"); // split PascalCase
    underscored = underscored.replace(/-/g, "_"); // replace hyphens with underscores
    return underscored.toLowerCase();
};
_irregular("person", "people");
_irregular("man", "men");
_irregular("human", "humans");
_irregular("child", "children");
_irregular("sex", "sexes");
_irregular("move", "moves");
_irregular("cow", "kine");
_irregular("zombie", "zombies");
_irregular("slave", "slaves");
_irregular("this", "this");
_irregular("flour", "flour");
_irregular("milk", "milk");
_irregular("water", "water");
_irregular("reserve", "reserves");
_irregular("gas", "gasses");
_irregular("bias", "biases");
_irregular("atlas", "atlases");
_irregular("goose", "geese");
_irregular("pasta", "pastas");
_irregular("slice", "slices");
_irregular("cactus", "cacti");
exports.default = {
    camelize,
    dasherize,
    humanize,
    ordinal,
    ordinalize,
    parameterize,
    pluralize,
    singularize,
    tableize,
    titleize,
    transliterate,
    underscore,
    UNCOUNTABLES,
    PLURALS,
    SINGULARS,
};
