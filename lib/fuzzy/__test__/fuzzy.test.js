"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const __1 = require("..");
(0, globals_1.describe)("fuzzy", () => {
    (0, globals_1.test)("similarity", () => {
        (0, globals_1.expect)(__1.default.similarity("Dog", "Dog")).toBe(1);
        (0, globals_1.expect)(__1.default.similarity("WolfmanJackIsDaBomb", "WolfmanJackIsDaBest")).toBe(0.8);
        (0, globals_1.expect)(__1.default.similarity("DateCreated", "CreatedDate")).toBe(0.5833333333333334);
        (0, globals_1.expect)(__1.default.similarity("a", "b")).toBe(0);
        (0, globals_1.expect)(__1.default.similarity("CreateDt", "DateCreted")).toBe(0.45454545454545453);
        (0, globals_1.expect)(__1.default.similarity("Phyllis", "PyllisX")).toBe(0.625);
        (0, globals_1.expect)(__1.default.similarity("Phyllis", "Pylhlis")).toBe(0.625);
        (0, globals_1.expect)(__1.default.similarity("cat", "cut")).toBe(0.5);
        (0, globals_1.expect)(__1.default.similarity("cat", "Cnut")).toBe(0.4);
        (0, globals_1.expect)(__1.default.similarity("cc", "Cccccccccccccccccccccccccccccccc")).toBe(0.09090909090909091);
        (0, globals_1.expect)(__1.default.similarity("ab", "ababababababababababababababab")).toBe(0.0967741935483871);
        (0, globals_1.expect)(__1.default.similarity("a whole long thing", "a")).toBe(0.10526315789473684);
        (0, globals_1.expect)(__1.default.similarity("a", "a whole long thing")).toBe(0.10526315789473684);
        (0, globals_1.expect)(__1.default.similarity("", "a non empty string")).toBe(0);
        (0, globals_1.expect)(__1.default.similarity(null, "a non empty string")).toBe(0);
    });
    (0, globals_1.test)("topSimilar", () => {
        const _expect = (value, key, topK, input, output) => {
            const result = __1.default.topSimilar(value, input, key, topK);
            (0, globals_1.expect)(result.length).toBe(topK >= 0 ? topK : 5);
            (0, globals_1.expect)(JSON.stringify(result.map(key))).toBe(JSON.stringify(output.map(key)));
        };
        const searchA = {
            foo: {
                bar: "hello",
            }
        };
        const inputA = [
            { foo: { bar: "konnichiwa" } },
            { foo: { bar: "hola" } },
            { foo: { bar: "bye" } },
            { foo: { bar: "hrllo" } },
            { foo: { bar: "saludos" } },
            { foo: { bar: "hallo" } },
        ];
        const outputA = [
            { foo: { bar: "hrllo" } },
            { foo: { bar: "hallo" } },
            { foo: { bar: "hola" } },
        ];
        const outputB = [
            { foo: { bar: "hrllo" } },
            { foo: { bar: "hallo" } },
            { foo: { bar: "hola" } },
            { foo: { bar: "konnichiwa" } },
            { foo: { bar: "bye" } },
        ];
        _expect(
        /* search for */ searchA, 
        /* key */ (a) => a.foo.bar, 
        /* return top */ outputA.length, 
        /* search in */ inputA, 
        /* expect */ outputA);
        _expect(
        /* search for */ searchA, 
        /* key */ (a) => a.foo.bar, 
        /* return top */ -3, 
        /* search in */ inputA, 
        /* expect */ outputB.splice(0, 5));
    });
});
