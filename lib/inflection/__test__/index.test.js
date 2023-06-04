"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const __1 = require("..");
const utils_1 = require("../../utils");
if (globals_1.test.each === undefined) {
    const test_each_fill = (arr) => {
        return (description, cb) => {
            arr.forEach((args) => {
                (0, globals_1.test)(description, () => {
                    cb(...args);
                });
            });
        };
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globals_1.test.each = test_each_fill;
}
const SINGULAR_TO_PLURAL = [
    ["search", "searches"],
    ["switch", "switches"],
    ["fix", "fixes"],
    ["box", "boxes"],
    ["process", "processes"],
    ["address", "addresses"],
    ["case", "cases"],
    ["stack", "stacks"],
    ["wish", "wishes"],
    ["fish", "fish"],
    ["jeans", "jeans"],
    ["funky jeans", "funky jeans"],
    ["category", "categories"],
    ["query", "queries"],
    ["ability", "abilities"],
    ["agency", "agencies"],
    ["movie", "movies"],
    ["archive", "archives"],
    ["index", "indices"],
    ["wife", "wives"],
    ["safe", "saves"],
    ["half", "halves"],
    ["move", "moves"],
    ["salesperson", "salespeople"],
    ["person", "people"],
    ["spokesman", "spokesmen"],
    ["man", "men"],
    ["woman", "women"],
    ["basis", "bases"],
    ["diagnosis", "diagnoses"],
    ["diagnosis_a", "diagnosis_as"],
    ["datum", "data"],
    ["medium", "media"],
    ["stadium", "stadia"],
    ["analysis", "analyses"],
    ["node_child", "node_children"],
    ["child", "children"],
    ["experience", "experiences"],
    ["day", "days"],
    ["comment", "comments"],
    ["foobar", "foobars"],
    ["newsletter", "newsletters"],
    ["old_news", "old_news"],
    ["news", "news"],
    ["series", "series"],
    ["species", "species"],
    ["quiz", "quizzes"],
    ["perspective", "perspectives"],
    ["ox", "oxen"],
    ["passerby", "passersby"],
    ["photo", "photos"],
    ["buffalo", "buffaloes"],
    ["tomato", "tomatoes"],
    ["potato", "potatoes"],
    ["dwarf", "dwarves"],
    ["elf", "elves"],
    ["information", "information"],
    ["equipment", "equipment"],
    ["bus", "buses"],
    ["status", "statuses"],
    ["status_code", "status_codes"],
    ["mouse", "mice"],
    ["louse", "lice"],
    ["house", "houses"],
    ["octopus", "octopi"],
    ["virus", "viri"],
    ["alias", "aliases"],
    ["portfolio", "portfolios"],
    ["vertex", "vertices"],
    ["matrix", "matrices"],
    ["matrix_fu", "matrix_fus"],
    ["axis", "axes"],
    ["testis", "testes"],
    ["crisis", "crises"],
    ["rice", "rice"],
    ["shoe", "shoes"],
    ["horse", "horses"],
    ["prize", "prizes"],
    ["edge", "edges"],
    ["cow", "kine"],
    ["database", "databases"],
    ["human", "humans"],
    ["<p>hello, world!</p>", "<p>hello, world!</p>"],
];
const CAMEL_TO_UNDERSCORE = [
    ["Product", "product"],
    ["SpecialGuest", "special_guest"],
    ["ApplicationController", "application_controller"],
    ["Area51Controller", "area51_controller"],
];
const CAMEL_TO_UNDERSCORE_WITHOUT_REVERSE = [
    ["HTMLTidy", "html_tidy"],
    ["HTMLTidyGenerator", "html_tidy_generator"],
    ["FreeBSD", "free_bsd"],
    ["HTML", "html"],
];
const STRING_TO_PARAMETERIZED = [
    ["Donald E. Knuth", "donald-e-knuth"],
    [
        "Random text with *(bad)* characters",
        "random-text-with-bad-characters"
    ],
    ["Allow_Under_Scores", "allow_under_scores"],
    ["Trailing bad characters!@#", "trailing-bad-characters"],
    ["!@#Leading bad characters", "leading-bad-characters"],
    ["Squeeze   separators", "squeeze-separators"],
    ["Test with + sign", "test-with-sign"],
    ["Test with malformed utf8 \u00A9", "test-with-malformed-utf8"],
];
const STRING_TO_PARAMETERIZE_WITH_NO_SEPARATOR = [
    ["Donald E. Knuth", "donaldeknuth"],
    ["With-some-dashes", "with-some-dashes"],
    ["Random text with *(bad)* characters", "randomtextwithbadcharacters"],
    ["Trailing bad characters!@#", "trailingbadcharacters"],
    ["!@#Leading bad characters", "leadingbadcharacters"],
    ["Squeeze   separators", "squeezeseparators"],
    ["Test with + sign", "testwithsign"],
    ["Test with malformed utf8 \u00A9", "testwithmalformedutf8"],
];
const STRING_TO_PARAMETERIZE_WITH_UNDERSCORE = [
    ["Donald E. Knuth", "donald_e_knuth"],
    [
        "Random text with *(bad)* characters",
        "random_text_with_bad_characters"
    ],
    ["With-some-dashes", "with-some-dashes"],
    ["Retain_underscore", "retain_underscore"],
    ["Trailing bad characters!@#", "trailing_bad_characters"],
    ["!@#Leading bad characters", "leading_bad_characters"],
    ["Squeeze   separators", "squeeze_separators"],
    ["Test with + sign", "test_with_sign"],
    ["Test with malformed utf8 \u00A9", "test_with_malformed_utf8"],
];
const STRING_TO_PARAMETERIZED_AND_NORMALIZED = [
    ["Malmö", "malmo"],
    ["Garçons", "garcons"],
    ["Ops\u00A9", "ops"],
    ["Ærøskøbing", "rskbing"],
    ["Aßlar", "alar"],
    ["Japanese: 日本語", "japanese"],
];
const UNDERSCORE_TO_HUMAN = [
    ["employee_salary", "Employee salary"],
    ["employee_id", "Employee"],
    ["underground", "Underground"],
];
const MIXTURE_TO_TITLEIZED = [
    ["active_record", "Active Record"],
    ["ActiveRecord", "Active Record"],
    ["action web service", "Action Web Service"],
    ["Action Web Service", "Action Web Service"],
    ["Action web service", "Action Web Service"],
    ["actionwebservice", "Actionwebservice"],
    ["Actionwebservice", "Actionwebservice"],
    ["david's code", "David's Code"],
    ["David's code", "David's Code"],
    ["david's Code", "David's Code"],
    ["ana índia", "Ana Índia"],
    ["Ana Índia", "Ana Índia"],
];
const ORDINAL_NUMBERS = [
    ["-1", "-1st"],
    ["-2", "-2nd"],
    ["-3", "-3rd"],
    ["-4", "-4th"],
    ["-5", "-5th"],
    ["-6", "-6th"],
    ["-7", "-7th"],
    ["-8", "-8th"],
    ["-9", "-9th"],
    ["-10", "-10th"],
    ["-11", "-11th"],
    ["-12", "-12th"],
    ["-13", "-13th"],
    ["-14", "-14th"],
    ["-20", "-20th"],
    ["-21", "-21st"],
    ["-22", "-22nd"],
    ["-23", "-23rd"],
    ["-24", "-24th"],
    ["-100", "-100th"],
    ["-101", "-101st"],
    ["-102", "-102nd"],
    ["-103", "-103rd"],
    ["-104", "-104th"],
    ["-110", "-110th"],
    ["-111", "-111th"],
    ["-112", "-112th"],
    ["-113", "-113th"],
    ["-1000", "-1000th"],
    ["-1001", "-1001st"],
    ["0", "0th"],
    ["1", "1st"],
    ["2", "2nd"],
    ["3", "3rd"],
    ["4", "4th"],
    ["5", "5th"],
    ["6", "6th"],
    ["7", "7th"],
    ["8", "8th"],
    ["9", "9th"],
    ["10", "10th"],
    ["11", "11th"],
    ["12", "12th"],
    ["13", "13th"],
    ["14", "14th"],
    ["20", "20th"],
    ["21", "21st"],
    ["22", "22nd"],
    ["23", "23rd"],
    ["24", "24th"],
    ["100", "100th"],
    ["101", "101st"],
    ["102", "102nd"],
    ["103", "103rd"],
    ["104", "104th"],
    ["110", "110th"],
    ["111", "111th"],
    ["112", "112th"],
    ["113", "113th"],
    ["1000", "1000th"],
    ["1001", "1001st"],
];
const UNDERSCORES_TO_DASHES = [
    ["street", "street"],
    ["street_address", "street-address"],
    ["person_street_address", "person-street-address"],
];
const STRING_TO_TABLEIZE = [
    ["person", "people"],
    ["Country", "countries"],
    ["ChildToy", "child_toys"],
    ["_RecipeIngredient", "_recipe_ingredients"],
];
(0, globals_1.describe)("inflection", () => {
    (0, globals_1.test)("test pluralize plurals", () => {
        (0, globals_1.expect)(__1.default.pluralize("plurals")).toBe("plurals");
        (0, globals_1.expect)(__1.default.pluralize("Plurals")).toBe("Plurals");
    });
    (0, globals_1.test)("pluralize empty string", () => {
        (0, globals_1.expect)(__1.default.pluralize("")).toBe("");
    });
    (0, globals_1.test)("test unaacountability", () => {
        __1.default.UNCOUNTABLES.forEach((x) => {
            const sing = __1.default.singularize(x);
            const plur = __1.default.pluralize(x);
            (0, globals_1.expect)(sing).toBe(x);
            (0, globals_1.expect)(plur).toBe(x);
            (0, globals_1.expect)(sing).toBe(plur);
        });
    });
    (0, globals_1.test)("test uncountable word is not greedy", () => {
        const uncountWord = "ors";
        const countWord = "sponsor";
        __1.default.UNCOUNTABLES.add(uncountWord);
        try {
            (0, globals_1.expect)(uncountWord).toBe(__1.default.singularize(uncountWord));
            (0, globals_1.expect)(uncountWord).toBe(__1.default.pluralize(uncountWord));
            (0, globals_1.expect)(__1.default.pluralize(uncountWord)).toBe(__1.default.singularize(uncountWord));
            (0, globals_1.expect)(__1.default.singularize(countWord)).toBe("sponsor");
            (0, globals_1.expect)(__1.default.pluralize(countWord)).toBe("sponsors");
            (0, globals_1.expect)(__1.default.singularize(__1.default.pluralize(countWord))).toBe("sponsor");
        }
        finally {
            __1.default.UNCOUNTABLES.delete(uncountWord);
        }
    });
    globals_1.test.each(SINGULAR_TO_PLURAL)("pluralize singular %s to %s", (singular, plural) => {
        (0, globals_1.expect)(__1.default.pluralize(singular)).toBe(plural);
        (0, globals_1.expect)(__1.default.pluralize(utils_1.default.capitalize(singular))).toBe(utils_1.default.capitalize(plural));
    });
    globals_1.test.each(SINGULAR_TO_PLURAL)("singularize plural %s to %s", (singular, plural) => {
        (0, globals_1.expect)(__1.default.singularize(plural)).toBe(singular);
        (0, globals_1.expect)(__1.default.singularize(utils_1.default.capitalize(plural))).toBe(utils_1.default.capitalize(singular));
    });
    globals_1.test.each(SINGULAR_TO_PLURAL)("pluralize plural %s to %s", (singular, plural) => {
        (0, globals_1.expect)(__1.default.pluralize(plural)).toBe(plural);
        (0, globals_1.expect)(__1.default.pluralize(utils_1.default.capitalize(plural))).toBe(utils_1.default.capitalize(plural));
    });
    globals_1.test.each(MIXTURE_TO_TITLEIZED)("titleize %s to %s", (before, titleized) => {
        (0, globals_1.expect)(__1.default.titleize(before)).toBe(titleized);
    });
    globals_1.test.each(CAMEL_TO_UNDERSCORE)("camelize %s to %s", (camel, underscore) => {
        (0, globals_1.expect)(__1.default.camelize(underscore)).toBe(camel);
    });
    (0, globals_1.test)("test camelize with lower downcases the first letter", () => {
        (0, globals_1.expect)(__1.default.camelize("Capital", false)).toBe("capital");
    });
    (0, globals_1.test)("test camelize with underscores", () => {
        (0, globals_1.expect)(__1.default.camelize("Camel_Case")).toBe("CamelCase");
    });
    (0, globals_1.describe)("underscore", () => {
        globals_1.test.each(CAMEL_TO_UNDERSCORE.concat(CAMEL_TO_UNDERSCORE_WITHOUT_REVERSE))("underscore %p should be equal to %p", (camel, underscore) => {
            (0, globals_1.expect)(__1.default.underscore(camel)).toBe(underscore);
        });
    });
    (0, globals_1.describe)("parameterize", () => {
        globals_1.test.each(STRING_TO_PARAMETERIZED)("parameterized string of %p should be equal to %p", (some_string, parameterized_string) => {
            (0, globals_1.expect)(__1.default.parameterize(some_string)).toBe(parameterized_string);
        });
        globals_1.test.each(STRING_TO_PARAMETERIZED_AND_NORMALIZED)("parameterized and normalized string of %p should be equal to %p", (some_string, parameterized_string) => {
            (0, globals_1.expect)(__1.default.parameterize(some_string)).toBe(parameterized_string);
        });
        globals_1.test.each(STRING_TO_PARAMETERIZE_WITH_UNDERSCORE)("parameterized string of %p with '_' separator should be equal to %p", (some_string, parameterized_string) => {
            (0, globals_1.expect)(__1.default.parameterize(some_string, "_")).toBe(parameterized_string);
        });
        globals_1.test.each(STRING_TO_PARAMETERIZED)("parameterized string of %p with '__sep__' separator should be equal to %p", (some_string, parameterized_string) => {
            let ps = parameterized_string;
            while (ps.includes("-")) {
                ps = ps.replace("-", "__sep__");
            }
            (0, globals_1.expect)(__1.default.parameterize(some_string, "__sep__")).toBe(ps);
        });
        globals_1.test.each(STRING_TO_PARAMETERIZE_WITH_NO_SEPARATOR)("parameterized string of %p with no separator should be equal to %p", (some_string, parameterized_string) => {
            (0, globals_1.expect)(__1.default.parameterize(some_string, "")).toBe(parameterized_string);
        });
    });
    (0, globals_1.describe)("humanize", () => {
        globals_1.test.each(UNDERSCORE_TO_HUMAN)("humanized %p should be equal to %p", (underscore, human) => {
            (0, globals_1.expect)(__1.default.humanize(underscore)).toBe(human);
        });
    });
    (0, globals_1.describe)("ordinal", () => {
        globals_1.test.each(ORDINAL_NUMBERS)("ordinalized number %p should be equal to %p", (number, ordinalized) => {
            (0, globals_1.expect)(number + __1.default.ordinal(number)).toBe(ordinalized);
        });
    });
    (0, globals_1.describe)("ordinalize", () => {
        globals_1.test.each(ORDINAL_NUMBERS)("ordinalized number %p should be equal to %p", (number, ordinalized) => {
            (0, globals_1.expect)(__1.default.ordinalize(number)).toBe(ordinalized);
        });
    });
    (0, globals_1.describe)("dasherize", () => {
        globals_1.test.each(UNDERSCORES_TO_DASHES)("dasherized %p should be equal to %p", (input, expected) => {
            (0, globals_1.expect)(__1.default.dasherize(input)).toBe(expected);
        });
    });
    (0, globals_1.describe)("tableize", () => {
        globals_1.test.each(STRING_TO_TABLEIZE)("tableized %p should be equal to %p", (input, expected) => {
            (0, globals_1.expect)(__1.default.tableize(input)).toBe(expected);
        });
    });
});
