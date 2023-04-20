import parser, { Context } from "../src/eval";
const ctx: Context = {
  funcs: {
    // Note: builtins need to be added explicitly 
    ...parser.builtinFunctions(),
    // You can declare your own functions like this
    $myFunc: (a: number, b: number) => {
      return a + b;
    },
  },
  // You can declare your variables here
  vars: {
    $myVar: 42,
    // for accessing deep variables use the builtin $getattr($other, 'some.variable')
    $other: {
      some: {
        variable: "Dustin"
      }
    },
    $void: ""
  }
};

const text = "$myVar + $myFunc(21, $myVar / 2) should be 84! My name is $getattr($other, 'some.variable'), I have a number, it is $myVar.";
const result = parser.parseSentence(
  text,
  ctx,
);

console.log("Input:", text);
console.log("Output:", result);

const ex = {
  input: {
    text: "$if($all($isLoggedIn, $bool($getattr($client, 'user.name'))), $format($welcomeMessage, $getattr($client, 'user.name')), $format($welcomeMessage2, ))",
    context: {
      funcs: parser.builtinFunctions(),
      vars: {
        $isLoggedIn: true,
        $welcomeMessage: "Hi {0}, welcome to the app!",
        $welcomeMessage2: "Hi, welcome to the app!",
        $client: {
          user: {
            name: "James",
          },
        },
      }
    }
  },
  output: "Hi James, welcome to the app!",
};

const result2 = parser.parseSentence(
  ex.input.text,
  ex.input.context,
);

console.log("Input:", ex.input.text);
console.log("Output:", result2);

const result3 = parser.parseSentence(
  "$endsWith($x, ', b')",
  {
    funcs: parser.builtinFunctions(),
    vars: {
      $x: "Hello, b"
    }
  },
);

console.log("Input:", "$endsWith($x, ', b')");
console.log("Output:", result3);

const result4 = parser.parseSentence(
  "$getattr($x, 'some', \"deep\", $attrobject)",
  {
    funcs: parser.builtinFunctions(),
    vars: {
      "$x": {
        "some": {
          "deep": {
            "object": 42
          }
        }
      },
      "$attrobject": "object"
    }
  },
);

console.log("Input:", "$getattr($x, 'some', \"deep\", $attrobject)");
console.log("Output:", result4);