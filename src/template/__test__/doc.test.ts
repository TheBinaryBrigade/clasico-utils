

import { describe, expect, test } from "@jest/globals";
import doc from "../doc";
import parser, { Context } from "../index";

const $str = new parser
  .TemplateParser({includeBuiltIns: true})
  .builtinFunctions()
  .$str;

Object.entries(doc).forEach(([$name, { examples }]) => {
  describe($name, () => {
    examples.forEach(({ input, output }) => {
      const text = input.text;
      const ctx: Context = {
        funcs: {
          ...(input.context?.funcs || {})
        },
        vars: {
          ...(input.context?.vars || {})
        }
      };
      test(`${text}; ctx=${$str(input.context?.vars)}`, () => {
        const sparser = new parser.TemplateParser({includeBuiltIns: true}, ctx);
        const result = sparser.parse(input.text).result;
        if (typeof output === "function") {
          expect(output(result)).toBe(true);
        } else {
          expect(result).toBe(output);
        }
      });
    });
  });
});

