"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const sorted_1 = require("../sorted");
const TESTS = [
    {
        args: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5],
        push: [],
        output: [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9],
    },
    {
        args: [1, 3, 5, 7, 9],
        push: [0, 2, 4, 6, 8],
        output: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
        args: [2, 4, 6, 8],
        push: [5, 1, 7, 3, 9],
        output: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
];
const TESTS2 = [
    {
        args: ["a", "c", "b"],
        push: ["d", "e", "f"],
        output: ["a", "b", "c", "d", "e", "f"],
    },
    {
        args: ["a", "z", "b"],
        push: ["d", "e", "z"],
        output: "a,b,d,e,z,z".split(","),
    },
];
(0, globals_1.describe)("Array", () => {
    const _test = (arr, expected) => {
        const isReversed = arr.isReversed();
        expected = [...expected].sort();
        expected = isReversed ? expected.reverse() : expected;
        (0, globals_1.expect)(JSON.stringify([...arr])).toBe(JSON.stringify([...expected]));
        arr.pop();
        (0, globals_1.expect)(JSON.stringify([...arr])).toBe(JSON.stringify(isReversed ? expected.slice(0, expected.length - 1) : expected.slice(1)));
    };
    TESTS.forEach((opts) => {
        [sorted_1.SortedArray, sorted_1.ReverseSortedArray].forEach((ArrayConstructor) => {
            (0, globals_1.describe)(`${ArrayConstructor}`, () => {
                (0, globals_1.test)(JSON.stringify({ args: opts.args, push: opts.push }), () => {
                    const arr = new ArrayConstructor((a) => a, ...opts.args);
                    arr.push(...opts.push);
                    _test(arr, [...opts.output]);
                });
            });
        });
        [sorted_1.SortedNumberArray, sorted_1.ReverseNumberArray].forEach((ArrayConstructor) => {
            (0, globals_1.describe)(`${ArrayConstructor}`, () => {
                (0, globals_1.test)(JSON.stringify({ args: opts.args, push: opts.push }), () => {
                    const arr = new ArrayConstructor(...opts.args);
                    arr.push(...opts.push);
                    _test(arr, [...opts.output]);
                });
            });
        });
    });
    TESTS2.forEach((opts) => {
        [sorted_1.SortedStringArray, sorted_1.ReverseStringArray].forEach((ArrayConstructor) => {
            (0, globals_1.describe)(`${ArrayConstructor}`, () => {
                (0, globals_1.test)(JSON.stringify({ args: opts.args, push: opts.push }), () => {
                    const arr = new ArrayConstructor(...opts.args);
                    arr.push(...opts.push);
                    _test(arr, [...opts.output]);
                });
            });
        });
        [sorted_1.SortedCompareArray, sorted_1.ReverseCompareArray].forEach((ArrayConstructor) => {
            (0, globals_1.describe)(`${ArrayConstructor}`, () => {
                (0, globals_1.test)(JSON.stringify({ args: opts.args, push: opts.push }), () => {
                    const arr = new ArrayConstructor((a, b) => a.localeCompare(b), ...opts.args);
                    arr.push(...opts.push);
                    _test(arr, [...opts.output]);
                });
            });
        });
    });
});
