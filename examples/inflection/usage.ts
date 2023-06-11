/* tslint:disable:no-console */

import clasico from "../../src/index";

const assert = (title: string, output: unknown, expected: unknown) => {
  if (expected !== output) {
    console.error(title);
    console.error("Expected output did not match result");
    console.error("\tOutput: ", output);
    console.error("\tExpected: ", expected);
    process.exit(1);
  }
};

const camelize = clasico.inflection.camelize("some_variable", false);
assert("camelize", camelize, "someVariable");

const pascalize = clasico.inflection.camelize("some_variable");
assert("camelize", pascalize, "SomeVariable");

const dasherize = clasico.inflection.dasherize("some_string");
assert("dasherize", dasherize, "some-string");

const humanize = clasico.inflection.humanize("employee_salary");
assert("humanize", humanize, "Employee salary");

const ordinal = clasico.inflection.ordinal(1);
assert("ordinal", ordinal, "st");

const ordinalize = clasico.inflection.ordinalize(1);
assert("ordinalize", ordinalize, "1st");

const parameterize1 = clasico.inflection.parameterize("some param");
assert("parameterize1", parameterize1, "some-param");

const parameterize2 = clasico.inflection.parameterize("some param", "+");
assert("parameterize2", parameterize2, "some+param");

const pluralize = clasico.inflection.pluralize("example");
assert("pluralize", pluralize, "examples");

const singularize = clasico.inflection.singularize("examples");
assert("singularize", singularize, "example");

const tableize = clasico.inflection.tableize("_RecipeIngredient");
assert("tableize", tableize, "_recipe_ingredients");

const titleize = clasico.inflection.titleize("some title");
assert("titleize", titleize, "Some Title");

const transliterate = clasico.inflection.transliterate("Japanese: 日本語");
assert("transliterate", transliterate, "Japanese:");

const underscore = clasico.inflection.underscore("SomeVariable");
assert("underscore", underscore, "some_variable");
