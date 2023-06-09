"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("../check");
const eval_1 = require("./eval");
const date_1 = require("../date");
const fixString = (x) => {
    if (check_1.default.isString(x)) {
        if (x.startsWith("\"") && x.endsWith("\"")) {
            x = x.substring(1, x.length - 1);
        }
        else if (x.startsWith("'") && x.endsWith("'")) {
            x = x.substring(1, x.length - 1);
        }
    }
    return x;
};
const wrapCtxFuncs = (mutCtx) => {
    const _f = mutCtx === null || mutCtx === void 0 ? void 0 : mutCtx.funcs;
    if (_f && check_1.default.isObject(_f)) {
        const f = Object.assign({}, _f);
        const updated = {};
        Object
            .keys(f)
            .forEach((k) => {
            updated[k] = (...args) => {
                args = args.map(fixString);
                return f[k](...args);
            };
        });
        mutCtx.funcs = updated;
    }
    return mutCtx;
};
/**
 *
 * @param sentence sentence
 * @param _ctx context
 * @returns evaludated sentence
 *
 * @deprecated use `class TemplateParser` or `lval` function
 */
const parseTemplate = (sentence, _ctx = {}) => {
    const logs = [];
    const result = sentence
        .split("\n")
        .map((line, index) => {
        try {
            const parsed = _parseTemplate(line, _ctx);
            logs.push(...parsed.warnings.map((wranMeta) => (Object.assign({ lineNumber: index + 1, level: "WARN" }, wranMeta))));
            return parsed.result;
        }
        catch (error) {
            if (error.message.toLowerCase().startsWith("no primary expression starts with ')'") || error.message.startsWith("Expected ')' but got '")) {
                const modded = line.replace(/(\W)\(([^)]+)\)/g, "$1 <parentheses> $2 </parentheses>");
                try {
                    const parsed = _parseTemplate(modded, _ctx);
                    logs.push(...parsed.warnings.map((wranMeta) => (Object.assign({ lineNumber: index + 1, level: "WARN" }, wranMeta))));
                    return parsed
                        .result
                        .replace(/<parentheses> /gi, "(")
                        .replace(/ <\/parentheses>/gi, ")");
                }
                catch (ignored) { /* emtpy */ }
            }
            let message = "";
            if (error) {
                message = error.message;
                if (!message && error.toString) {
                    message = error.toString();
                }
            }
            if (!message) {
                message = `${error}`;
            }
            logs.push({
                lineNumber: index + 1,
                level: "ERROR",
                message,
                error,
                timestamp: new Date(),
            });
        }
        return line;
    })
        .join("\n");
    return {
        result,
        logs,
    };
};
const _parseTemplate = (sentence, _ctx = {}) => {
    var _a;
    const warnings = [];
    const ctx = wrapCtxFuncs(Object.assign({}, _ctx));
    const lex = new eval_1.Lexer(sentence);
    const builder = [];
    while (lex.hasNext()) {
        const _restore = lex.spaceAfterToken();
        let restoreSpace = "";
        const expr = (0, eval_1.parseExpr)(lex);
        let word = expr.payload.value;
        const cutHist = [];
        if (word && check_1.default.isString(word) && word.startsWith("$")) {
            restoreSpace = _restore;
            let isPeriod = word.endsWith(".");
            let isExcla = word.endsWith("!");
            let isParenOpen = word.endsWith("(");
            let isParenClose = word.endsWith(")");
            let isGt = word.endsWith(">");
            let isLt = word.endsWith("<");
            while (word && (isPeriod || isExcla || isParenOpen || isParenClose || isGt || isLt)) {
                word = word.substring(0, word.length - 1);
                if (isPeriod) {
                    cutHist.push(".");
                }
                else if (isExcla) {
                    cutHist.push("!");
                }
                else if (isParenOpen) {
                    cutHist.push("(");
                }
                else if (isParenClose) {
                    cutHist.push(")");
                }
                else if (isGt) {
                    cutHist.push(">");
                }
                else if (isLt) {
                    cutHist.push("<");
                }
                isPeriod = word.endsWith(".");
                isExcla = word.endsWith("!");
                isParenOpen = word.endsWith("(");
                isParenClose = word.endsWith(")");
                isGt = word.endsWith(">");
                isLt = word.endsWith("<");
            }
            if (cutHist.length !== 0) {
                expr.payload.value = word;
            }
        }
        const isFuncCall = expr.kind === "funcall";
        const isSymbol = expr.kind === "symbol";
        const resolved = (0, eval_1.runExpr)(expr, ctx, /*&mut*/ warnings);
        const append = cutHist.join("");
        builder.push(resolved + append + restoreSpace);
        const isVar = (_a = lex.lastToken()) === null || _a === void 0 ? void 0 : _a.startsWith("$");
        const commaLoc = builder.lastIndexOf(",") - 1;
        if (lex.lastToken() === "," && builder[commaLoc] === " ") {
            builder.splice(commaLoc, 1);
        }
        if (isFuncCall && !["!", ".", ","].includes(lex.nextToken())) {
            builder.push(" ");
        }
        if (!(isFuncCall || (isSymbol && isVar))) {
            builder.push(" ");
        }
    }
    return {
        result: builder.join("").trim(),
        warnings,
    };
};
class TemplateParser {
    constructor(options = {
        includeBuiltIns: true,
    }, ctx = {}, logs = []) {
        this.options = options;
        this.ctx = ctx;
        this.logs = logs;
        if (this.options.includeBuiltIns) {
            this.ctx.funcs = Object.assign(Object.assign({}, this.builtinFunctions()), (this.ctx.funcs || {}));
        }
    }
    builtinFunctions() {
        const $abs = (x) => Math.abs(x);
        const $all = (...args) => {
            return args.map($bool).every((x) => x);
        };
        const $any = (...args) => {
            return args.map($bool).some((x) => x);
        };
        const $bool = (x) => {
            if (check_1.default.isValidBoolean(x)) {
                return check_1.default.isTrue(x);
            }
            return !!x && $isset(x);
        };
        const $float = (x) => parseFloat(x);
        const $str = (x) => {
            if ($isnil(x)) {
                return `${x}`;
            }
            if (check_1.default.isObject(x)) {
                try {
                    x = JSON.stringify(x);
                }
                catch (ignored) {
                    const circularReference = [];
                    const jsonString = JSON.stringify(x, (key, value) => {
                        if (typeof value === "bigint") {
                            return value.toString();
                        }
                        if (typeof value === "object" && value !== null) {
                            if (circularReference.includes(value)) {
                                return "[Circular]";
                            }
                            circularReference.push(value);
                        }
                        return value;
                    });
                    // Replace circular references with actual object reference
                    x = jsonString.replace(/"\[Circular]"/g, () => {
                        return JSON.stringify("[Circular]");
                    });
                }
            }
            if (!check_1.default.isString(x)) {
                x = x.toString ? x.toString() : `${x}`;
            }
            return x;
        };
        const $format = (fmt, ...args) => {
            if (!check_1.default.isString(fmt) || args.length === 0) {
                return fmt;
            }
            args.map($str).forEach((variable, index) => {
                const template = `{${index}}`;
                while (fmt.includes(template)) {
                    fmt = fmt.replace(template, variable);
                }
            });
            return fmt;
        };
        const $if = (condition, ifTrue, ifFalse) => {
            return $bool(condition) ? ifTrue : ifFalse;
        };
        const $int = (x, radix) => parseInt(x, radix || 10);
        const $isinstance = (x, ...types) => {
            const xType = $type(x);
            return types.map($str).some((t) => xType === t);
        };
        const $tisstring = (x) => {
            return $isinstance(x, "string");
        };
        const $tisnumber = (x) => {
            return $isinstance(x, "number", "bigint");
        };
        const $tisundefined = (x) => {
            return $isinstance(x, "undefined");
        };
        const $tisobject = (x) => {
            return $isinstance(x, "object");
        };
        const $tisboolean = (x) => {
            return $isinstance(x, "boolean");
        };
        const $isnil = (x) => {
            return x === null || x === undefined;
        };
        const $endsWith = (x, searchString, endPos) => {
            x = $str(x);
            searchString = $str(searchString);
            return x.endsWith(searchString, endPos);
        };
        const $startsWith = (x, searchString, pos) => {
            return $str(x).startsWith(searchString, pos);
        };
        const $lower = (x) => {
            return $str(x).toLowerCase();
        };
        const $upper = (x) => {
            return $str(x).toUpperCase();
        };
        const $len = (x) => {
            return $str(x).length;
        };
        const $max = (...args) => {
            return Math.max(...args
                .map($str)
                .map($float)
                .filter((x) => !isNaN(x)));
        };
        const $min = (...args) => {
            return Math.min(...args
                .map($str)
                .map($float)
                .filter((x) => !isNaN(x)));
        };
        const $pow = (a, b) => Math.pow(a, b);
        const $round = (a) => Math.round(a);
        const $math = (key, ...args) => {
            try {
                const intrinsic = Math[key];
                const result = check_1.default.isFunction(intrinsic) ? intrinsic(...args) : intrinsic;
                if (result) {
                    return result;
                }
            }
            catch (error) {
                this.logs.push({
                    level: "ERROR",
                    error,
                    message: error.message || `${error}`,
                    lineNumber: NaN,
                    timestamp: new Date(),
                });
            }
            const argv = args.join(", ");
            this.logs.push({
                level: "WARN",
                lineNumber: NaN,
                message: `Couldn't resolve Math.${key}${!argv ? "" : "(" + argv + ")"}`,
                timestamp: new Date(),
            });
            return `$math('${key}'${!argv ? "" : ", " + argv})`;
        };
        const $concat = (...args) => {
            return args.map($str).join("");
        };
        const $substring = (x, start, end) => {
            const str = $str(x);
            if (start === undefined || !check_1.default.isNumber(start) || start < 0) {
                start = 0;
            }
            if (end === undefined || !check_1.default.isNumber(start) || end > str.length) {
                end = str.length;
            }
            return str.substring(start, end);
        };
        const $type = (x) => typeof x;
        const $getattr = (obj, ...path) => {
            let ptr = obj;
            path.filter(check_1.default.isString).forEach((literalKey) => {
                // Split key into parts on '.'
                let keys = literalKey.split(".");
                // Check if first attr exists if not revert back
                // to original key
                if (!ptr[keys[0]]) {
                    keys = [literalKey];
                }
                keys
                    .filter((x) => !!x)
                    .forEach((key) => {
                    if (ptr && key && ptr[key]) {
                        ptr = ptr[key];
                    }
                });
            });
            return ptr;
        };
        const $hasattr = (obj, ...path) => {
            let ptr = obj;
            let result = true;
            path.filter(check_1.default.isString).forEach((literalKey) => {
                // Split key into parts on '.'
                let keys = literalKey.split(".");
                // Check if first attr exists if not revert back
                // to original key
                if (!ptr[keys[0]]) {
                    keys = [literalKey];
                }
                keys
                    .filter((x) => !!x)
                    .forEach((key) => {
                    if (ptr && key && ptr[key]) {
                        ptr = ptr[key];
                    }
                    else {
                        result = false;
                    }
                });
            });
            return result;
        };
        const $isset = (obj) => {
            return !$str(obj).startsWith("$");
        };
        const $includes = (x, value) => {
            if (x) {
                if (x.includes && check_1.default.isFunction(x.includes)) {
                    return x.includes(value);
                }
                if (x.has && check_1.default.isFunction(x.has)) {
                    return x.has(value);
                }
            }
            return false;
        };
        const $now = () => {
            return new Date();
        };
        return {
            $if,
            $abs,
            $all,
            $any,
            $bool,
            $float,
            $str,
            $format,
            $int,
            $isnil,
            $isinstance,
            $tisstring,
            $tisnumber,
            $tisboolean,
            $tisundefined,
            $tisobject,
            $len,
            $max,
            $min,
            $pow,
            $round,
            $substring,
            $type,
            $math,
            $getattr,
            $concat,
            $hasattr,
            $isset,
            $includes,
            $endsWith,
            $startsWith,
            $lower,
            $upper,
            $now,
        };
    }
    fixName(name) {
        return name.startsWith("$") ? name : "$" + name;
    }
    fnExists(name) {
        name = this.fixName(name);
        return name in (this.ctx.funcs || {});
    }
    varExists(name) {
        name = this.fixName(name);
        return name in (this.ctx.vars || {});
    }
    addVar(name, value) {
        name = this.fixName(name);
        this.ctx.vars = this.ctx.vars || {};
        this.ctx.vars[name] = value;
    }
    addFunction(name, cb) {
        name = this.fixName(name);
        this.ctx.funcs = this.ctx.funcs || {};
        this.ctx.funcs[name] = cb;
    }
    clearLogs() {
        this.logs = [];
    }
    parse(sentence) {
        const result = parseTemplate(sentence, this.ctx || {});
        this.logs.push(...result.logs);
        return result;
    }
}
const _lvalParseString = (str) => {
    if (check_1.default.isNumeric(str)) {
        return parseFloat(str);
    }
    else if (check_1.default.isValidBoolean(str)) {
        return check_1.default.isTrue(str);
    }
    else if (date_1.default.parse(str) !== null) {
        return new Date(str);
    }
    else if (str === "undefined") {
        return undefined;
    }
    else if (str === "null") {
        return null;
    }
    try {
        return JSON.parse(str);
    }
    catch (err) {
        return str;
    }
};
const lval = (sentence, ctx) => {
    const r = parseTemplate(sentence, ctx || {});
    const expr = _lvalParseString(r.result);
    return {
        result: expr,
        logs: r.logs,
    };
};
const ignoreThisBuiltins = new TemplateParser({ includeBuiltIns: false }).builtinFunctions;
exports.default = {
    /** @deprecated change `SentenceParser` to `TemplateParser`  */
    SentenceParser: TemplateParser,
    TemplateParser,
    lval,
};
