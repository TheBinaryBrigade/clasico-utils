/* eslint-disable @typescript-eslint/no-explicit-any */

const isNumber = (x: any) => {
  return (
    typeof x === "number"
        || typeof x === "bigint"
        || x instanceof Number
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
  );
};

const isFunction = (x: any) => {
  return (
    typeof x === "function"
        || x instanceof Function
  );
};

const isObject = (x: any) => {
  return (
    typeof x === "object"
        || x instanceof Object
  );
};

const isArray = (x: any) => {
  return Array.isArray(x);
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

// Boolean input

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
    ];

    if (alts.includes(x)) {
      return true;
    }

    if (isStr) {
      const len = Math.max(...alts.map((x) => x.toString().length));
      if (x.length <= len && alts.includes(x.toLowerCase())) {
        return true;
      }
    }
  }

  return false;
};

const isTrue = (x: any) => {
  if (isValidBoolean(x)) {
    const alts = [
      true,
      "true",
      "1",
      1,
    ];

    if (alts.includes(x)) {
      return true;
    }

    if (isString(x)) {
      const len = Math.max(...alts.map((x) => x.toString().length));
      if (x.length <= len && alts.includes(x.toLowerCase())) {
        return true;
      }
    }
  }

  return false;
};

const isFalse = (x: any) => !isTrue(x);

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
};
