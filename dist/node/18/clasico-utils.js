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
var isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};
var between = (date, startDate, endDate) => {
  return date >= startDate && date <= endDate;
};
var parse = (input) => {
  const inputDate = new Date(input);
  const isValidDate = !isNaN(inputDate.getTime());
  if (isValidDate) {
    return inputDate;
  }
  return null;
};
var timeSince = (date) => {
  const seconds = Math.floor((+/* @__PURE__ */ new Date() - +date) / 1e3);
  let interval = seconds / 31536e3;
  if (interval > 1) {
    interval = Math.floor(interval);
    return [interval, interval === 1 ? "year" : "years"];
  }
  interval = seconds / 2592e3;
  if (interval > 1) {
    interval = Math.floor(interval);
    return [interval, interval === 1 ? "month" : "months"];
  }
  interval = seconds / 86400;
  if (interval > 1) {
    interval = Math.floor(interval);
    return [interval, interval === 1 ? "day" : "days"];
  }
  interval = seconds / 3600;
  if (interval > 1) {
    interval = Math.floor(interval);
    return [interval, interval === 1 ? "hour" : "hours"];
  }
  interval = seconds / 60;
  if (interval > 1) {
    interval = Math.floor(interval);
    return [interval, interval === 1 ? "minute" : "minutes"];
  }
  interval = Math.floor(seconds);
  return [interval, interval === 1 ? "second" : "seconds"];
};
var date_default = {
  // subtractSeconds,
  parse,
  isWeekend,
  between,
  timeSince
};

