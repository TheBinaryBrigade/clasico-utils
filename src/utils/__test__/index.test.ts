import { describe, test, expect } from "@jest/globals";

import utils from "..";
import { TypeOf } from "../../@types";

describe("utils", () => {
  describe("hashCode", () => {
    test("should return a number", () => {
      expect(typeof utils.hashCode("hello")).toBe("number");
    });

    test("should return the same hash code for the same input", () => {
      const str = "hello";
      const hash1 = utils.hashCode(str);
      const hash2 = utils.hashCode(str);
      expect(hash1).toBe(hash2);
    });

    test("should return different hash codes for different inputs", () => {
      const hash1 = utils.hashCode("hello");
      const hash2 = utils.hashCode("world");
      expect(hash1).not.toBe(hash2);
    });

    test("should return different hash codes for different inputs", () => {
      const hash1 = utils.hashCode(new Set([1, 2, 3]));
      const hash2 = utils.hashCode({});
      expect(hash1).not.toBe(hash2);
    });

    test("should handle empty input", () => {
      expect(utils.hashCode("")).toBe(0);
    });

    test("should handle special characters", () => {
      expect(utils.hashCode("$%^&*()")).toBe(-1262342590);
    });

    test("circular reference", () => {
      const example: any = {
        a: 1,
        b: {
          c: 2,
          d: null
        }
      };
      example.b.d = example;
      const result = utils.hashCode(example);
      expect(typeof result).toBe("number");
      expect(result).toBeTruthy();
    });

    test("should handle many types", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type HashCodeTests = [any, { value?: number | null, typeOf?: TypeOf, args?: any[]}][];
      const tests: HashCodeTests = [
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

        expect(Array.isArray(args)).toBeTruthy();

        let atLeastOneExpect = false;
        const calc = utils.hashCode(input, ...args);

        if (value !== undefined) {
          expect(calc).toBe(value);
          atLeastOneExpect = true;
        }

        if (typeOf !== undefined) {
          expect(typeof calc).toBe(typeOf);
          atLeastOneExpect = true;
        }

        // At least one expect was ran
        expect(atLeastOneExpect).toBe(true);

      });
    });
  });

  describe("capitalize", () => {
    test("should capitalize the first letter of a string", () => {
      expect(utils.capitalize("hello")).toBe("Hello");
    });

    test("should not change the case of other letters in the string", () => {
      expect(utils.capitalize("hELlo")).not.toBe("HEllo");
    });

    test("should return an empty string if the input is an empty string", () => {
      expect(utils.capitalize("")).toBe("");
    });

    test("should return the input if the first letter is already capitalized", () => {
      expect(utils.capitalize("Hello")).toBe("Hello");
    });

    test("should handle input that is not a string", () => {
      expect(utils.capitalize(123 as unknown as string)).toBe("");
    });
  });
});