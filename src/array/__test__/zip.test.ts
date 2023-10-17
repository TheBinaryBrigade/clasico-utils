import {describe, expect, test} from "@jest/globals";
import {zip, chunkArray} from "../zip";
// import array from "../index";

describe("zip", () => {
  test("two equal-length arrays, ensuring the zipped output contains corresponding pairs in the correct order.", () => {
    const arr1 = [1, 2, 3];
    const arr2 = ["a", "b", "c"];

    const expected = [
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ];

    const zipped = [...zip(arr1, arr2)];
    expect(JSON.stringify(zipped)).toBe(JSON.stringify(expected));
  });

  test("arrays of different lengths, verifying that the function produces a zipped output using pairs from the shorter array.", () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = ["a", "b", "c"];

    const expected = [
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ];

    const zipped = [...zip(arr1, arr2)];
    expect(JSON.stringify(zipped)).toBe(JSON.stringify(expected));
  });

  test("three arrays of different lengths, confirming that the zipped output includes pairs from the shortest array, discarding any excess elements from longer arrays.", () => {
    const arr1 = [1, 2, 3];
    const arr2 = ["a", "b", "c", "d"];
    const arr3 = ["x", "y"];

    const expected = [
      [1, "a", "x"],
      [2, "b", "y"],
    ];

    const zipped = [...zip(arr1, arr2, arr3)];
    expect(JSON.stringify(zipped)).toBe(JSON.stringify(expected));
  });

  test("chunky array", () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [1, 2, 3];
    const sz = 2;

    const expected1 = [[1, 2], [3, 4]];
    const expected2 = [[1, 2], [3]];

    const out1 = [...chunkArray(arr1, sz)];
    const out2 = [...chunkArray(arr2, sz)];

    expect(JSON.stringify(out1)).toBe(JSON.stringify(expected1));
    expect(JSON.stringify(out2)).toBe(JSON.stringify(expected2));
  });
});
