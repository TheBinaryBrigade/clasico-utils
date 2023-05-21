"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const index_1 = require("../index");
const ctx = {
    funcs: {
        // You can declare your own functions like this
        $myFunc: (a, b) => {
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
    {
        input: "Hello, $myVar. I have 1 + 1 $format(\"{0}\", \"cats\").",
        output: "Hello, 42. I have 2 cats."
    },
    {
        input: "$myVar $myVar $myVar $myVar $myVar",
        output: "42 42 42 42 42"
    },
    {
        input: "$myVar 42 $myVar 42 $myVar",
        output: "42 42 42 42 42"
    },
    {
        input: "$myVar was and $myVar is",
        output: "42 was and 42 is"
    },
    {
        input: "$myVar $format(\"{0}\", $myVar) $myVar $format(\"{0}\", $myVar) $myVar",
        output: "42 42 42 42 42"
    },
    {
        input: "This is just some normal text. Where some $format(\"{0}\", \"people\") use parentheses (like this) and this (e.g., some example). Also like a number (you guessed it; it is $myVar)...",
        output: "This is just some normal text. Where some people use parentheses (like this) and this (e.g., some example). Also like a number (you guessed it; it is 42)..."
    },
    {
        input: "Today was a productive day, despite the fact that I woke up late 😴. I managed to finish all of my work before the deadline, thanks to my determination and focus 👀. However, I did have to deal with a few distractions along the way, such as my noisy neighbor 🙉 and a few technical glitches 🖥️. Nevertheless, I persevered and completed everything on time! Now, I'm looking forward to relaxing with a good book 📚; I think I'll make myself a cup of tea 🍵 and curl up on the couch for a while 🛋️.",
        output: "Today was a productive day, despite the fact that I woke up late 😴. I managed to finish all of my work before the deadline, thanks to my determination and focus 👀. However, I did have to deal with a few distractions along the way, such as my noisy neighbor 🙉 and a few technical glitches 🖥️. Nevertheless, I persevered and completed everything on time! Now, I'm looking forward to relaxing with a good book 📚; I think I'll make myself a cup of tea 🍵 and curl up on the couch for a while 🛋️."
    },
    {
        input: "$myVar $myVar(1, 2, 3) (I got a facination)",
        output: "42 $myVar(1, 2, 3) (I got a facination)"
    },
];
(0, globals_1.describe)("parse sentence edge cases", () => {
    tests.forEach(({ input, output }) => {
        (0, globals_1.test)(input, () => {
            const result = new index_1.default.TemplateParser({
                includeBuiltIns: true,
            }, ctx);
            (0, globals_1.expect)(result.parse(input).result).toBe(output);
        });
    });
});
const LVAL_TEST = [
    {
        input: JSON.stringify({ hello: 42 }),
        output: { hello: 42 },
        typeOf: "object",
    },
    {
        input: "42 / 2",
        output: 21,
        typeOf: "number",
    },
    {
        input: "$all(true, false, true)",
        output: false,
        typeOf: "boolean",
    },
    {
        input: "true",
        output: true,
        typeOf: "boolean",
    },
    {
        input: "42.2",
        output: 42.2,
        typeOf: "number",
    },
    {
        input: "$now()",
        typeOf: "object",
    },
    {
        input: "[1, 2, 3, 4]",
        output: [1, 2, 3, 4],
        typeOf: "object",
    },
];
const ctx2 = {
    funcs: Object.assign({}, new index_1.default.TemplateParser().builtinFunctions()),
    vars: {},
};
(0, globals_1.describe)("lval", () => {
    LVAL_TEST.forEach(({ input, output, typeOf }) => {
        (0, globals_1.test)(input, () => {
            const result = index_1.default.lval(input, ctx2).result;
            if (output !== undefined) {
                if (typeof result !== "object") {
                    (0, globals_1.expect)(result).toBe(output);
                }
                else {
                    (0, globals_1.expect)(JSON.stringify(result)).toBe(JSON.stringify(output));
                }
            }
            (0, globals_1.expect)(typeof result).toBe(typeOf);
        });
    });
});
