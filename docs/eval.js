"use strict";
var ClasicoUtils = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    check: () => check,
    hashCode: () => hashCode,
    parser: () => parser
  });

  // src/check/index.ts
  var TRUE = new Boolean(true);
  var FALSE = new Boolean(false);
  var BOOLEANS = [true, TRUE, false, FALSE];
  var isNumber = (x) => {
    return typeof x === "number" || x instanceof Number || typeof x === "bigint" || x instanceof BigInt;
  };
  var isString = (x) => {
    return typeof x === "string" || x instanceof String;
  };
  var isBoolean = (x) => {
    return typeof x === "boolean" || x instanceof Boolean || BOOLEANS.includes(x);
  };
  var isFunction = (x) => {
    return typeof x === "function" || x instanceof Function;
  };
  var isObject = (x) => {
    if (isNil(x)) {
      return false;
    }
    return typeof x === "object";
  };
  var isNil = (x) => {
    return x === null || x === void 0;
  };
  var isArray = (x) => {
    return Array.isArray(x) || x instanceof Array || Object.prototype.toString.call(x) === "[object Array]";
  };
  var isSet = (x) => {
    return x instanceof Set || Object.prototype.toString.call(x) === "[object Set]";
  };
  var isIterable = (x) => {
    if (isNil(x)) {
      return false;
    }
    return isFunction(x[Symbol.iterator]);
  };
  var isNumeric = (x) => {
    if (isNumber(x)) {
      return true;
    }
    if (!isString(x)) {
      return false;
    }
    return !isNaN(x) && !isNaN(parseFloat(x));
  };
  var isValidBoolean = (x) => {
    if (isBoolean(x)) {
      return true;
    }
    const isNum = isNumber(x);
    const isStr = isString(x);
    if (isNum || isStr) {
      const alts = [
        "true",
        "false",
        1,
        0,
        "1",
        "0",
        TRUE,
        FALSE,
        true,
        false
      ];
      if (alts.includes(x)) {
        return true;
      }
      if (isStr) {
        x = x.trim();
        const len = Math.max(...alts.map((x2) => x2.toString().length));
        if (x.length <= len && alts.includes(x.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  };
  var isTrue = (x) => {
    if (x && x.toString && x.toString() === "true") {
      return true;
    }
    if (isValidBoolean(x)) {
      const alts = [
        true,
        "true",
        "1",
        1,
        TRUE
      ];
      if (alts.includes(x)) {
        return true;
      }
      if (isString(x)) {
        x = x.trim();
        const len = Math.max(...alts.map((x2) => x2.toString().length));
        if (x.length <= len && alts.includes(x.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  };
  var isFalse = (x) => {
    if (x && x.toString && x.toString() === "false") {
      return true;
    }
    if (isValidBoolean(x)) {
      return !isTrue(x);
    }
    return false;
  };
  var check_default = {
    isNumber,
    isString,
    isBoolean,
    isFunction,
    isObject,
    isNumeric,
    isValidBoolean,
    isTrue,
    isFalse,
    isArray,
    isSet,
    isIterable
  };

  // src/eval/eval.ts
  var __SAVE = "$B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B";
  var BIN_PREC = {
    "0": "PREC0",
    "1": "PREC1",
    "2": "COUNT_PRECS",
    "PREC0": 0,
    "PREC1": 1,
    "COUNT_PRECS": 2
  };
  Object.freeze(BIN_PREC);
  Object.seal(BIN_PREC);
  var BINARY_OPS = {
    "+": {
      func: (lhs, rhs) => {
        if (![lhs, rhs].every(check_default.isNumber)) {
          return `${lhs}+${rhs}`;
        }
        return lhs + rhs;
      },
      prec: BIN_PREC.PREC0
    },
    "-": {
      func: (lhs, rhs) => {
        if (![lhs, rhs].every(check_default.isNumber)) {
          return `${lhs}-${rhs}`;
        }
        return lhs - rhs;
      },
      prec: BIN_PREC.PREC0
    },
    "*": {
      func: (lhs, rhs) => {
        if (![lhs, rhs].every(check_default.isNumber)) {
          return `${lhs}*${rhs}`;
        }
        return lhs * rhs;
      },
      prec: BIN_PREC.PREC1
    },
    "/": {
      func: (lhs, rhs) => {
        if (![lhs, rhs].every(check_default.isNumber)) {
          return `${lhs}/${rhs}`;
        }
        return lhs / rhs;
      },
      prec: BIN_PREC.PREC1
    },
    "%": {
      func: (lhs, rhs) => {
        if (![lhs, rhs].every(check_default.isNumber)) {
          return `${lhs}%${rhs}`;
        }
        return lhs % rhs;
      },
      prec: BIN_PREC.PREC1
    }
  };
  var UNARY_OPS = {
    "-": (arg) => -arg
  };
  var Lexer = class {
    constructor(src, hist = [], syntax = "(),", alreadyCrashed = false) {
      this.src = src;
      this.hist = hist;
      this.syntax = syntax;
      this.alreadyCrashed = alreadyCrashed;
    }
    nextToken() {
      const token = this.next();
      if (token !== null) {
        this.unnext(token);
      }
      return token;
    }
    lastToken() {
      return this.hist[this.hist.length - 1];
    }
    unnext(token) {
      this.src = token + this.src;
      this.hist.pop();
    }
    next() {
      this.src = this.src.trimStart();
      if (this.src.length == 0) {
        return null;
      }
      const isTokenBreak = (c) => {
        return c in BINARY_OPS || c in UNARY_OPS || this.syntax.includes(c);
      };
      const isDouble = this.src.startsWith('"');
      const isSingle = this.src.startsWith("'");
      const isSOFStr = isDouble || isSingle;
      const strEnd = this.src.indexOf(isDouble ? '"' : "'", 1);
      if (isSOFStr && strEnd > 0) {
        const token2 = this.src.slice(0, strEnd + 1);
        this.src = this.src.slice(strEnd + 1);
        this.hist.push(token2);
        return token2;
      }
      if (isTokenBreak(this.src[0])) {
        const token2 = this.src[0];
        this.src = this.src.slice(1);
        this.hist.push(token2);
        return token2;
      }
      for (let i = 0; i < this.src.length; ++i) {
        if (isTokenBreak(this.src[i]) || this.src[i] == " ") {
          const token2 = this.src.slice(0, i);
          this.src = this.src.slice(i);
          this.hist.push(token2);
          return token2;
        }
      }
      const token = this.src;
      this.hist.push(token);
      this.src = "";
      return token;
    }
    hasNext() {
      const token = this.next();
      const valid = token !== null;
      if (valid) {
        this.unnext(token);
      }
      return valid;
    }
    spaceAfterToken() {
      const token = this.next();
      const valid = token !== null;
      if (valid && this.src) {
        const spaceCount = this.src.length - this.src.trimStart().length;
        if (spaceCount > 0) {
          this.unnext(token);
          return " ".repeat(spaceCount);
        }
      }
      if (valid) {
        this.unnext(token);
      }
      return "";
    }
  };
  var parsePrimary = (lexer) => {
    let token = lexer.next();
    if (token !== null) {
      if (token in UNARY_OPS) {
        const operand = parseExpr(lexer);
        return {
          "kind": "unary_op",
          "payload": {
            "op": token,
            "operand": operand
          }
        };
      } else if (token === "(") {
        const expr = parseExpr(lexer);
        token = lexer.next();
        if (token === __SAVE) {
          token = lexer.next();
        }
        if (token !== ")") {
          throw new Error("Expected ')' but got '" + token + "'");
        }
        return expr;
      } else if (token === ")") {
        if (!lexer.alreadyCrashed) {
          lexer.alreadyCrashed = true;
          lexer.unnext("," + __SAVE + ")");
          return parsePrimary(lexer);
        }
        throw new Error("No primary expression starts with ')'");
      } else {
        let nextToken = lexer.next();
        if (nextToken === "(") {
          const args = [];
          nextToken = lexer.next();
          if (nextToken === ")") {
            return {
              "kind": "funcall",
              "payload": {
                "name": token,
                "args": args
              }
            };
          }
          if (nextToken === null) {
            throw Error("Unexpected end of input");
          }
          lexer.unnext(nextToken);
          args.push(parseExpr(lexer));
          nextToken = lexer.next();
          if (nextToken === __SAVE) {
            nextToken = lexer.next();
          }
          while (nextToken == ",") {
            args.push(parseExpr(lexer));
            nextToken = lexer.next();
            if (nextToken === __SAVE) {
              nextToken = lexer.next();
            }
          }
          if (nextToken === __SAVE) {
            nextToken = lexer.next();
          }
          if (nextToken !== ")") {
            throw Error("Expected ')' but got '" + nextToken + "'");
          }
          return {
            "kind": "funcall",
            "payload": {
              "name": token,
              "args": args
            }
          };
        } else {
          if (nextToken !== null) {
            lexer.unnext(nextToken);
          }
          return {
            "kind": "symbol",
            "payload": {
              "value": token
            }
          };
        }
      }
    } else {
      throw new Error("Expected primary expression but reached the end of the input");
    }
  };
  var parseExpr = (lexer, prec = BIN_PREC.PREC0) => {
    if (prec >= BIN_PREC.COUNT_PRECS) {
      return parsePrimary(lexer);
    }
    const lhs = parseExpr(lexer, prec + 1);
    const opToken = lexer.next();
    if (opToken !== null) {
      if (opToken in BINARY_OPS && BINARY_OPS[opToken].prec == prec) {
        const rhs = parseExpr(lexer, prec);
        return {
          "kind": "binary_op",
          "payload": {
            "op": opToken,
            "lhs": lhs,
            "rhs": rhs
          }
        };
      } else {
        lexer.unnext(opToken);
      }
    }
    return lhs;
  };
  var runExpr = (expr, ctx = {}) => {
    console.assert(check_default.isObject(expr));
    switch (expr.kind) {
      case "symbol": {
        const symbol = expr.payload;
        const value = symbol.value;
        const number = Number(value);
        if (isNaN(number)) {
          if (ctx.vars && value && value in ctx.vars) {
            return ctx.vars[value];
          }
          if (value == null ? void 0 : value.startsWith("$")) {
            console.warn("WARN: Unknown variable '" + value + "'");
          }
          return value;
        } else {
          return number;
        }
      }
      case "unary_op": {
        const unary_op = expr.payload;
        const op = unary_op == null ? void 0 : unary_op.op;
        const operand = unary_op == null ? void 0 : unary_op.operand;
        if (op && op in UNARY_OPS) {
          if (operand === void 0) {
            throw new Error("operand needs to be an object not undefined");
          }
          return UNARY_OPS[op](runExpr(operand, ctx));
        }
        throw new Error("Unknown unary operator '" + unary_op.op + "'");
      }
      case "binary_op": {
        const binary_op = expr.payload;
        const op = binary_op == null ? void 0 : binary_op.op;
        const lhs = binary_op == null ? void 0 : binary_op.lhs;
        const rhs = binary_op == null ? void 0 : binary_op.rhs;
        if (op && op in BINARY_OPS) {
          if (lhs === void 0) {
            throw new Error(`lhs operand needs to be an object not undefined: lhs=${lhs} :: rhs=${rhs}`);
          }
          if (rhs === void 0) {
            throw new Error(`rhs operand needs to be an object not undefined: lhs=${lhs} :: rhs=${rhs}`);
          }
          return BINARY_OPS[op].func(runExpr(lhs, ctx), runExpr(rhs, ctx));
        }
        throw new Error("Unknown binary operator '" + op + "'");
      }
      case "funcall": {
        const funcall = expr.payload;
        const name = funcall.name;
        const args = funcall.args;
        if (ctx.funcs && name !== void 0 && args !== void 0 && name in ctx.funcs) {
          let _a;
          return (_a = ctx.funcs)[name].apply(
            _a,
            args.map((arg) => runExpr(arg, ctx))
          );
        }
        if (name == null ? void 0 : name.startsWith("$")) {
          console.warn("WARN: Unknown function '" + name + "'");
        }
        const params = args == null ? void 0 : args.map((x) => {
          var _a;
          return (_a = x == null ? void 0 : x.payload) == null ? void 0 : _a.value;
        }).map((x) => check_default.isObject(x) ? JSON.stringify(x) : x).join(", ");
        return `${name}(${params || ""})`;
      }
      default: {
        throw new Error("Unexpected AST node '" + expr.kind + "'");
      }
    }
  };

  // src/eval/index.ts
  var fixString = (x) => {
    if (check_default.isString(x)) {
      if (x.startsWith('"') && x.endsWith('"')) {
        x = x.substring(1, x.length - 1);
      } else if (x.startsWith("'") && x.endsWith("'")) {
        x = x.substring(1, x.length - 1);
      }
    }
    return x;
  };
  var wrapCtxFuncs = (mut_ctx) => {
    const _f = mut_ctx == null ? void 0 : mut_ctx.funcs;
    if (_f && check_default.isObject(_f)) {
      const f = __spreadValues({}, _f);
      const updated = {};
      Object.keys(f).forEach((k) => {
        updated[k] = (...args) => {
          args = args.map(fixString);
          return f[k](...args);
        };
      });
      mut_ctx.funcs = updated;
    }
    return mut_ctx;
  };
  var builtinFunctions = () => {
    const $abs = (x) => Math.abs(x);
    const $all = (...args) => {
      return args.map($bool).every((x) => x === true);
    };
    const $any = (...args) => {
      return args.map($bool).some((x) => x === true);
    };
    const $bool = (x) => {
      if (check_default.isValidBoolean(x)) {
        return check_default.isTrue(x);
      }
      return !!x && $isset(x);
    };
    const $float = (x) => parseFloat(x);
    const $str = (x) => {
      if (check_default.isObject(x)) {
        x = JSON.stringify(x, null, 0);
      }
      if (!check_default.isString(x)) {
        x = x.toString ? x.toString() : `${x}`;
      }
      return x;
    };
    const $format = (fmt, ...args) => {
      if (!check_default.isString(fmt) || args.length === 0) {
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
    const $int = (x) => parseInt(x);
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
      return x === null || x === void 0;
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
      return Math.max(
        ...args.map($str).map($float).filter((x) => !isNaN(x))
      );
    };
    const $min = (...args) => {
      return Math.min(
        ...args.map($str).map($float).filter((x) => !isNaN(x))
      );
    };
    const $pow = (a, b) => Math.pow(a, b);
    const $round = (a) => Math.round(a);
    const $math = (key, ...args) => {
      try {
        const intrinsic = Math[key];
        const result = check_default.isFunction(intrinsic) ? intrinsic(...args) : intrinsic;
        if (result) {
          return result;
        }
      } catch (error) {
        console.error(error);
      }
      const argv = args.join(", ");
      return `Math.${key}${!argv ? "" : "(" + argv + ")"}`;
    };
    const $concat = (...args) => {
      return args.map($str).join("");
    };
    const $substring = (x, start, end) => {
      const str = $str(x);
      if (start === void 0 || !check_default.isNumber(start) || start < 0) {
        start = 0;
      }
      if (end === void 0 || !check_default.isNumber(start) || end > str.length) {
        end = str.length;
      }
      return str.substring(start, end);
    };
    const $type = (x) => typeof x;
    const $getattr = (obj, ...path) => {
      let ptr = obj;
      path.filter(check_default.isString).forEach((literalKey) => {
        let keys = literalKey.split(".");
        if (!ptr[keys[0]]) {
          keys = [literalKey];
        }
        keys.filter((x) => !!x).forEach((key) => {
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
      path.filter(check_default.isString).forEach((literalKey) => {
        let keys = literalKey.split(".");
        if (!ptr[keys[0]]) {
          keys = [literalKey];
        }
        keys.filter((x) => !!x).forEach((key) => {
          if (ptr && key && ptr[key]) {
            ptr = ptr[key];
          } else {
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
        if (x.includes && check_default.isFunction(x.includes)) {
          return x.includes(value);
        }
        if (x.has && check_default.isFunction(x.has)) {
          return x.has(value);
        }
      }
      return false;
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
      $upper
    };
  };
  var parseSentence = (sentence, _ctx = {}) => {
    return sentence.split("\n").map((line) => _parseSentence(line, _ctx)).join("\n");
  };
  var _parseSentence = (sentence, _ctx = {}) => {
    var _a;
    const ctx = wrapCtxFuncs(__spreadValues({}, _ctx));
    const lex = new Lexer(sentence);
    const builder = [];
    while (lex.hasNext()) {
      const _restore = lex.spaceAfterToken();
      let restoreSpace = "";
      const expr = parseExpr(lex);
      let word = expr.payload.value;
      const cutHist = [];
      if (word && check_default.isString(word) && word.startsWith("$")) {
        restoreSpace = _restore;
        let isPeriod = word.endsWith(".");
        let isExcla = word.endsWith("!");
        while (word && (isPeriod || isExcla)) {
          word = word.substring(0, word.length - 1);
          if (isPeriod) {
            cutHist.push(".");
          } else if (isExcla) {
            cutHist.push("!");
          }
          isPeriod = word.endsWith(".");
          isExcla = word.endsWith("!");
        }
        if (cutHist.length !== 0) {
          expr.payload.value = word;
        }
      }
      const isFuncCall = expr.kind === "funcall";
      const isSymbol = expr.kind === "symbol";
      const resolved = runExpr(expr, ctx);
      const append = cutHist.join("");
      builder.push(resolved + append + restoreSpace);
      const isVar = (_a = lex.lastToken()) == null ? void 0 : _a.startsWith("$");
      const commaLoc = builder.lastIndexOf(",") - 1;
      if (lex.lastToken() === "," && builder[commaLoc] === " ") {
        builder.splice(commaLoc, 1);
      }
      if (isFuncCall && lex.nextToken() !== "!") {
        builder.push(" ");
      }
      if (!(isFuncCall || isSymbol && isVar)) {
        builder.push(" ");
      }
    }
    return builder.join("").trim();
  };
  var eval_default = {
    builtinFunctions,
    parseSentence
  };

  // src/index.ts
  var hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; ++i) {
      const code = str.charCodeAt(i);
      hash = (hash << 5) - hash + code;
      hash &= hash;
    }
    return hash;
  };
  var check = check_default;
  var parser = eval_default;
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=eval.js.map
