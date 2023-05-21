import clasico from "../../src/index";

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
parser.addVar("other", { "some": { "variable": "Isla" } });

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