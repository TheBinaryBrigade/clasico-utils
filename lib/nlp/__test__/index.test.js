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
(0, globals_1.describe)("stemmer", () => {
    (0, globals_1.test)("should handle basic stemming", () => {
        (0, globals_1.expect)(__1.default.stemmer("jumped")).toBe("jump");
        (0, globals_1.expect)(__1.default.stemmer("running")).toBe("run");
        (0, globals_1.expect)(__1.default.stemmer("cats")).toBe("cat");
    });
    (0, globals_1.test)("should handle plural forms", () => {
        (0, globals_1.expect)(__1.default.stemmer("dogs")).toBe("dog");
        (0, globals_1.expect)(__1.default.stemmer("cities")).toBe("city");
        (0, globals_1.expect)(__1.default.stemmer("wolves")).toBe("wolv");
    });
    (0, globals_1.test)("should handle past tense", () => {
        (0, globals_1.expect)(__1.default.stemmer("played")).toBe("play");
        (0, globals_1.expect)(__1.default.stemmer("hoped")).toBe("hope");
        (0, globals_1.expect)(__1.default.stemmer("studied")).toBe("studi");
    });
    (0, globals_1.test)("should handle adjectives and adverbs", () => {
        (0, globals_1.expect)(__1.default.stemmer("beautifully")).toBe("beauti");
        (0, globals_1.expect)(__1.default.stemmer("quickly")).toBe("quick");
        (0, globals_1.expect)(__1.default.stemmer("calmness")).toBe("calm");
    });
    (0, globals_1.test)("should handle specific cases", () => {
        (0, globals_1.expect)(__1.default.stemmer("relational")).toBe("relat");
        (0, globals_1.expect)(__1.default.stemmer("jumping")).toBe("jump");
        (0, globals_1.expect)(__1.default.stemmer("skies")).toBe("sky");
    });
    (0, globals_1.test)("should not stem already stemmed words", () => {
        (0, globals_1.expect)(__1.default.stemmer("running")).toBe("run");
        (0, globals_1.expect)(__1.default.stemmer("dogs")).toBe("dog");
        (0, globals_1.expect)(__1.default.stemmer("beautiful")).toBe("beauti");
    });
    (0, globals_1.test)("should not modify words without applicable stemming rules", () => {
        (0, globals_1.expect)(__1.default.stemmer("open")).toBe("open");
        (0, globals_1.expect)(__1.default.stemmer("programming")).toBe("program");
        (0, globals_1.expect)(__1.default.stemmer("awesome")).toBe("awesom");
    });
});
