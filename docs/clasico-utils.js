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
    default: () => src_default
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
  var SentenceParser = class {
    constructor(options = {
      includeBuiltIns: true
    }, ctx = {}) {
      this.options = options;
      this.ctx = ctx;
      if (options.includeBuiltIns) {
        this.ctx.funcs = __spreadValues(__spreadValues({}, builtinFunctions()), this.ctx.funcs || {});
      }
    }
    fixName(name) {
      return name.startsWith("$") ? name : "$" + name;
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
    parse(sentence) {
      return parseSentence(sentence, this.ctx || {});
    }
  };
  var eval_default = {
    SentenceParser,
    builtinFunctions,
    parseSentence
  };

  // src/utils/index.ts
  var hashCode = (str, coerceToString = true) => {
    if (coerceToString) {
      if (!check_default.isString(str)) {
        if (check_default.isSet(str)) {
          str = Array.from(str);
        }
        if (check_default.isObject(str)) {
          try {
            str = JSON.stringify(str);
          } catch (ignored) {
          }
        }
        if (!check_default.isString(str) && str.toString) {
          str = str.toString();
        }
      }
    }
    if (!check_default.isString(str)) {
      return null;
    }
    let hash = 0;
    for (let i = 0; i < str.length; ++i) {
      const code = str.charCodeAt(i);
      hash = (hash << 5) - hash + code;
      hash &= hash;
    }
    return hash;
  };
  var capitalize = (str) => {
    if (!check_default.isString(str)) {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  var utils_default = {
    hashCode,
    capitalize
  };

  // src/inlfection/index.ts
  var PLURALS = [
    [/(quiz)$/i, "$1zes"],
    [/^(oxen)$/i, "$1"],
    [/^(ox)$/i, "$1en"],
    [/(m|l)ice$/i, "$1ice"],
    [/(m|l)ouse$/i, "$1ice"],
    [/(passer)s?by$/i, "$1sby"],
    [/(matr|vert|ind)(?:ix|ex)$/i, "$1ices"],
    [/(x|ch|ss|sh)$/i, "$1es"],
    [/([^aeiouy]|qu)y$/i, "$1ies"],
    [/(hive)$/i, "$1s"],
    [/([lr])f$/i, "$1ves"],
    [/([^f])fe$/i, "$1ves"],
    [/sis$/i, "ses"],
    [/([ti])a$/i, "$1a"],
    [/([ti])um$/i, "$1a"],
    [/(buffal|potat|tomat)o$/i, "$1oes"],
    [/(bu)s$/i, "$1ses"],
    [/(alias|status)$/i, "$1es"],
    [/(octop|vir)i$/i, "$1i"],
    [/(octop|vir)us$/i, "$1i"],
    [/^(ax|test)is$/i, "$1es"],
    [/s$/i, "s"],
    [/$/i, "s"]
  ];
  var SINGULARS = [
    [/(database)s$/i, "$1"],
    [/(quiz)zes$/i, "$1"],
    [/(matr)ices$/i, "$1ix"],
    [/(vert|ind)ices$/i, "$1ex"],
    [/(passer)sby$/i, "$1by"],
    [/^(ox)en/i, "$1"],
    [/(alias|status)(es)?$/i, "$1"],
    [/(octop|vir)(us|i)$/i, "$1us"],
    [/^(a)x[ie]s$/i, "$1xis"],
    [/(cris|test)(is|es)$/i, "$1is"],
    [/(shoe)s$/i, "$1"],
    [/(o)es$/i, "$1"],
    [/(bus)(es)?$/i, "$1"],
    [/(m|l)ice$/i, "$1ouse"],
    [/(x|ch|ss|sh)es$/i, "$1"],
    [/(m)ovies$/i, "$1ovie"],
    [/(s)eries$/i, "$1eries"],
    [/([^aeiouy]|qu)ies$/i, "$1y"],
    [/([lr])ves$/i, "$1f"],
    [/(tive)s$/i, "$1"],
    [/(hive)s$/i, "$1"],
    [/([^f])ves$/i, "$1fe"],
    [/(t)he(sis|ses)$/i, "$1hesis"],
    [/(s)ynop(sis|ses)$/i, "$1ynopsis"],
    [/(p)rogno(sis|ses)$/i, "$1rognosis"],
    [/(p)arenthe(sis|ses)$/i, "$1arenthesis"],
    [/(d)iagno(sis|ses)$/i, "$1iagnosis"],
    [/(b)a(sis|ses)$/i, "$1asis"],
    [/(a)naly(sis|ses)$/i, "$1nalysis"],
    [/([ti])a$/i, "$1um"],
    [/(n)ews$/i, "$1ews"],
    [/(ss)$/i, "$1"],
    [/s$/i, ""]
  ];
  var UNCOUNTABLES = /* @__PURE__ */ new Set([
    "equipment",
    "fish",
    "information",
    "jeans",
    "money",
    "rice",
    "series",
    "sheep",
    "species"
  ]);
  var _irregular = (singular, plural) => {
    const caseinsensitive = (x) => {
      return Array.from(x).map((char) => "[" + char + char.toUpperCase() + "]").join("");
    };
    const insert = (arr, index, elem) => {
      arr.splice(index, 0, [new RegExp(elem[0], "i"), elem[1]]);
    };
    const pluralInsert = (index, elem) => {
      insert(PLURALS, index, elem);
    };
    const singularInsert = (index, elem) => {
      insert(SINGULARS, index, elem);
    };
    if (singular[0].toUpperCase() == plural[0].toUpperCase()) {
      pluralInsert(0, [
        `(${singular[0]})${singular.slice(1)}$`,
        "$1" + plural.slice(1)
      ]);
      pluralInsert(0, [
        `(${plural[0]})${plural.slice(1)}$`,
        "$1" + plural.slice(1)
      ]);
      singularInsert(0, [
        `(${plural[0]})${plural.slice(1)}$`,
        "$1" + singular.slice(1)
      ]);
    } else {
      pluralInsert(0, [
        `${singular[0].toUpperCase()}${caseinsensitive(singular.slice(1))}$`,
        plural[0].toUpperCase() + plural.slice(1)
      ]);
      pluralInsert(0, [
        `${singular[0].toLowerCase()}${caseinsensitive(singular.slice(1))}$`,
        plural[0].toLowerCase() + plural.slice(1)
      ]);
      pluralInsert(0, [
        `${plural[0].toUpperCase()}${caseinsensitive(plural.slice(1))}$`,
        plural[0].toUpperCase() + plural.slice(1)
      ]);
      pluralInsert(0, [
        `${plural[0].toLowerCase()}${caseinsensitive(plural.slice(1))}$`,
        plural[0].toLowerCase() + plural.slice(1)
      ]);
      singularInsert(0, [
        `${plural[0].toUpperCase()}${caseinsensitive(plural.slice(1))}$`,
        singular[0].toUpperCase() + singular.slice(1)
      ]);
      singularInsert(0, [
        `${plural[0].toLowerCase()}${caseinsensitive(plural.slice(1))}$`,
        singular[0].toLowerCase() + singular.slice(1)
      ]);
    }
  };
  var camelize = (string, uppercaseFirstLetter = true) => {
    const camelCase = dasherize(string).replace(/-/, " ").replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, "");
    const result = uppercaseFirstLetter ? camelCase.charAt(0).toUpperCase() + camelCase.slice(1) : camelCase;
    return result;
  };
  function dasherize(word) {
    return word.replace(/_/g, "-");
  }
  function humanize(word) {
    word = word.replace(/_id$/i, "");
    word = word.replace(/_/g, " ");
    word = word.replace(/([a-z\d]*)/g, function(m) {
      return m.toLowerCase();
    });
    word = word.replace(/^\w/, function(m) {
      return m.toUpperCase();
    });
    return word;
  }
  function ordinal(number) {
    const n = Math.abs(parseInt(number));
    if ([11, 12, 13].includes(n % 100)) {
      return "th";
    } else {
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }
  }
  function ordinalize(number) {
    return number + ordinal(number);
  }
  var parameterize = (string, separator = "-") => {
    const cleaned = transliterate(string);
    let param = cleaned.replace(/[^\d\w-]+/gmi, separator);
    if (separator !== "") {
      while (param.startsWith(separator)) {
        param = param.slice(separator.length);
      }
      while (param.endsWith(separator)) {
        param = param.slice(0, param.length - separator.length);
      }
    }
    return param.toLowerCase();
  };
  var pluralize = (word) => {
    const isUpper = /[A-Z]/.test(word.charAt(0));
    if (!word || UNCOUNTABLES.has(word.toLowerCase())) {
      return word;
    } else {
      for (const elem of PLURALS) {
        const rule = elem[0];
        const replacement = elem[1];
        if (rule.test(word)) {
          const result = word.replace(rule, replacement);
          return isUpper ? utils_default.capitalize(result) : result;
        }
      }
      return word;
    }
  };
  var singularize = (word) => {
    const isUpper = /[A-Z]/.test(word.charAt(0));
    for (const u of UNCOUNTABLES) {
      const regex = new RegExp(`\\b${u}\\b`, "i");
      if (regex.test(word)) {
        return word;
      }
    }
    for (const elem of SINGULARS) {
      const rule = elem[0];
      const replacement = elem[1];
      if (rule.test(word)) {
        const result = word.replace(rule, replacement);
        return isUpper ? utils_default.capitalize(result) : result;
      }
    }
    return word;
  };
  var tableize = (word) => {
    return pluralize(underscore(word));
  };
  function titleize(word) {
    return humanize(underscore(word)).split(/\s+/).map((word2) => word2.charAt(0).toUpperCase() + word2.slice(1)).join(" ");
  }
  function transliterate(string) {
    const normalized = string.normalize("NFKD");
    return normalized.replace(/[\u0300-\u036f]/g, "").replace(/[^\x00-\x7F]/g, "").trim();
  }
  function underscore(word) {
    let underscored = word.replace(/([a-z\d])([A-Z])/g, "$1_$2");
    underscored = underscored.replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2");
    underscored = underscored.replace(/-/g, "_");
    return underscored.toLowerCase();
  }
  _irregular("person", "people");
  _irregular("man", "men");
  _irregular("human", "humans");
  _irregular("child", "children");
  _irregular("sex", "sexes");
  _irregular("move", "moves");
  _irregular("cow", "kine");
  _irregular("zombie", "zombies");
  var inlfection_default = {
    camelize,
    dasherize,
    humanize,
    ordinal,
    ordinalize,
    parameterize,
    pluralize,
    singularize,
    tableize,
    titleize,
    transliterate,
    underscore,
    UNCOUNTABLES,
    PLURALS,
    SINGULARS
  };

  // src/@types/index.ts
  var types_exports = {};

  // src/index.ts
  var src_default = __spreadValues({
    check: check_default,
    parser: eval_default,
    inflection: inlfection_default,
    utils: utils_default
  }, types_exports);
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=clasico-utils.js.map
