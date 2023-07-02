import {describe, expect, test} from "@jest/globals";
import {
  findAllCommonPrefixes,
  removeDuplicates
} from "../remove.duplicates";

describe("removeDuplicates", () => {
  test("simple case with key", () => {
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

    const output = removeDuplicates(input, ([_num, char]) => char);
    expect(JSON.stringify(output)).toBe(JSON.stringify(expected));
  });

  test("simple case no key", () => {
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

    const output = removeDuplicates(input);
    expect(JSON.stringify(output)).toBe(JSON.stringify(expected));
  });
});

describe("findAllCommonPrefixes", () => {

  test("common case", () => {
    const input = ["apple", "apricot", "application", "door", "door handle", "orange", "orange pie"];
    const expected = ["ap", "door", "orange"];
    const output = findAllCommonPrefixes(input);
    expected.sort();
    output.sort();
    expect(JSON.stringify(output)).toBe(JSON.stringify(expected));
  });

  test("empty", () => {
    const input: string[] = [];
    const expected: string[] = [];
    const output = findAllCommonPrefixes(input);
    expected.sort();
    output.sort();
    expect(JSON.stringify(output)).toBe(JSON.stringify(expected));
  });

  test("one element", () => {
    const input = ["apple"];
    const expected = ["apple"];
    const output = findAllCommonPrefixes(input);
    expected.sort();
    output.sort();
    expect(JSON.stringify(output)).toBe(JSON.stringify(expected));
  });

  test("two duplicate elements", () => {
    const input = ["apple", "apple"];
    const expected = ["apple"];
    const output = findAllCommonPrefixes(input);
    expected.sort();
    output.sort();
    expect(JSON.stringify(output)).toBe(JSON.stringify(expected));
  });

  test("two unique elements", () => {
    const input = ["some/body", "once/told/me"];
    const expected: string[] = [];
    const output = findAllCommonPrefixes(input);
    expected.sort();
    output.sort();
    expect(JSON.stringify(output)).toBe(JSON.stringify(expected));
  });

  test("single chars", () => {
    const input = ["a", "b", "c", "a", "b", "c", "aa", "bb", "cc"];
    const expected = ["a", "b", "c"];
    const output = findAllCommonPrefixes(input);
    expected.sort();
    output.sort();
    expect(JSON.stringify(output)).toBe(JSON.stringify(expected));
  });
});
