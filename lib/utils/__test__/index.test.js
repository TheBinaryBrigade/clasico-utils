"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const __1 = require("..");
(0, globals_1.describe)("utils", () => {
    (0, globals_1.describe)("hashCode", () => {
        (0, globals_1.test)("should return a number", () => {
            (0, globals_1.expect)(typeof __1.default.hashCode("hello")).toBe("number");
        });
        (0, globals_1.test)("should return the same hash code for the same input", () => {
            const str = "hello";
            const hash1 = __1.default.hashCode(str);
            const hash2 = __1.default.hashCode(str);
            (0, globals_1.expect)(hash1).toBe(hash2);
        });
        (0, globals_1.test)("should return different hash codes for different inputs", () => {
            const hash1 = __1.default.hashCode("hello");
            const hash2 = __1.default.hashCode("world");
            (0, globals_1.expect)(hash1).not.toBe(hash2);
        });
        (0, globals_1.test)("should return different hash codes for different inputs", () => {
            const hash1 = __1.default.hashCode(new Set([1, 2, 3]));
            const hash2 = __1.default.hashCode({});
            (0, globals_1.expect)(hash1).not.toBe(hash2);
        });
        (0, globals_1.test)("should handle empty input", () => {
            (0, globals_1.expect)(__1.default.hashCode("")).toBe(0);
        });
        (0, globals_1.test)("should handle special characters", () => {
            (0, globals_1.expect)(__1.default.hashCode("$%^&*()")).toBe(-1262342590);
        });
        (0, globals_1.test)("circular reference", () => {
            const example = {
                a: 1,
                b: {
                    c: 2,
                    d: null
                }
            };
            example.b.d = example;
            const result = __1.default.hashCode(example);
            (0, globals_1.expect)(typeof result).toBe("number");
            (0, globals_1.expect)(result).toBeTruthy();
        });
        (0, globals_1.test)("should handle many types", () => {
            const tests = [
                [{}, { typeOf: "number" }],
                [[1, 2, 3], { typeOf: "number" }],
                [new Set([1, 2, 3]), { typeOf: "number" }],
                [123, { typeOf: "number" }],
                [false, { typeOf: "number" }],
                // when passing false to coerce input to string
                [{}, { value: null, args: [false] }],
                [[1, 2, 3], { value: null, args: [false] }],
                [new Set([1, 2, 3]), { value: null, args: [false] }],
                [123, { value: null, args: [false] }],
                [false, { value: null, args: [false] }],
            ];
            tests.forEach(([input, { value, typeOf, args }]) => {
                if (!args) {
                    args = [];
                }
                (0, globals_1.expect)(Array.isArray(args)).toBeTruthy();
                let atLeastOneExpect = false;
                const calc = __1.default.hashCode(input, ...args);
                if (value !== undefined) {
                    (0, globals_1.expect)(calc).toBe(value);
                    atLeastOneExpect = true;
                }
                if (typeOf !== undefined) {
                    (0, globals_1.expect)(typeof calc).toBe(typeOf);
                    atLeastOneExpect = true;
                }
                // At least one expect was ran
                (0, globals_1.expect)(atLeastOneExpect).toBe(true);
            });
        });
    });
    (0, globals_1.describe)("capitalize", () => {
        (0, globals_1.test)("should capitalize the first letter of a string", () => {
            (0, globals_1.expect)(__1.default.capitalize("hello")).toBe("Hello");
        });
        (0, globals_1.test)("should not change the case of other letters in the string", () => {
            (0, globals_1.expect)(__1.default.capitalize("hELlo")).not.toBe("HEllo");
        });
        (0, globals_1.test)("should return an empty string if the input is an empty string", () => {
            (0, globals_1.expect)(__1.default.capitalize("")).toBe("");
        });
        (0, globals_1.test)("should return the input if the first letter is already capitalized", () => {
            (0, globals_1.expect)(__1.default.capitalize("Hello")).toBe("Hello");
        });
        (0, globals_1.test)("should handle input that is not a string", () => {
            (0, globals_1.expect)(__1.default.capitalize(123)).toBe("");
        });
    });
});
