import clasico from "../src/index";


const parser = new clasico.parser.SentenceParser({
  includeBuiltIns: true,
});

// A `$` will be added to the 
// Function name if none is provided
parser.addFunction("myFunc", (a: number, b: number) => {
  return a + b;
});

parser.addVar("myVar", 42);
parser.addVar("other", { "some": { "variable": "Isla" } });


const input = "$myVar + $myFunc(21, $myVar / 2) should be 84! My name is $getattr($other, 'some.variable'), I have a number, it is $myVar.";
console.log("Input:", input);
// Input: $myVar + $myFunc(21, $myVar / 2) should be 84! My name is $getattr($other, 'some.variable'), I have a number, it is $myVar.

const output = parser.parse(input);
console.log("Output:", output);
// Output: 84 should be 84! My name is Isla, I have a number, it is 42.

console.assert(
  output == "84 should be 84! My name is Isla, I have a number, it is 42.",
  "Evaluation did not match to expected output",
);
