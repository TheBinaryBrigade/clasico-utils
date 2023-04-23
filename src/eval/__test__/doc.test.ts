

import { describe, expect, test } from "@jest/globals";
import doc from "../doc";
import parser, { Context } from "../index";

Object.entries(doc).forEach(([$name, { examples }]) => {
  describe($name, () => {
    examples.forEach(({ input, output }) => {
      const text = input.text;
      const ctx: Context = {
        funcs: {
          ...parser.builtinFunctions(),
          ...(input.context?.funcs || {})
        },
        vars: input.context?.vars
      };
      test(`${text}; ctx=${JSON.stringify(input.context?.vars)}`, () => {
        const result = parser.parseSentence(text, ctx);
        expect(result).toBe(output);
      });
    });
  });
});

