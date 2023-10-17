"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const zip_1 = require("../zip");
// import array from "../index";
(0, globals_1.describe)("zip", () => {
    (0, globals_1.test)("two equal-length arrays, ensuring the zipped output contains corresponding pairs in the correct order.", () => {
        const arr1 = [1, 2, 3];
        const arr2 = ["a", "b", "c"];
        const expected = [
            [1, "a"],
            [2, "b"],
            [3, "c"],
        ];
        const zipped = [...(0, zip_1.zip)(arr1, arr2)];
        (0, globals_1.expect)(JSON.stringify(zipped)).toBe(JSON.stringify(expected));
    });
    (0, globals_1.test)("arrays of different lengths, verifying that the function produces a zipped output using pairs from the shorter array.", () => {
        const arr1 = [1, 2, 3, 4];
        const arr2 = ["a", "b", "c"];
        const expected = [
            [1, "a"],
            [2, "b"],
            [3, "c"],
        ];
        const zipped = [...(0, zip_1.zip)(arr1, arr2)];
        (0, globals_1.expect)(JSON.stringify(zipped)).toBe(JSON.stringify(expected));
    });
    (0, globals_1.test)("three arrays of different lengths, confirming that the zipped output includes pairs from the shortest array, discarding any excess elements from longer arrays.", () => {
        const arr1 = [1, 2, 3];
        const arr2 = ["a", "b", "c", "d"];
        const arr3 = ["x", "y"];
        const expected = [
            [1, "a", "x"],
            [2, "b", "y"],
        ];
        const zipped = [...(0, zip_1.zip)(arr1, arr2, arr3)];
        (0, globals_1.expect)(JSON.stringify(zipped)).toBe(JSON.stringify(expected));
    });
    (0, globals_1.test)("chunky array", () => {
        const arr1 = [1, 2, 3, 4];
        const arr2 = [1, 2, 3];
        const sz = 2;
        const expected1 = [[1, 2], [3, 4]];
        const expected2 = [[1, 2], [3]];
        const out1 = [...(0, zip_1.chunkArray)(arr1, sz)];
        const out2 = [...(0, zip_1.chunkArray)(arr2, sz)];
        (0, globals_1.expect)(JSON.stringify(out1)).toBe(JSON.stringify(expected1));
        (0, globals_1.expect)(JSON.stringify(out2)).toBe(JSON.stringify(expected2));
    });
});
