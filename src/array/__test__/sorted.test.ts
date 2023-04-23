import { describe, expect, test } from "@jest/globals";
import { BisectArray, ReverseCompareArray, ReverseNumberArray, ReverseSortedArray, ReverseStringArray, SortedArray, SortedCompareArray, SortedNumberArray, SortedStringArray } from "../sorted";

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


describe("Array", () => {
  const _test = <T, W extends BisectArray<T>>(arr: W, expected: T[]) => {
    const isReversed = arr.isReversed();
    expected = [...expected].sort();
    expected = isReversed ? expected.reverse() : expected;
    expect(JSON.stringify([...arr])).toBe(JSON.stringify([...expected]));
    arr.pop();
    expect(JSON.stringify([...arr])).toBe(JSON.stringify(isReversed ? expected.slice(0, expected.length - 1) : expected.slice(1)));
  };

  TESTS.forEach((opts) => {
    [SortedArray, ReverseSortedArray].forEach((ArrayConstructor) => {
      describe(`${ArrayConstructor}`, () => {
        test(JSON.stringify({ args: opts.args, push: opts.push }), () => {
          const arr = new ArrayConstructor((a) => a, ...opts.args);
          arr.push(...opts.push);
          _test(arr, [...opts.output]);
        });
      });
    });

    [SortedNumberArray, ReverseNumberArray].forEach((ArrayConstructor) => {
      describe(`${ArrayConstructor}`, () => {
        test(JSON.stringify({ args: opts.args, push: opts.push }), () => {
          const arr = new ArrayConstructor(...opts.args);
          arr.push(...opts.push);
          _test(arr, [...opts.output]);
        });
      });
    });

  });

  TESTS2.forEach((opts) => {
    [SortedStringArray, ReverseStringArray].forEach((ArrayConstructor) => {
      describe(`${ArrayConstructor}`, () => {
        test(JSON.stringify({ args: opts.args, push: opts.push }), () => {
          const arr = new ArrayConstructor(...opts.args);
          arr.push(...opts.push);
          _test(arr, [...opts.output]);
        });
      });
    });

    [SortedCompareArray, ReverseCompareArray].forEach((ArrayConstructor) => {
      describe(`${ArrayConstructor}`, () => {
        test(JSON.stringify({ args: opts.args, push: opts.push }), () => {
          const arr = new ArrayConstructor((a, b) => a.localeCompare(b), ...opts.args);
          arr.push(...opts.push);
          _test(arr, [...opts.output]);
        });
      });
    });
  });
});