"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const index_1 = require("../index");
const ctx = {
    funcs: Object.assign(Object.assign({}, index_1.default.builtinFunctions()), { 
        // You can declare your own functions like this
        $myFunc: (a, b) => {
            return a + b;
        } }),
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
const tests = [
    {
        input: "$myVar + $myFunc(21, $myVar / 2) should be 84! My name is $getattr($other, 'some.variable'), I have a number, it is $myVar. It was $myVar!!!",
        output: "84 should be 84! My name is Dustin, I have a number, it is 42. It was 42!!!",
    },
    {
        input: "Hi $myVar, thanks for the space.",
        output: "Hi 42, thanks for the space.",
    },
    {
        input: "Hi $myVar... thanks for the space.",
        output: "Hi 42... thanks for the space.",
    },
    {
        input: "Hi $myVar!! thanks for the space.",
        output: "Hi 42!! thanks for the space.",
    },
    {
        input: "Hello, $myVar. I have 1 + 1 cats",
        output: "Hello, 42. I have 2 cats",
    },
    {
        input: "Hello, $myVar I have 1 + 1 cats",
        output: "Hello, 42 I have 2 cats",
    },
    {
        input: "Hello, $myVar I have 1 + 1 cats\n\n$myVar.\n\nI have 1 + 1 cats",
        output: "Hello, 42 I have 2 cats\n\n42.\n\nI have 2 cats",
    },
    {
        input: "Hello, $myVar I have 1 + 1 cats\n\n$myVar I have 1 + 1 cats",
        output: "Hello, 42 I have 2 cats\n\n42 I have 2 cats",
    },
    {
        input: "$myVar brings all the $concat($myVar, \"s\") to the $myVar",
        output: "42 brings all the 42s to the 42",
    },
    {
        input: "$myVar brings all the $concat($myVar, \"s\"), to the $myVar",
        output: "42 brings all the 42s, to the 42",
    },
    {
        input: "$myVar brings all the $concat($myVar, \"s\")! to the $myVar",
        output: "42 brings all the 42s! to the 42",
    },
    //   {
    //     input: "Hello, $myVar. I have 1 + 1 $format(\"{0}\", \"cats\").",
    //     output: "Hello, 42. I have 2 cats."
    //   }
];
(0, globals_1.describe)("parse sentence edge cases", () => {
    tests.forEach(({ input, output }) => {
        (0, globals_1.test)(input, () => {
            const result = index_1.default.parseSentence(input, ctx);
            (0, globals_1.expect)(result).toBe(output);
        });
    });
});
