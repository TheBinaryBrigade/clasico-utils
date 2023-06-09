<!-- THIS FILE IS @autogenerated DO NOT EDIT -->

# Common Utility Functions

## Install

### With NPM
```console
npm install --save clasico
```

### With YARN
```console
yarn add clasico
```

### With Static files

Static files for the web and node are provided in the `dist` folder

#### Using the Web Static File

```html
<script src="./clasico-utils.js"></script>

<script>
const clasico = Clasico.default;
const parser = new clasico.parser.SentenceParser({
  includeBuiltIns: true,
});

// See Permissive Sentence Parser Usage for rest 

</script>
```

## APIs-

### Zip

#### Usage

```ts

/* tslint:disable:no-console */

import clasico from "clasico";

const arr1 = [1, 2, 3, 4];
const arr2 = ["a", "b", "c"];

const expectedOutput = [
  [1, "a"],
  [2, "b"],
  [3, "c"],
];

let idx = 0;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
for (const [output1, output2] of clasico.array.zip(arr1, arr2)) {   // USAGE 1: Correct
  const [expected1, expected2] = expectedOutput[idx];
  if (output1 !== expected1 || output2 !== expected2) {
    console.error("Failed to zip arrays", {idx});
    console.error("Got", [output1, output2]);
    console.error("Expected", [expected1, expected2]);
    process.exit(1);
  }

  ++idx;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const zipped: [number, string][] = [...clasico.array.zip(arr1, arr2)];   // USAGE 2: Incorrect (but if needed)

if (JSON.stringify(zipped) !== JSON.stringify(expectedOutput)) {
  console.error("Failed to zip arrays");
  console.error("Got", zipped);
  console.error("Expected", expectedOutput);
  process.exit(3);
}


```

### NLP

#### Remove StopWords

```ts

/* tslint:disable:no-console */

import clasico from "clasico";

const input = "Don't forget to bring your ID, and don't be late!";
const expected = "forget bring ID, late!";

const output = clasico.nlp.removeStopWords(input);
if (output !== expected) {
  console.error("Failed to remove stopwords", {
    output,
    expected
  });
  process.exit(1);
}


```

#### Stemmer

```ts

/* tslint:disable:no-console */

import clasico from "clasico";

const examples = [
  {input: "calmness", expected: "calm"},
  {input: "skies", expected: "sky"},
];

examples.forEach(({input, expected}) => {
  const output = clasico.nlp.stemmer(input);
  if (output !== expected) {
    console.error("Failed to stem word", {
      output,
      expected
    });
    process.exit(1);
  }
});


```

### Inflection Port

#### Usage

```ts

/* tslint:disable:no-console */

import clasico from "clasico";

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


```

### Template

#### Usage

Builtin Functions: [Documentation](https://github.com/TheBinaryBrigade/clasico-utils/blob/main/src/template/README.md#table-of-contens)

Try it out: [Playground](https://thebinarybrigade.github.io/clasico-utils/)

```ts

/* tslint:disable:no-console */

import clasico from "clasico";

const parser = new clasico.template.SentenceParser({
  includeBuiltIns: true,
});

// Add functions
parser.addFunction("myFunc", (a: number, b: number) => {
  return a + b;
});

// Add variables
parser.addVar("myVar", 42);
parser.addVar("you", "someone");
parser.addVar("other", {"some": {"variable": "Isla"}});

// Example Input
const input = `
$myVar + $myFunc(21, $myVar / 2) should be 84!

My name is $getattr($other, 'some.variable').

I have a number, it is $myVar.

I don't have $yuo!!!

I DON'T HAVE $foo!!!
`;
console.log("Input:", input);

// Example Output
const output = parser.parse(input);
console.log("Output:", output);
// Output: {
//   result: '\n' +
//     '84 should be 84!\n' +
//     '\n' +
//     'My name is Isla.\n' +
//     '\n' +
//     'I have a number, it is 42.\n' +
//     '\n' +
//     "I don't have $yuo!!!\n" +
//     '\n' +
//     "I DON'T HAVE $foo!!!\n",
//   logs: [
//     {
//       lineNumber: 8,
//       level: 'WARN',
//       timestamp: 2023-04-30T06:07:04.648Z,
//       message: "Unknown variable '$yuo'. The most similar variable is $you"
//     },
//     {
//       lineNumber: 10,
//       level: 'WARN',
//       timestamp: 2023-04-30T06:07:04.649Z,
//       message: "Unknown variable '$foo'."
//     }
//   ]
// }

const expected = `
84 should be 84!

My name is Isla.

I have a number, it is 42.

I don't have $yuo!!!

I DON'T HAVE $foo!!!
`;

if (expected !== output.result) {
  console.log("Expected did not match output");
  console.log(JSON.stringify(expected), "\n", JSON.stringify(output.result));
  process.exit(1);
}


```

<!-- ### Diff Utils

#### Usage

{{DIFF_USAGE_EXAMPLE}}

### Fuzzy Utils

#### Usage
{{FUZZY_USAGE_EXAMPLE}}

### Bisect Array Class

#### Usage
{{BISECT_ARRAY_USAGE_EXAMPLE}}

### Misc Utils

#### Usage

{{MISC_USAGE_EXAMPLE}} -->
