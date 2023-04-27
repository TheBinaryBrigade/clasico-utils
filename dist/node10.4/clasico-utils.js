"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
module.exports = __toCommonJS(src_exports);

// src/@types/index.ts
var types_exports = {};

// src/array/sorted.ts
var sorted_exports = {};
__export(sorted_exports, {
  BisectArray: () => BisectArray,
  ReverseCompareArray: () => ReverseCompareArray,
  ReverseNumberArray: () => ReverseNumberArray,
  ReverseSortedArray: () => ReverseSortedArray,
  ReverseStringArray: () => ReverseStringArray,
  SortedArray: () => SortedArray,
  SortedCompareArray: () => SortedCompareArray,
  SortedNumberArray: () => SortedNumberArray,
  SortedStringArray: () => SortedStringArray
});

// src/date/index.ts
var subtractSeconds = (date, seconds) => {
  date.setSeconds(date.getSeconds() - seconds);
  return date;
};
var isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};
var between = (date, startDate, endDate) => {
  return date >= startDate && date <= endDate;
};
var parse = (input) => {
  try {
    const inputDate = new Date(input);
    const isValidDate = !isNaN(inputDate.getTime());
    if (isValidDate) {
      return inputDate;
    }
  } catch (ignored) {
  }
  return null;
};
var date_default = {
  subtractSeconds,
  parse,
  isWeekend,
  between
};

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
var isDate = (x) => {
  if (isNil(x)) {
    return false;
  }
  if (isString(x)) {
    x = x.trim();
    if (!x) {
      return false;
    }
  }
  if (isBoolean(x)) {
    return false;
  }
  if (isArray(x) || isSet(x)) {
    return false;
  }
  const y = date_default.parse(x);
  return !!y;
};
var isError = (x, errorLike = false) => {
  if (isNil(x)) {
    return false;
  }
  if (x instanceof Error) {
    return true;
  }
  if (errorLike && x && x.stack && x.message) {
    return true;
  }
  return false;
};
var check_default = {
  isNil,
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
  isIterable,
  isDate,
  isError
};

// src/array/sorted.ts
var BisectArray = class extends Array {
  constructor(opts) {
    const items = opts.items;
    super(...items);
    this.opts = opts;
    if (this.isValidCmp()) {
      this.sort(this.opts.cmp);
    } else {
      this.sort((a, b) => this.opts.key(a) - this.opts.key(b));
    }
    if (this.opts.asReversed) {
      this.reverse();
    }
  }
  pop() {
    return this.isReversed() ? super.pop() : super.shift();
  }
  push(...items) {
    for (const item of items) {
      const index = this.binarySearch(item);
      this.splice(index, 0, item);
    }
    return this.length;
  }
  binarySearch(item) {
    let left = 0;
    let right = this.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (this.shouldSwap(this[mid], item)) {
        left = mid + 1;
      } else if (this.shouldSwap(item, this[mid])) {
        right = mid - 1;
      } else {
        return mid;
      }
    }
    return left;
  }
  shouldSwap(a, b) {
    if (this.opts.cmp && this.isValidCmp()) {
      return this.isReversed() ? this.opts.cmp(b, a) <= 0 : this.opts.cmp(a, b) <= 0;
    }
    const keyA = this.opts.key(a);
    const keyB = this.opts.key(b);
    return this.isReversed() ? keyB - keyA <= 0 : keyA - keyB <= 0;
  }
  isValidCmp() {
    return this.opts.cmp && check_default.isFunction(this.opts.cmp);
  }
  isReversed() {
    return this.opts.asReversed;
  }
};
var ReverseSortedArray = class extends BisectArray {
  constructor(key, ...items) {
    super({ key, asReversed: true, items });
  }
};
var SortedArray = class extends BisectArray {
  constructor(key, ...items) {
    super({ key, asReversed: false, items });
  }
};
var ReverseNumberArray = class extends BisectArray {
  constructor(...items) {
    super({ key: (a) => a, asReversed: true, items });
  }
};
var SortedNumberArray = class extends BisectArray {
  constructor(...items) {
    super({ key: (a) => a, asReversed: false, items });
  }
};
var ReverseStringArray = class extends BisectArray {
  constructor(...items) {
    super({ key: () => 0, cmp: (a, b) => a.localeCompare(b), asReversed: true, items });
  }
};
var SortedStringArray = class extends BisectArray {
  constructor(...items) {
    super({ key: () => 0, cmp: (a, b) => a.localeCompare(b), asReversed: true, items });
  }
};
var ReverseCompareArray = class extends BisectArray {
  constructor(cmp, ...items) {
    super({ key: () => 0, cmp, asReversed: true, items });
  }
};
var SortedCompareArray = class extends BisectArray {
  constructor(cmp, ...items) {
    super({ key: () => 0, cmp, asReversed: true, items });
  }
};

