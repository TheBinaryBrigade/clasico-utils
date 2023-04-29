import clasico from "../../src/index";

const parser = new clasico.parser.SentenceParser({
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
// Input: $myVar + $myFunc(21, $myVar / 2) should be 84! My name is $getattr($other, 'some.variable'), I have a number, it is $myVar. I don't have $yous!!

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
//   warnings: [
//     {
//       lineNumber: 8,
//       message: `Unknown variable '$yuo' maybe your meant one of these variables ["$you"]`
//     },
//     { lineNumber: 10, message: "Unknown variable '$foo'" }
//   ],
//   errors: []
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