"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const __1 = require("..");
(0, globals_1.describe)("remove stop words", () => {
    (0, globals_1.test)("", () => {
        const input = "I am a person, I swear!";
        const expected = "person, swear!";
        (0, globals_1.expect)(__1.default.removeStopWords(input)).toBe(expected);
    });
    (0, globals_1.test)("Empty input string", () => {
        const input = "";
        const expected = "";
        (0, globals_1.expect)(__1.default.removeStopWords(input)).toBe(expected);
    });
    (0, globals_1.test)("No stopwords in the input string", () => {
        const input = "This is a test sentence";
        const expected = "test sentence";
        (0, globals_1.expect)(__1.default.removeStopWords(input)).toBe(expected);
    });
    (0, globals_1.test)("Input string with only stopwords", () => {
        const input = "I am the and to of";
        const expected = "";
        (0, globals_1.expect)(__1.default.removeStopWords(input)).toBe(expected);
    });
    (0, globals_1.test)("Input string with mixed stopwords and non-stopwords", () => {
        const input = "I wasn't going to say anything";
        const expected = "going say anything";
        (0, globals_1.expect)(__1.default.removeStopWords(input)).toBe(expected);
    });
    (0, globals_1.test)("Input string with stopwords and punctuation", () => {
        const input = "Don't forget to bring your ID, and don't be late!";
        const expected = "forget bring ID, late!";
        (0, globals_1.expect)(__1.default.removeStopWords(input)).toBe(expected);
    });
});