// src/array/index.ts
var array_default = {
  ...sorted_exports
};

// src/diff/index.ts
function patienceDiff(aLines, bLines, diffPlusFlag) {
  function findUnique(arr, lo, hi) {
    const lineMap = /* @__PURE__ */ new Map();
    for (let i = lo; i <= hi; i++) {
      const line = arr[i];
      if (lineMap.has(line)) {
        lineMap.get(line).count++;
        lineMap.get(line).index = i;
      } else {
        lineMap.set(line, {
          count: 1,
          index: i
        });
      }
    }
    lineMap.forEach((val, key, map) => {
      if (val.count !== 1) {
        map.delete(key);
      } else {
        map.set(key, val.index);
      }
    });
    return lineMap;
  }
  function uniqueCommon(aArray, aLo, aHi, bArray, bLo, bHi) {
    const ma = findUnique(aArray, aLo, aHi);
    const mb = findUnique(bArray, bLo, bHi);
    ma.forEach((val, key, map) => {
      if (mb.has(key)) {
        map.set(key, {
          indexA: val,
          indexB: mb.get(key)
        });
      } else {
        map.delete(key);
      }
    });
    return ma;
  }
  function longestCommonSubsequence(abMap) {
    const ja = [];
    abMap.forEach((val, _key, _map) => {
      let i = 0;
      while (ja[i] && ja[i][ja[i].length - 1].indexB < val.indexB) {
        i++;
      }
      if (!ja[i]) {
        ja[i] = [];
      }
      if (0 < i) {
        val.prev = ja[i - 1][ja[i - 1].length - 1];
      }
      ja[i].push(val);
    });
    let lcs = [];
    if (0 < ja.length) {
      const n = ja.length - 1;
      lcs = [ja[n][ja[n].length - 1]];
      while (lcs[lcs.length - 1].prev) {
        lcs.push(lcs[lcs.length - 1].prev);
      }
    }
    return lcs.reverse();
  }
  const result = [];
  let deleted = 0;
  let inserted = 0;
  const aMove = [];
  const aMoveIndex = [];
  const bMove = [];
  const bMoveIndex = [];
  function addToResult(aIndex, bIndex) {
    if (bIndex < 0) {
      aMove.push(aLines[aIndex]);
      aMoveIndex.push(result.length);
      deleted++;
    } else if (aIndex < 0) {
      bMove.push(bLines[bIndex]);
      bMoveIndex.push(result.length);
      inserted++;
    }
    result.push({
      line: 0 <= aIndex ? aLines[aIndex] : bLines[bIndex],
      aIndex,
      bIndex
    });
  }
  function addSubMatch(aLo, aHi, bLo, bHi) {
    while (aLo <= aHi && bLo <= bHi && aLines[aLo] === bLines[bLo]) {
      addToResult(aLo++, bLo++);
    }
    const aHiTemp = aHi;
    while (aLo <= aHi && bLo <= bHi && aLines[aHi] === bLines[bHi]) {
      aHi--;
      bHi--;
    }
    const uniqueCommonMap = uniqueCommon(aLines, aLo, aHi, bLines, bLo, bHi);
    if (uniqueCommonMap.size === 0) {
      while (aLo <= aHi) {
        addToResult(aLo++, -1);
      }
      while (bLo <= bHi) {
        addToResult(-1, bLo++);
      }
    } else {
      recurseLCS(aLo, aHi, bLo, bHi, uniqueCommonMap);
    }
    while (aHi < aHiTemp) {
      addToResult(++aHi, ++bHi);
    }
  }
  function recurseLCS(aLo, aHi, bLo, bHi, uniqueCommonMap) {
    const x = longestCommonSubsequence(uniqueCommonMap || uniqueCommon(aLines, aLo, aHi, bLines, bLo, bHi));
    if (x.length === 0) {
      addSubMatch(aLo, aHi, bLo, bHi);
    } else {
      if (aLo < x[0].indexA || bLo < x[0].indexB) {
        addSubMatch(aLo, x[0].indexA - 1, bLo, x[0].indexB - 1);
      }
      let i;
      for (i = 0; i < x.length - 1; i++) {
        addSubMatch(x[i].indexA, x[i + 1].indexA - 1, x[i].indexB, x[i + 1].indexB - 1);
      }
      if (x[i].indexA <= aHi || x[i].indexB <= bHi) {
        addSubMatch(x[i].indexA, aHi, x[i].indexB, bHi);
      }
    }
  }
  recurseLCS(0, aLines.length - 1, 0, bLines.length - 1);
  if (diffPlusFlag) {
    return {
      lines: result,
      lineCountDeleted: deleted,
      lineCountInserted: inserted,
      lineCountMoved: 0,
      aMove,
      aMoveIndex,
      bMove,
      bMoveIndex
    };
  }
  return {
    lines: result,
    lineCountDeleted: deleted,
    lineCountInserted: inserted,
    lineCountMoved: 0
  };
}
var ___IGNORE = patienceDiff([], [], true);
var compare = (a, b) => {
  const desc = patienceDiff(a.split("\n"), b.split("\n"), true);
  const changes = desc.lines.map((line, index) => {
    let changeType = "unknown";
    if (line.aIndex >= 0 && line.bIndex < 0) {
      changeType = "deleted";
    } else if (line.aIndex < 0 && line.bIndex >= 0) {
      changeType = "inserted";
    } else if (line.aIndex >= 0 && line.bIndex >= 0) {
      changeType = "changed";
    }
    return {
      changeType,
      lineNumber: index + 1,
      lineContent: line.line,
      aIndex: line.aIndex,
      bIndex: line.bIndex
    };
  });
  return {
    changes,
    deletedCount: desc.lineCountDeleted,
    insertedCount: desc.lineCountInserted,
    movedCount: desc.lineCountInserted,
    linedMovedFromA: desc.aMove || [],
    linesMovedFromB: desc.bMove || [],
    _diff: desc
  };
};
var diff_default = {
  compare
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
          return {
            "kind": "symbol",
            "payload": {
              "value": token
            }
          };
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
var runExpr = (expr, ctx = {}, warnings = []) => {
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
          warnings.push("Unknown variable '" + value + "'");
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
        warnings.push("Unknown function '" + name + "'");
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
    const f = { ..._f };
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
  const $now = () => {
    return /* @__PURE__ */ new Date();
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
    $now
  };
};
var parseSentence = (sentence, _ctx = {}) => {
  const warnings = [];
  const errors = [];
  const result = sentence.split("\n").map((line, index) => {
    try {
      const parsed = _parseSentence(line, _ctx);
      warnings.push(...parsed.warnings.map((message) => ({
        lineNumber: index + 1,
        message
      })));
      return parsed.result;
    } catch (error) {
      if (error.message.toLowerCase().startsWith("no primary expression starts with ')'") || error.message.startsWith("Expected ')' but got '")) {
        const replaceParentheses = (str, open, close) => {
          return str.replace(/(\W)\(([^)]+)\)/g, `$1${open}$2${close}`);
        };
        const modded = replaceParentheses(line, " <parentheses> ", " </parentheses>");
        try {
          const parsed = _parseSentence(modded, _ctx);
          warnings.push(...parsed.warnings.map((message2) => ({
            lineNumber: index + 1,
            message: message2
          })));
          return parsed.result.replace(/<parentheses> /gi, "(").replace(/ <\/parentheses>/gi, ")");
        } catch (ignored) {
        }
      }
      let message = "";
      if (error) {
        message = error.message;
        if (!message && error.toString) {
          message = error.toString();
        }
      }
      errors.push({
        lineNumber: index + 1,
        message,
        error
      });
    }
    return line;
  }).join("\n");
  return {
    result,
    warnings,
    errors
  };
};
var _parseSentence = (sentence, _ctx = {}) => {
  var _a;
  const warnings = [];
  const ctx = wrapCtxFuncs({
    /*clone*/
    ..._ctx
  });
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
      let isParenOpen = word.endsWith("(");
      let isParenClose = word.endsWith(")");
      let isGt = word.endsWith(">");
      let isLt = word.endsWith("<");
      while (word && (isPeriod || isExcla || isParenOpen || isParenClose || isGt || isLt)) {
        word = word.substring(0, word.length - 1);
        if (isPeriod) {
          cutHist.push(".");
        } else if (isExcla) {
          cutHist.push("!");
        } else if (isParenOpen) {
          cutHist.push("(");
        } else if (isParenClose) {
          cutHist.push(")");
        } else if (isGt) {
          cutHist.push(">");
        } else if (isLt) {
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
    const resolved = runExpr(
      expr,
      ctx,
      /*&mut*/
      warnings
    );
    const append = cutHist.join("");
    builder.push(resolved + append + restoreSpace);
    const isVar = (_a = lex.lastToken()) == null ? void 0 : _a.startsWith("$");
    const commaLoc = builder.lastIndexOf(",") - 1;
    if (lex.lastToken() === "," && builder[commaLoc] === " ") {
      builder.splice(commaLoc, 1);
    }
    if (isFuncCall && !["!", ".", ","].includes(lex.nextToken())) {
      builder.push(" ");
    }
    if (!(isFuncCall || isSymbol && isVar)) {
      builder.push(" ");
    }
  }
  return {
    result: builder.join("").trim(),
    warnings
  };
};
var SentenceParser = class {
  constructor(options = {
    includeBuiltIns: true
  }, ctx = {}) {
    this.options = options;
    this.ctx = ctx;
    if (this.options.includeBuiltIns) {
      this.ctx.funcs = {
        ...builtinFunctions(),
        ...this.ctx.funcs || {}
      };
    }
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
  parse(sentence) {
    return parseSentence(sentence, this.ctx || {});
  }
};
var eval_default = {
  SentenceParser,
  builtinFunctions,
  parseSentence
};

// src/fuzzy/index.ts
var similarity = (str1, str2, gramSize = 2) => {
  const getNGrams = (s, len) => {
    s = " ".repeat(len - 1) + s.toLowerCase() + " ".repeat(len - 1);
    const v = new Array(s.length - len + 1);
    for (let i = 0; i < v.length; i++) {
      v[i] = s.slice(i, i + len);
    }
    return v;
  };
  if (!(str1 == null ? void 0 : str1.length) || !(str2 == null ? void 0 : str2.length)) {
    return 0;
  }
  const s1 = str1.length < str2.length ? str1 : str2;
  const s2 = str1.length < str2.length ? str2 : str1;
  const pairs1 = getNGrams(s1, gramSize);
  const pairs2 = getNGrams(s2, gramSize);
  const set = new Set(pairs1);
  const total = pairs2.length;
  let hits = 0;
  for (const item of pairs2) {
    if (set.delete(item)) {
      hits++;
    }
  }
  return hits / total;
};
var topSimilar = (value, values, key, topK = 5, gramSize = 2) => {
  const str1 = key(value);
  if (topK <= 0) {
    topK = 5;
  }
  const arr = new ReverseSortedArray((x) => similarity(str1, key(x), gramSize));
  values.forEach((x) => {
    arr.push(x);
    if (arr.length > topK) {
      arr.pop();
    }
  });
  return [...arr];
};
var fuzzy_default = {
  similarity,
  topSimilar
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
          const circularReference = [];
          const jsonString = JSON.stringify(str, (key, value) => {
            if (typeof value === "object" && value !== null) {
              if (circularReference.includes(value)) {
                return "[Circular]";
              }
              circularReference.push(value);
            }
            return value;
          });
          str = jsonString.replace(/"\[Circular\]"/g, () => {
            return JSON.stringify("[Circular]");
          });
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

// src/inflection/index.ts
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
  const endsWithLetter = /[A-Za-z]$/.test(word);
  if (!word || UNCOUNTABLES.has(word.toLowerCase()) || !endsWithLetter) {
    return word;
  }
  for (const elem of PLURALS) {
    const rule = elem[0];
    const replacement = elem[1];
    if (rule.test(word)) {
      const result = word.replace(rule, replacement);
      return isUpper ? utils_default.capitalize(result) : result;
    }
  }
  return word;
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
_irregular("slave", "slaves");
_irregular("this", "this");
_irregular("flour", "flour");
_irregular("milk", "milk");
_irregular("water", "water");
_irregular("reserve", "reserves");
_irregular("gas", "gasses");
_irregular("bias", "biases");
_irregular("atlas", "atlases");
_irregular("goose", "geese");
_irregular("pasta", "pastas");
_irregular("slice", "slices");
_irregular("cactus", "cacti");
var inflection_default = {
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

// src/std/index.ts
var std_exports = {};
__export(std_exports, {
  Option: () => Option,
  Result: () => Result
});
var isError2 = (x) => {
  return check_default.isError(
    x,
    /*error like = */
    false
  );
};
var Option = class {
};
var Result = class {
  constructor(fn, result, error, ran = false) {
    this.fn = fn;
    this.result = result;
    this.error = error;
    this.ran = ran;
  }
  match(callbacks) {
    const isErr = this.isErr();
    const isOk = this.isOk();
    if (isErr === null && isOk === null && callbacks.debug) {
      callbacks.debug(this.result, this.error);
    }
    if (isOk && this.result !== void 0) {
      callbacks.onOk(this.result);
    } else if (isErr && this.error !== void 0) {
      callbacks.onError(this.error);
    } else if (callbacks.debug) {
      callbacks.debug(this.result, this.error);
    }
    return [this.result, this.error];
  }
  run(...args) {
    this.ran = true;
    try {
      const result = this.fn(...args);
      if (isError2(result)) {
        this.error = result;
      } else {
        this.result = result;
      }
    } catch (error) {
      this.error = error;
    }
    return this;
  }
  isErr() {
    if (!this.ran) {
      return null;
    }
    const noError = this.error === void 0;
    const noResult = this.result === void 0;
    if (noResult && noError) {
      return null;
    }
    if (noResult && !noError) {
      return true;
    }
    return false;
  }
  isOk() {
    if (!this.ran) {
      return null;
    }
    const noError = this.error === void 0;
    const noResult = this.result === void 0;
    if (noResult && noError) {
      return null;
    }
    if (noError) {
      return true;
    }
    return false;
  }
};

// src/index.ts
var src_default = {
  check: check_default,
  parser: eval_default,
  inflection: inflection_default,
  utils: utils_default,
  date: date_default,
  fuzzy: fuzzy_default,
  array: array_default,
  diff: diff_default,
  std: std_exports,
  ...types_exports
};
//# sourceMappingURL=clasico-utils.js.map