// src/check/index.ts
var isNumber = (x) => {
  return typeof x === "number" || x instanceof Number;
};
var isBigInt = (x) => {
  return typeof x === "bigint" || x instanceof BigInt;
};
var isString = (x) => {
  return typeof x === "string" || x instanceof String;
};
var isBoolean = (x) => {
  return typeof x === "boolean" || x instanceof Boolean;
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
      Boolean(true),
      Boolean(false),
      true,
      false
    ];
    if (alts.includes(x)) {
      return true;
    }
    if (isStr) {
      x = x.trim();
      const len = Math.max(...alts.map((y) => y.toString().length));
      if (x.length <= len && alts.includes(x.toLowerCase())) {
        return true;
      }
    }
  }
  return false;
};
var valueOf = (x) => {
  if (x instanceof Boolean || x instanceof Number || x instanceof String || x instanceof BigInt || x instanceof Symbol) {
    if (x.valueOf && isFunction(x.valueOf)) {
      return x.valueOf();
    }
  }
  return x;
};
var isTrue = (x) => {
  const valueOfX = valueOf(x);
  if (x === true || valueOfX === true) {
    return true;
  }
  if (isValidBoolean(x)) {
    const alts = [
      true,
      "true",
      "1",
      1,
      Boolean(true)
    ];
    if (alts.includes(x)) {
      return true;
    }
    if (!isNil(valueOfX)) {
      if (alts.includes(valueOfX)) {
        return true;
      }
      if (isString(valueOfX)) {
        x = valueOfX;
      }
    }
    if (isString(x)) {
      const x2 = x.trim();
      const len = Math.max(...alts.map((y) => y.toString().length));
      if (x2.length <= len && alts.includes(x2.toLowerCase())) {
        return true;
      }
    }
  }
  return false;
};
var isFalse = (x) => {
  if (x === false || valueOf(x) === false) {
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
  return !!(errorLike && x && x.stack && x.message);
};
var check_default = {
  isNil,
  isNumber,
  isBigInt,
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

// src/array/zip.ts
function* zip(...args) {
  const min = args.reduce((acc, curr) => {
    const len = curr.length;
    if (len < acc) {
      return len;
    }
    return acc;
  }, Infinity);
  for (let i = 0; i < min; ++i) {
    yield args.map((arr) => arr[i]);
  }
}
function* chunkArray(array, chunkSize) {
  for (let i = 0; i < array.length; i += chunkSize) {
    yield array.slice(i, i + chunkSize);
  }
}

// src/array/remove.duplicates.ts
function removeDuplicates(iter, key) {
  return [...noDuplicates(iter, key)];
}
function* walkBackString(str, offset = 0) {
  for (let i = str.length - offset; i > 0; --i) {
    yield str.substring(0, i);
  }
}
function* noDuplicates(iter, key) {
  const seen = /* @__PURE__ */ new Set();
  for (const elem of iter) {
    const hashable = key ? key(elem) : elem;
    if (seen.has(hashable)) {
      continue;
    }
    seen.add(hashable);
    yield elem;
  }
}
function filterMap(iter, condition) {
  const result = [];
  let index = 0;
  for (const elem of iter) {
    if (condition(elem, index, iter)) {
      result.push(elem);
    }
    ++index;
  }
  return result;
}
function findAllCommonPrefixes(stringsA) {
  if (stringsA.length <= 1) {
    return stringsA;
  }
  const prefixes = /* @__PURE__ */ new Set();
  const matched = /* @__PURE__ */ new Set();
  const seen = [];
  for (const parent of noDuplicates(stringsA)) {
    if (seen.length !== 2) {
      seen.push(parent);
    }
    const before = prefixes.size;
    for (const substr of walkBackString(parent, 0)) {
      for (const child of stringsA) {
        if (!matched.has(child) && parent !== child && child.startsWith(substr)) {
          matched.add(child);
          prefixes.add(substr);
          break;
        }
      }
      if (before !== prefixes.size) {
        break;
      }
    }
  }
  if (seen.length === 1) {
    return seen;
  }
  return filterMap(prefixes, (value, index1, array) => {
    let index2 = 0;
    for (const val of array) {
      if (index1 !== index2 && value.startsWith(val)) {
        return false;
      }
      ++index2;
    }
    return true;
  });
}

// src/array/index.ts
var array_default = {
  ...sorted_exports,
  chunkArray,
  noDuplicates,
  walkBackString,
  findAllCommonPrefixes,
  removeDuplicates,
  zip
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
  if (!str1?.length || !str2?.length) {
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
var topSimilar = (value, values, key, topK = 5, thresh = 0.35, gramSize = 2) => {
  const str1 = key(value);
  if (topK <= 0) {
    topK = 5;
  }
  const keysim = /* @__PURE__ */ new Map();
  const arr = new ReverseSortedArray((x) => {
    const v = key(x);
    const cachedScore = keysim.get(v);
    const score = cachedScore || similarity(str1, v, gramSize);
    if (cachedScore === void 0) {
      keysim.set(v, score);
    }
    return score;
  });
  values.forEach((x) => {
    const score = similarity(str1, key(x), gramSize);
    if (score >= thresh) {
      arr.push(x);
      if (arr.length > topK) {
        const popped = arr.pop();
        if (popped) {
          keysim.delete(key(popped));
        }
      }
    }
  });
  return [...arr];
};
var fuzzy_default = {
  similarity,
  topSimilar
};

// src/utils/index.ts
function hashCode(str, coerceToString = true) {
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
          str = jsonString.replace(/"\[Circular]"/g, () => {
            return JSON.stringify("[Circular]");
          });
        }
      }
      if (!check_default.isString(str) && str?.toString) {
        str = str.toString();
      }
    }
  }
  if (!check_default.isString(str)) {
    return null;
  }
  let hsh = 0;
  for (let i = 0; i < str.length; ++i) {
    const code = str.charCodeAt(i);
    hsh = (hsh << 5) - hsh + code;
    hsh &= hsh;
  }
  return hsh;
}
function capitalize(str) {
  if (!check_default.isString(str)) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
async function retry(operation, maxRetries, delay) {
  return new Promise((resolve, reject) => {
    let retries = 0;
    function attempt() {
      operation().then(resolve).catch((error) => {
        retries += 1;
        if (retries < maxRetries) {
          setTimeout(attempt, delay);
        } else {
          reject(error);
        }
      });
    }
    attempt();
  });
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var isPrime = (() => {
  const LITERAL_ONE = "1";
  const EMPTY_STR = "";
  const PROG = /^1?$|^(11+?)\1+$/;
  function isPrimeInner(num) {
    const ones = EMPTY_STR.padEnd(num, LITERAL_ONE);
    return !PROG.test(ones);
  }
  return isPrimeInner;
})();
var utils_default = {
  hashCode,
  isPrime,
  capitalize,
  retry,
  sleep
  // uuid,
  // randomString,
  // hash,
};

// src/inflection/index.ts
var PLURALS = [
  [/(quiz)$/i, "$1zes"],
  [/^(oxen)$/i, "$1"],
  [/^(ox)$/i, "$1en"],
  [/([ml])ice$/i, "$1ice"],
  [/([ml])ouse$/i, "$1ice"],
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
  [/([ml])ice$/i, "$1ouse"],
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
  if (singular[0].toUpperCase() === plural[0].toUpperCase()) {
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
var camelize = (str, uppercaseFirstLetter = true) => {
  const camelCase = dasherize(str).replace(/-/, " ").replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, "");
  return uppercaseFirstLetter ? camelCase.charAt(0).toUpperCase() + camelCase.slice(1) : camelCase;
};
var dasherize = (word) => {
  return word.replace(/_/g, "-");
};
var humanize = (word) => {
  word = word.replace(/_id$/i, "");
  word = word.replace(/_/g, " ");
  word = word.replace(/([a-z\d]*)/g, (m) => {
    return m.toLowerCase();
  });
  word = word.replace(/^\w/, (m) => {
    return m.toUpperCase();
  });
  return word;
};
var ordinal = (num) => {
  num = typeof num === "number" ? num : parseInt(num, 10);
  const n = Math.abs(num);
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
};
var ordinalize = (num) => {
  return num.toString() + ordinal(num);
};
var parameterize = (str, separator = "-") => {
  const cleaned = transliterate(str);
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
var titleize = (word) => {
  return humanize(underscore(word)).split(/\s+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
};
var transliterate = (str) => {
  const normalized = str.normalize("NFKD");
  return normalized.replace(/[\u0300-\u036f]/g, "").replace(/[^\x00-\x7F]/g, "").trim();
};
var underscore = (word) => {
  let underscored = word.replace(/([a-z\d])([A-Z])/g, "$1_$2");
  underscored = underscored.replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2");
  underscored = underscored.replace(/-/g, "_");
  return underscored.toLowerCase();
};
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

// src/template/eval.ts
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
    if (this.src.length === 0) {
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
      const tok = this.src.slice(0, strEnd + 1);
      this.src = this.src.slice(strEnd + 1);
      this.hist.push(tok);
      return tok;
    }
    if (isTokenBreak(this.src[0])) {
      const tok = this.src[0];
      this.src = this.src.slice(1);
      this.hist.push(tok);
      return tok;
    }
    for (let i = 0; i < this.src.length; ++i) {
      if (isTokenBreak(this.src[i]) || this.src[i] === " ") {
        const tok = this.src.slice(0, i);
        this.src = this.src.slice(i);
        this.hist.push(tok);
        return tok;
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
        while (nextToken === ",") {
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
    if (opToken in BINARY_OPS && BINARY_OPS[opToken].prec === prec) {
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
  function warningsPush(message) {
    warnings.push({
      timestamp: /* @__PURE__ */ new Date(),
      message
    });
  }
  const recommend = (ctxKey, value) => {
    return fuzzy_default.topSimilar(
      value,
      [...Object.keys(ctx[ctxKey] || {})],
      (x) => x,
      5
    ).map((str) => {
      return str.replace(
        /[\u00A0-\u9999<>&]/g,
        (i) => "&#" + i.charCodeAt(0) + ";"
      );
    });
  };
  const singularOrPlural = (word, count) => {
    return count > 1 ? inflection_default.pluralize(word) : inflection_default.singularize(word);
  };
  switch (expr.kind) {
    case "symbol": {
      const symbol = expr.payload;
      const value = symbol.value;
      const num = Number(value);
      if (isNaN(num)) {
        if (ctx.vars && value && value in ctx.vars) {
          return ctx.vars[value];
        }
        if (value?.startsWith("$") && !/^\$\d/.test(value)) {
          const similarNames = recommend("vars", value);
          const typeName = singularOrPlural("variable", similarNames.length);
          const areIs = similarNames.length > 1 ? "are" : "is";
          const recommendations = ` The most similar ${typeName} ${areIs} ${similarNames.join(", ")}`;
          warningsPush("Unknown variable '" + value + "'." + (similarNames.length > 0 ? recommendations : ""));
          if (value in (ctx.funcs || {})) {
            warningsPush("'" + value + "' is defined as a function.");
          }
        }
        return value;
      } else {
        return num;
      }
    }
    case "unary_op": {
      const unaryOp = expr.payload;
      const op = unaryOp?.op;
      const operand = unaryOp?.operand;
      if (op && op in UNARY_OPS) {
        if (operand === void 0) {
          throw new Error("operand needs to be an object not undefined");
        }
        return UNARY_OPS[op](runExpr(operand, ctx));
      }
      throw new Error("Unknown unary operator '" + unaryOp.op + "'");
    }
    case "binary_op": {
      const binaryOp = expr.payload;
      const op = binaryOp?.op;
      const lhs = binaryOp?.lhs;
      const rhs = binaryOp?.rhs;
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
      if (name?.startsWith("$") && !/^\$\d/.test(name)) {
        const similarNames = recommend("funcs", name);
        const typeName = singularOrPlural("function", similarNames.length);
        const areIs = similarNames.length > 1 ? "are" : "is";
        const recommendations = ` The most similar ${typeName} ${areIs} ${similarNames.join(", ")}`;
        warningsPush("Unknown function '" + name + "'." + (similarNames.length > 0 ? recommendations : ""));
        if (name in (ctx.vars || {})) {
          warningsPush("'" + name + "' is defined as a variable.");
        }
      }
      const params = args?.map((x) => x?.payload?.value).map((x) => check_default.isObject(x) ? JSON.stringify(x) : x).join(", ");
      return `${name}(${params || ""})`;
    }
    default: {
      throw new Error("Unexpected AST node '" + expr.kind + "'");
    }
  }
};

// src/template/index.ts
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
var wrapCtxFuncs = (mutCtx) => {
  const _f = mutCtx?.funcs;
  if (_f && check_default.isObject(_f)) {
    const f = { ..._f };
    const updated = {};
    Object.keys(f).forEach((k) => {
      updated[k] = (...args) => {
        args = args.map(fixString);
        return f[k](...args);
      };
    });
    mutCtx.funcs = updated;
  }
  return mutCtx;
};
var parseTemplate = (sentence, _ctx = {}) => {
  const logs = [];
  const result = sentence.split("\n").map((line, index) => {
    try {
      const parsed = _parseTemplate(line, _ctx);
      logs.push(...parsed.warnings.map((wranMeta) => ({
        lineNumber: index + 1,
        level: "WARN",
        ...wranMeta
      })));
      return parsed.result;
    } catch (error) {
      if (error.message.toLowerCase().startsWith("no primary expression starts with ')'") || error.message.startsWith("Expected ')' but got '")) {
        const modded = line.replace(/(\W)\(([^)]+)\)/g, "$1 <parentheses> $2 </parentheses>");
        try {
          const parsed = _parseTemplate(modded, _ctx);
          logs.push(...parsed.warnings.map((wranMeta) => ({
            lineNumber: index + 1,
            level: "WARN",
            ...wranMeta
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
      if (!message) {
        message = `${error}`;
      }
      logs.push({
        lineNumber: index + 1,
        level: "ERROR",
        message,
        error,
        timestamp: /* @__PURE__ */ new Date()
      });
    }
    return line;
  }).join("\n");
  return {
    result,
    logs
  };
};
var _parseTemplate = (sentence, _ctx = {}) => {
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
    const isVar = lex.lastToken()?.startsWith("$");
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
var TemplateParser = class {
  constructor(options = {
    includeBuiltIns: true
  }, ctx = {}, logs = []) {
    this.options = options;
    this.ctx = ctx;
    this.logs = logs;
    if (this.options.includeBuiltIns) {
      this.ctx.funcs = {
        ...this.builtinFunctions(),
        ...this.ctx.funcs || {}
      };
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
      if (check_default.isValidBoolean(x)) {
        return check_default.isTrue(x);
      }
      return !!x && $isset(x);
    };
    const $float = (x) => parseFloat(x);
    const $str = (x) => {
      if ($isnil(x)) {
        return `${x}`;
      }
      if (check_default.isObject(x)) {
        try {
          x = JSON.stringify(x);
        } catch (ignored) {
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
          x = jsonString.replace(/"\[Circular]"/g, () => {
            return JSON.stringify("[Circular]");
          });
        }
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
        this.logs.push({
          level: "ERROR",
          error,
          message: error.message || `${error}`,
          lineNumber: NaN,
          timestamp: /* @__PURE__ */ new Date()
        });
      }
      const argv = args.join(", ");
      this.logs.push({
        level: "WARN",
        lineNumber: NaN,
        message: `Couldn't resolve Math.${key}${!argv ? "" : "(" + argv + ")"}`,
        timestamp: /* @__PURE__ */ new Date()
      });
      return `$math('${key}'${!argv ? "" : ", " + argv})`;
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
};
var _lvalParseString = (str) => {
  if (check_default.isNumeric(str)) {
    return parseFloat(str);
  } else if (check_default.isValidBoolean(str)) {
    return check_default.isTrue(str);
  } else if (date_default.parse(str) !== null) {
    return new Date(str);
  } else if (str === "undefined") {
    return void 0;
  } else if (str === "null") {
    return null;
  }
  try {
    return JSON.parse(str);
  } catch (err) {
    return str;
  }
};
var lval = (sentence, ctx) => {
  const r = parseTemplate(sentence, ctx || {});
  const expr = _lvalParseString(r.result);
  return {
    result: expr,
    logs: r.logs
  };
};
var ignoreThisBuiltins = new TemplateParser({ includeBuiltIns: false }).builtinFunctions;
var template_default = {
  /** @deprecated change `SentenceParser` to `TemplateParser`  */
  SentenceParser: TemplateParser,
  TemplateParser,
  lval
};

// src/nlp/stopWords.ts
var stopWords = (() => {
  const STOP_WORDS = {
    english: /* @__PURE__ */ new Set([
      // Source: NLTK(https://www.nltk.org/howto/collocations.html?highlight=stopwords)
      "a",
      "about",
      "above",
      "after",
      "again",
      "against",
      "ain",
      "all",
      "am",
      "an",
      "and",
      "any",
      "are",
      "aren",
      "aren't",
      "as",
      "at",
      "be",
      "because",
      "been",
      "before",
      "being",
      "below",
      "between",
      "both",
      "but",
      "by",
      "can",
      "couldn",
      "couldn't",
      "d",
      "did",
      "didn",
      "didn't",
      "do",
      "does",
      "doesn",
      "doesn't",
      "doing",
      "don",
      "don't",
      "down",
      "during",
      "each",
      "few",
      "for",
      "from",
      "further",
      "had",
      "hadn",
      "hadn't",
      "has",
      "hasn",
      "hasn't",
      "have",
      "haven",
      "haven't",
      "having",
      "he",
      "her",
      "here",
      "hers",
      "herself",
      "him",
      "himself",
      "his",
      "how",
      "i",
      "if",
      "in",
      "into",
      "is",
      "isn",
      "isn't",
      "it",
      "it's",
      "its",
      "itself",
      "just",
      "ll",
      "m",
      "ma",
      "me",
      "mightn",
      "mightn't",
      "more",
      "most",
      "mustn",
      "mustn't",
      "my",
      "myself",
      "needn",
      "needn't",
      "no",
      "nor",
      "not",
      "now",
      "o",
      "of",
      "off",
      "on",
      "once",
      "only",
      "or",
      "other",
      "our",
      "ours",
      "ourselves",
      "out",
      "over",
      "own",
      "re",
      "s",
      "same",
      "shan",
      "shan't",
      "she",
      "she's",
      "should",
      "should've",
      "shouldn",
      "shouldn't",
      "so",
      "some",
      "such",
      "t",
      "than",
      "that",
      "that'll",
      "the",
      "their",
      "theirs",
      "them",
      "themselves",
      "then",
      "there",
      "these",
      "they",
      "this",
      "those",
      "through",
      "to",
      "too",
      "under",
      "until",
      "up",
      "ve",
      "very",
      "was",
      "wasn",
      "wasn't",
      "we",
      "were",
      "weren",
      "weren't",
      "what",
      "when",
      "where",
      "which",
      "while",
      "who",
      "whom",
      "why",
      "will",
      "with",
      "won",
      "won't",
      "wouldn",
      "wouldn't",
      "y",
      "you",
      "you'd",
      "you'll",
      "you're",
      "you've",
      "your",
      "yours",
      "yourself",
      "yourselves"
    ])
  };
  function isStopWord(word, lang = "english") {
    return STOP_WORDS[lang].has(word.replace(/[^\w\d']/gi, "").toLowerCase());
  }
  function removeStopWords(input, lang = "english") {
    const tokens = input.trim().split(/\s+/g);
    const result = tokens.filter((word) => !isStopWord(word, lang));
    return result.join(" ");
  }
  return {
    isStopWord,
    removeStopWords
  };
})();
var stopWords_default = stopWords;

// src/nlp/stemmer.ts
function stemmerOuter() {
  const step2list = {
    "ational": "ate",
    "tional": "tion",
    "enci": "ence",
    "anci": "ance",
    "izer": "ize",
    "bli": "ble",
    "alli": "al",
    "entli": "ent",
    "eli": "e",
    "ousli": "ous",
    "ization": "ize",
    "ation": "ate",
    "ator": "ate",
    "alism": "al",
    "iveness": "ive",
    "fulness": "ful",
    "ousness": "ous",
    "aliti": "al",
    "iviti": "ive",
    "biliti": "ble",
    "logi": "log"
  };
  const step3list = {
    "icate": "ic",
    "ative": "",
    "alize": "al",
    "iciti": "ic",
    "ical": "ic",
    "ful": "",
    "ness": ""
  };
  const consonant = "[^aeiou]";
  const vowel = "[aeiouy]";
  const consonantSeq = consonant + "[^aeiouy]*";
  const vowelSeq = vowel + "[aeiou]*";
  const mgr0 = "^(" + consonantSeq + ")?" + vowelSeq + consonantSeq;
  const meq1 = "^(" + consonantSeq + ")?" + vowelSeq + consonantSeq + "(" + vowelSeq + ")?$";
  const mgr1 = "^(" + consonantSeq + ")?" + vowelSeq + consonantSeq + vowelSeq + consonantSeq;
  const sV = "^(" + consonantSeq + ")?" + vowel;
  function execIt(prog, word) {
    return prog.exec(word);
  }
  function testIt(prog, word) {
    return prog.test(word);
  }
  function innerStemmer(word) {
    let stem;
    let suffix;
    let re;
    let re2;
    let re3;
    let re4;
    if (word.length < 3) {
      return word;
    }
    const wordRef = word.slice();
    const firstChar = word.substring(0, 1);
    if (firstChar === "y") {
      word = firstChar.toUpperCase() + word.substring(1);
    }
    re = /^(.+?)(ss|i)es?$/;
    re2 = /^(.+?)([^s])s$/;
    if (testIt(re, word)) {
      re3 = /ies$/;
      if (testIt(re3, word)) {
        word = word.replace(re, "$1y");
      } else {
        word = word.replace(re, "$1$2");
      }
    } else if (testIt(re2, word)) {
      word = word.replace(re2, "$1$2");
    }
    re = /^(.+?)eed$/;
    re2 = /^(.+?)(ed|ing)$/;
    re3 = /^(.+?)(ly)$/;
    re4 = /^(.+?)([^s]*s)$/;
    if (testIt(re, word)) {
      const fp = execIt(re, word);
      if (fp) {
        re = new RegExp(mgr0);
        if (testIt(re, fp[1])) {
          re = /.$/;
          word = word.replace(re, "");
        }
      }
    } else if (testIt(re2, word)) {
      const fp = execIt(re2, word);
      if (fp) {
        stem = fp[1];
        re2 = new RegExp(sV);
        if (testIt(re2, stem)) {
          word = stem;
          re2 = /(at|bl|iz)$/;
          re3 = new RegExp("([^aeiouylsz])\\1$");
          re4 = new RegExp("^" + consonantSeq + vowel + "[^aeiouwxy]$");
          if (testIt(re2, word)) {
            word = word + "e";
          } else if (testIt(re3, word)) {
            re = /.$/;
            word = word.replace(re, "");
          } else if (testIt(re4, word)) {
            word = word + "e";
          }
        }
      }
    } else if (testIt(re3, word)) {
      const fp = execIt(re3, word);
      if (fp) {
        stem = fp[1];
        re = new RegExp(sV);
        if (testIt(re, stem)) {
          word = stem;
        }
      }
    }
    re = /^(.+?)y$/;
    re2 = /(yed|ies)$/;
    if (testIt(re, word) && !testIt(re2, wordRef)) {
      const fp = execIt(re, word);
      if (fp) {
        stem = fp[1];
        re = new RegExp(sV);
        if (testIt(re, stem)) {
          word = stem + "i";
        }
      }
    }
    re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
    if (testIt(re, word)) {
      const fp = execIt(re, word);
      if (fp) {
        stem = fp[1];
        suffix = fp[2];
        re = new RegExp(mgr0);
        if (testIt(re, stem)) {
          word = stem + step2list[suffix];
        }
      }
    }
    re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
    if (testIt(re, word)) {
      const fp = execIt(re, word);
      if (fp) {
        stem = fp[1];
        suffix = fp[2];
        re = new RegExp(mgr0);
        if (testIt(re, stem)) {
          word = stem + step3list[suffix];
        }
      }
    }
    re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
    re2 = /^(.+?)([st])(ion)$/;
    if (testIt(re, word)) {
      const fp = execIt(re, word);
      if (fp) {
        stem = fp[1];
        re = new RegExp(mgr1);
        if (testIt(re, stem)) {
          word = stem;
        }
      }
    } else if (testIt(re2, word)) {
      const fp = execIt(re2, word);
      if (fp) {
        stem = fp[1] + fp[2];
        re2 = new RegExp(mgr1);
        if (testIt(re2, stem)) {
          word = stem;
        }
      }
    }
    re = /^(.+?)e$/;
    if (testIt(re, word)) {
      const fp = execIt(re, word);
      if (fp) {
        stem = fp[1];
        re = new RegExp(mgr1);
        re2 = new RegExp(meq1);
        re3 = new RegExp("^" + consonantSeq + vowel + "[^aeiouwxy]$");
        if (testIt(re, stem) || testIt(re2, stem) && !testIt(re3, stem)) {
          word = stem;
        }
      }
    }
    re = /ll$/;
    re2 = new RegExp(mgr1);
    if (testIt(re, word) && testIt(re2, word)) {
      re = /.$/;
      word = word.replace(re, "");
    }
    if (firstChar === "y") {
      word = "y" + word.substring(1);
    }
    return word;
  }
  return innerStemmer;
}
var stemmer_default = stemmerOuter();

// src/nlp/index.ts
var PART_OF_SPEECH_MAP = {
  "CC": {
    "title": "Coordinating conjunction",
    "description": "A word that connects words, phrases, or clauses of equal rank.",
    "examples": ["and", "but", "or"]
  },
  "CD": {
    "title": "Cardinal number",
    "description": "A word that denotes quantity.",
    "examples": ["one", "two", "three"]
  },
  "DT": {
    "title": "Determiner",
    "description": "A word that introduces a noun and specifies it as known or unknown, and often specifies quantity.",
    "examples": ["a", "an", "the"]
  },
  "EX": {
    "title": "Existential there",
    "description": "A word used to introduce a sentence in which the existence of something is asserted.",
    "examples": ["There"]
  },
  "FW": {
    "title": "Foreign word",
    "description": "A word or phrase that is not native to the language but used in certain contexts.",
    "examples": ["rendezvous", "hacienda", "sushi"]
  },
  "IN": {
    "title": "Preposition or subordinating conjunction",
    "description": "A word that relates the noun or pronoun to another word in the sentence or introduces a subordinate clause.",
    "examples": ["in", "on", "because"]
  },
  "JJ": {
    "title": "Adjective",
    "description": "A word that describes or modifies a noun or pronoun.",
    "examples": ["happy", "green", "loud"]
  },
  "JJR": {
    "title": "Adjective, comparative",
    "description": "An adjective that compares two things.",
    "examples": ["happier", "greener", "louder"]
  },
  "JJS": {
    "title": "Adjective, superlative",
    "description": "An adjective that describes the highest degree of something.",
    "examples": ["happiest", "greenest", "loudest"]
  },
  "LS": {
    "title": "List item marker",
    "description": "A word or symbol that denotes an item in a list.",
    "examples": ["1.", "a)", "*"]
  },
  "MD": {
    "title": "Modal",
    "description": "A verb that is used with another verb to express necessity, possibility, intention, or ability.",
    "examples": ["can", "will", "must"]
  },
  "NN": {
    "title": "Noun, singular or mass",
    "description": "A word that represents a person, place, thing, or idea.",
    "examples": ["cat", "city", "love"]
  },
  "NNS": {
    "title": "Noun, plural",
    "description": "A word that represents multiple persons, places, or things.",
    "examples": ["cats", "cities", "loves"]
  },
  "NNP": {
    "title": "Proper noun, singular",
    "description": "A name used for an individual person, place, or organization, spelled with an initial capital letter.",
    "examples": ["Alice", "Paris", "Apple"]
  },
  "NNPS": {
    "title": "Proper noun, plural",
    "description": "Names used for a specific group of people, places, or things, spelled with an initial capital letter.",
    "examples": ["Americans", "Alps", "Aristotles"]
  },
  "PDT": {
    "title": "Predeterminer",
    "description": "A word that is placed before a determiner to modify the noun that follows.",
    "examples": ["all", "both", "half"]
  },
  "POS": {
    "title": "Possessive ending",
    "description": "A suffix added to nouns to indicate possession.",
    "examples": ["'s", "'"]
  },
  "PRP": {
    "title": "Personal pronoun",
    "description": "A word that substitutes for a noun or noun phrase and represents people or things.",
    "examples": ["I", "you", "he", "she", "it"]
  },
  "PRP$": {
    "title": "Possessive pronoun",
    "description": "A pronoun that shows ownership.",
    "examples": ["my", "your", "his", "her", "its"]
  },
  "RB": {
    "title": "Adverb",
    "description": "A word that modifies verbs, adjectives, or other adverbs, expressing manner, place, time, or degree.",
    "examples": ["quickly", "there", "very"]
  },
  "RBR": {
    "title": "Adverb, comparative",
    "description": "An adverb that compares two actions.",
    "examples": ["quicker", "more quickly", "less quickly"]
  },
  "RBS": {
    "title": "Adverb, superlative",
    "description": "An adverb that describes the highest degree of an action.",
    "examples": ["quickest", "most quickly"]
  },
  "RP": {
    "title": "Particle",
    "description": "A word that is used with verbs to create phrasal verbs.",
    "examples": ["up", "out", "on"]
  },
  "SYM": {
    "title": "Symbol",
    "description": "A character used as a conventional representation of an object, function, or process.",
    "examples": ["&", "%", "$"]
  },
  "TO": {
    "title": "Preposition/Infinitival to",
    "description": "A preposition or a part of an infinitive verb.",
    "examples": ["to the store", "to run"]
  },
  "UH": {
    "title": "Interjection",
    "description": "An exclamation, especially as a part of speech, e.g., ah! or dear me!.",
    "examples": ["oh", "wow", "uh"]
  },
  "VB": {
    "title": "Verb, base form",
    "description": "The basic form of a verb from which other forms are derived.",
    "examples": ["be", "have", "do"]
  },
  "VBD": {
    "title": "Verb, past tense",
    "description": "A verb form that indicates actions or states in the past.",
    "examples": ["was", "had", "did"]
  },
  "VBG": {
    "title": "Verb, gerund or present participle",
    "description": "A verb form that ends in -ing and functions as a noun or modifies nouns.",
    "examples": ["running", "having", "doing"]
  },
  "VBN": {
    "title": "Verb, past participle",
    "description": "A verb form that typically ends in -ed or -en and is used to form passive verb tenses or adjectives.",
    "examples": ["eaten", "written", "done"]
  },
  "VBP": {
    "title": "Verb, non-3rd person singular present",
    "description": "A verb form that does not agree with third-person singular subjects in the present tense.",
    "examples": ["am", "have", "run"]
  },
  "VBZ": {
    "title": "Verb, 3rd person singular present",
    "description": "A verb form that agrees with third-person singular subjects in the present tense.",
    "examples": ["is", "has", "runs"]
  },
  "WDT": {
    "title": "Wh-determiner",
    "description": "A determiner that introduces a relative clause, typically referring back to something previously mentioned.",
    "examples": ["which", "that", "what"]
  },
  "WP": {
    "title": "Wh-pronoun",
    "description": "A pronoun that introduces a relative clause, referring back to something previously mentioned.",
    "examples": ["who", "whom", "whose"]
  },
  "WP$": {
    "title": "Possessive wh-pronoun",
    "description": "A pronoun that shows ownership and introduces a relative clause.",
    "examples": ["whose"]
  },
  "WRB": {
    "title": "Wh-adverb",
    "description": "An adverb that introduces a question or relative clause.",
    "examples": ["where", "when", "why"]
  }
};
Object.seal(PART_OF_SPEECH_MAP);
Object.freeze(PART_OF_SPEECH_MAP);
var nlp_default = {
  ...stopWords_default,
  stemmer: stemmer_default,
  PART_OF_SPEECH_MAP
};

// src/index.ts
var src_default = {
  check: check_default,
  /**
   * @deprecated change `parser` to `template`
   */
  parser: template_default,
  template: template_default,
  inflection: inflection_default,
  utils: utils_default,
  date: date_default,
  fuzzy: fuzzy_default,
  array: array_default,
  diff: diff_default,
  nlp: nlp_default,
  ...types_exports
};
//# sourceMappingURL=clasico-utils.js.map
