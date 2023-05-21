import { describe, expect, test } from "@jest/globals";
import inflection from "..";
import utils from "../../utils";

if (test.each === undefined) {
  const test_each_fill = (arr: [unknown, unknown][]) => {
    type TestCb = (input: unknown, expected: unknown) => void;
    return (description: string, cb: TestCb) => {
      arr.forEach((args) => {
        test(description, () => {
          cb(...args);
        });
      });
    };
  };
  test.each = test_each_fill as any;
}

type TestParameters = [string, string][];

const SINGULAR_TO_PLURAL: TestParameters = [
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

const CAMEL_TO_UNDERSCORE: TestParameters = [
  ["Product", "product"],
  ["SpecialGuest", "special_guest"],
  ["ApplicationController", "application_controller"],
  ["Area51Controller", "area51_controller"],
];

const CAMEL_TO_UNDERSCORE_WITHOUT_REVERSE: TestParameters = [
  ["HTMLTidy", "html_tidy"],
  ["HTMLTidyGenerator", "html_tidy_generator"],
  ["FreeBSD", "free_bsd"],
  ["HTML", "html"],
];

const STRING_TO_PARAMETERIZED: TestParameters = [
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

const STRING_TO_PARAMETERIZE_WITH_NO_SEPARATOR: TestParameters = [
  ["Donald E. Knuth", "donaldeknuth"],
  ["With-some-dashes", "with-some-dashes"],
  ["Random text with *(bad)* characters", "randomtextwithbadcharacters"],
  ["Trailing bad characters!@#", "trailingbadcharacters"],
  ["!@#Leading bad characters", "leadingbadcharacters"],
  ["Squeeze   separators", "squeezeseparators"],
  ["Test with + sign", "testwithsign"],
  ["Test with malformed utf8 \u00A9", "testwithmalformedutf8"],
];

const STRING_TO_PARAMETERIZE_WITH_UNDERSCORE: TestParameters = [
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

const STRING_TO_PARAMETERIZED_AND_NORMALIZED: TestParameters = [
  ["Malmö", "malmo"],
  ["Garçons", "garcons"],
  ["Ops\u00A9", "ops"], // expected was opsu
  ["Ærøskøbing", "rskbing"],
  ["Aßlar", "alar"],
  ["Japanese: 日本語", "japanese"],
];

const UNDERSCORE_TO_HUMAN: TestParameters = [
  ["employee_salary", "Employee salary"],
  ["employee_id", "Employee"],
  ["underground", "Underground"],
];

const MIXTURE_TO_TITLEIZED: TestParameters = [
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

const ORDINAL_NUMBERS: TestParameters = [
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

const UNDERSCORES_TO_DASHES: TestParameters = [
  ["street", "street"],
  ["street_address", "street-address"],
  ["person_street_address", "person-street-address"],
];

const STRING_TO_TABLEIZE: TestParameters = [
  ["person", "people"],
  ["Country", "countries"],
  ["ChildToy", "child_toys"],
  ["_RecipeIngredient", "_recipe_ingredients"],
];

describe("inflection", () => {
  test("test pluralize plurals", () => {
    expect(inflection.pluralize("plurals")).toBe("plurals");
    expect(inflection.pluralize("Plurals")).toBe("Plurals");
  });


  test("pluralize empty string", () => {
    expect(inflection.pluralize("")).toBe("");
  });

  test("test unaacountability", () => {
    inflection.UNCOUNTABLES.forEach((x) => {
      const sing = inflection.singularize(x);
      const plur = inflection.pluralize(x);
      expect(sing).toBe(x);
      expect(plur).toBe(x);
      expect(sing).toBe(plur);
    });
  });

  test("test uncountable word is not greedy", () => {
    const uncountWord = "ors";
    const countWord = "sponsor";

    inflection.UNCOUNTABLES.add(uncountWord);
    try {
      expect(uncountWord).toBe(inflection.singularize(uncountWord));
      expect(uncountWord).toBe(inflection.pluralize(uncountWord));
      expect(inflection.pluralize(uncountWord)).toBe(inflection.singularize(uncountWord));

      expect(inflection.singularize(countWord)).toBe("sponsor");
      expect(inflection.pluralize(countWord)).toBe("sponsors");
      expect(inflection.singularize(inflection.pluralize(countWord))).toBe("sponsor");
    } finally {
      inflection.UNCOUNTABLES.delete(uncountWord);
    }
  });

  test.each(SINGULAR_TO_PLURAL)(
    "pluralize singular %s to %s",
    (singular, plural) => {
      expect(inflection.pluralize(singular)).toBe(plural);
      expect(inflection.pluralize(utils.capitalize(singular))).toBe(utils.capitalize(plural));
    }
  );

  test.each(SINGULAR_TO_PLURAL)(
    "singularize plural %s to %s",
    (singular, plural) => {
      expect(inflection.singularize(plural)).toBe(singular);
      expect(inflection.singularize(utils.capitalize(plural))).toBe(utils.capitalize(singular));
    }
  );

  test.each(SINGULAR_TO_PLURAL)(
    "pluralize plural %s to %s",
    (singular, plural) => {
      expect(inflection.pluralize(plural)).toBe(plural);
      expect(inflection.pluralize(utils.capitalize(plural))).toBe(utils.capitalize(plural));
    }
  );

  test.each(MIXTURE_TO_TITLEIZED)(
    "titleize %s to %s",
    (before, titleized) => {
      expect(inflection.titleize(before)).toBe(titleized);
    }
  );

  test.each(CAMEL_TO_UNDERSCORE)(
    "camelize %s to %s",
    (camel, underscore) => {
      expect(inflection.camelize(underscore)).toBe(camel);
    }
  );


  test("test camelize with lower downcases the first letter", () => {
    expect(inflection.camelize("Capital", false)).toBe("capital");
  });

  test("test camelize with underscores", () => {
    expect(inflection.camelize("Camel_Case")).toBe("CamelCase");
  });

  describe("underscore", () => {
    test.each(CAMEL_TO_UNDERSCORE.concat(CAMEL_TO_UNDERSCORE_WITHOUT_REVERSE))(
      "underscore %p should be equal to %p",
      (camel, underscore) => {
        expect(inflection.underscore(camel)).toBe(underscore);
      }
    );
  });

  describe("parameterize", () => {
    test.each(STRING_TO_PARAMETERIZED)(
      "parameterized string of %p should be equal to %p",
      (some_string, parameterized_string) => {
        expect(inflection.parameterize(some_string)).toBe(parameterized_string);
      }
    );

    test.each(STRING_TO_PARAMETERIZED_AND_NORMALIZED)(
      "parameterized and normalized string of %p should be equal to %p",
      (some_string, parameterized_string) => {
        expect(inflection.parameterize(some_string)).toBe(parameterized_string);
      }
    );

    test.each(STRING_TO_PARAMETERIZE_WITH_UNDERSCORE)(
      "parameterized string of %p with '_' separator should be equal to %p",
      (some_string, parameterized_string) => {
        expect(inflection.parameterize(some_string, "_")).toBe(parameterized_string);
      }
    );

    test.each(STRING_TO_PARAMETERIZED)(
      "parameterized string of %p with '__sep__' separator should be equal to %p",
      (some_string, parameterized_string) => {
        let ps = parameterized_string;
        while (ps.includes("-")) {
          ps = ps.replace("-", "__sep__");
        }
        expect(inflection.parameterize(some_string, "__sep__")).toBe(ps);
      }
    );

    test.each(STRING_TO_PARAMETERIZE_WITH_NO_SEPARATOR)(
      "parameterized string of %p with no separator should be equal to %p",
      (some_string, parameterized_string) => {
        expect(inflection.parameterize(some_string, "")).toBe(parameterized_string);
      }
    );
  });

  describe("humanize", () => {
    test.each(UNDERSCORE_TO_HUMAN)(
      "humanized %p should be equal to %p",
      (underscore, human) => {
        expect(inflection.humanize(underscore)).toBe(human);
      }
    );
  });

  describe("ordinal", () => {
    test.each(ORDINAL_NUMBERS)(
      "ordinalized number %p should be equal to %p",
      (number, ordinalized) => {
        expect(number + inflection.ordinal(number)).toBe(ordinalized);
      }
    );
  });

  describe("ordinalize", () => {
    test.each(ORDINAL_NUMBERS)(
      "ordinalized number %p should be equal to %p",
      (number, ordinalized) => {
        expect(inflection.ordinalize(number)).toBe(ordinalized);
      }
    );
  });

  describe("dasherize", () => {
    test.each(UNDERSCORES_TO_DASHES)(
      "dasherized %p should be equal to %p",
      (input, expected) => {
        expect(inflection.dasherize(input)).toBe(expected);
      }
    );
  });

  describe("tableize", () => {
    test.each(STRING_TO_TABLEIZE)(
      "tableized %p should be equal to %p",
      (input, expected) => {
        expect(inflection.tableize(input)).toBe(expected);
      }
    );
  });
});

