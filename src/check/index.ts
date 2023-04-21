/* eslint-disable @typescript-eslint/no-explicit-any */

const TRUE = new Boolean(true);
const FALSE = new Boolean(false);
const BOOLEANS = [true, TRUE, false, FALSE];

const isNumber = (x: any) => {
  return (
    typeof x === "number"
    || x instanceof Number
    || typeof x === "bigint"
    || x instanceof BigInt
  );
};

const isString = (x: any) => {
  return (
    typeof x === "string"
    || x instanceof String
  );
};

const isBoolean = (x: any) => {
  return (
    typeof x === "boolean"
    || x instanceof Boolean
    || BOOLEANS.includes(x)
  );
};

const isFunction = (x: any) => {
  return (
    typeof x === "function"
    || x instanceof Function
  );
};

const isObject = (x: any) => {
  if (isNil(x)) {
    return false;
  }

  return typeof x === "object";
};

const isNil = (x: any) => {
  return x === null || x === undefined;
};

const isArray = (x: any) => {
  return (
    Array.isArray(x)
    || x instanceof Array
    || Object.prototype.toString.call(x) === "[object Array]"
  );
};

const isSet = (x: any) => {
  return (
    x instanceof Set
    || Object.prototype.toString.call(x) === "[object Set]"
  );
};

const isIterable = (x: any) => {
  // checks for null and undefined
  if (isNil(x)) {
    return false;
  }
  return isFunction(x[Symbol.iterator]);
};

const isNumeric = (x: any) => {
  if (isNumber(x)) {
    return true;
  }
  if (!isString(x)) {
    return false;
  }
  return !isNaN(x) && !isNaN(parseFloat(x));
};

const isValidBoolean = (x: any) => {
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
      false,
    ];

    if (alts.includes(x)) {
      return true;
    }

    if (isStr) {
      x = x.trim();
      const len = Math.max(...alts.map((x) => x.toString().length));
      if (x.length <= len && alts.includes(x.toLowerCase())) {
        return true;
      }
    }
  }

  return false;
};

const isTrue = (x: any) => {
  if (x && x.toString && x.toString() === "true") {
    return true;
  }

  if (isValidBoolean(x)) {
    const alts = [
      true,
      "true",
      "1",
      1,
      TRUE,
    ];

    if (alts.includes(x)) {
      return true;
    }

    if (isString(x)) {
      x = x.trim();
      const len = Math.max(...alts.map((x) => x.toString().length));
      if (x.length <= len && alts.includes(x.toLowerCase())) {
        return true;
      }
    }
  }

  return false;
};

const isFalse = (x: any) => {
  if (x && x.toString && x.toString() === "false") {
    return true;
  }

  if (isValidBoolean(x)) {
    return !isTrue(x);
  }

  return false;
};

// @exports
export default {
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
};
