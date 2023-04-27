"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const doc_1 = require("../doc");
const index_1 = require("../index");
const $str = new index_1.default
    .SentenceParser({ includeBuiltIns: true })
    .builtinFunctions()
    .$str;
Object.entries(doc_1.default).forEach(([$name, { examples }]) => {
    (0, globals_1.describe)($name, () => {
        examples.forEach(({ input, output }) => {
            var _a, _b, _c;
            const text = input.text;
            const ctx = {
                funcs: Object.assign({}, (((_a = input.context) === null || _a === void 0 ? void 0 : _a.funcs) || {})),
                vars: Object.assign({}, (((_b = input.context) === null || _b === void 0 ? void 0 : _b.vars) || {}))
            };
            (0, globals_1.test)(`${text}; ctx=${$str((_c = input.context) === null || _c === void 0 ? void 0 : _c.vars)}`, () => {
                const sparser = new index_1.default.SentenceParser({ includeBuiltIns: true }, ctx);
                const result = sparser.parse(input.text).result;
                if (typeof output === "function") {
                    (0, globals_1.expect)(output(result)).toBe(true);
                }
                else {
                    (0, globals_1.expect)(result).toBe(output);
                }
            });
        });
    });
});
