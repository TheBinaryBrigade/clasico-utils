"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const remove_duplicates_1 = require("../remove.duplicates");
(0, globals_1.describe)("removeDuplicates", () => {
    (0, globals_1.test)("simple case with key", () => {
        const input = [
            [1, "a"],
            [2, "b"],
            [3, "c"],
            [3, "c"],
            [42, "c"],
            [3, "c"],
        ];
        const expected = [
            [1, "a"],
            [2, "b"],
            [3, "c"],
        ];
        const output = (0, remove_duplicates_1.removeDuplicates)(input, ([_num, char]) => char);
        (0, globals_1.expect)(JSON.stringify(output)).toBe(JSON.stringify(expected));
    });
    (0, globals_1.test)("simple case no key", () => {
        const input = [
            "a",
            "b",
            "c",
            "a",
            "b",
        ];
        const expected = [
            "a",
            "b",
            "c",
        ];
        const output = (0, remove_duplicates_1.removeDuplicates)(input);
        (0, globals_1.expect)(JSON.stringify(output)).toBe(JSON.stringify(expected));
    });
});
(0, globals_1.describe)("findAllCommonPrefixes", () => {
    (0, globals_1.test)("common case", () => {
        const input = ["apple", "apricot", "application", "door", "door handle", "orange", "orange pie"];
        const expected = ["ap", "door", "orange"];
        const output = (0, remove_duplicates_1.findAllCommonPrefixes)(input);
        expected.sort();
        output.sort();
        (0, globals_1.expect)(JSON.stringify(output)).toBe(JSON.stringify(expected));
    });
    (0, globals_1.test)("empty", () => {
        const input = [];
        const expected = [];
        const output = (0, remove_duplicates_1.findAllCommonPrefixes)(input);
        expected.sort();
        output.sort();
        (0, globals_1.expect)(JSON.stringify(output)).toBe(JSON.stringify(expected));
    });
    (0, globals_1.test)("one element", () => {
        const input = ["apple"];
        const expected = ["apple"];
        const output = (0, remove_duplicates_1.findAllCommonPrefixes)(input);
        expected.sort();
        output.sort();
        (0, globals_1.expect)(JSON.stringify(output)).toBe(JSON.stringify(expected));
    });
    (0, globals_1.test)("two duplicate elements", () => {
        const input = ["apple", "apple"];
        const expected = ["apple"];
        const output = (0, remove_duplicates_1.findAllCommonPrefixes)(input);
        expected.sort();
        output.sort();
        (0, globals_1.expect)(JSON.stringify(output)).toBe(JSON.stringify(expected));
    });
    (0, globals_1.test)("single chars", () => {
        const input = ["a", "b", "c", "a", "b", "c", "aa", "bb", "cc"];
        const expected = ["a", "b", "c"];
        const output = (0, remove_duplicates_1.findAllCommonPrefixes)(input);
        expected.sort();
        output.sort();
        (0, globals_1.expect)(JSON.stringify(output)).toBe(JSON.stringify(expected));
    });
});
