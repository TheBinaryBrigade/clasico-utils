
import date from "../date";

const isNumber = (x: unknown): x is number => {
  return (
    typeof x === "number"
    || x instanceof Number
  );
};

const isBigInt = (x: unknown): x is bigint => {
  return (
    typeof x === "bigint"
    || x instanceof BigInt
  );
};

const isString = (x: unknown): x is string => {
  return (
    typeof x === "string"
    || x instanceof String
  );
};

const isBoolean = (x: unknown): x is boolean => {
  return (
    typeof x === "boolean"
    || x instanceof Boolean
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
const isFunction = (x: unknown): x is Function => {
  return (
    typeof x === "function"
    || x instanceof Function
  );
};

const isObject = (x: unknown): x is object => {
  if (isNil(x)) {
    return false;
  }

  return typeof x === "object";
};

const isNil = (x: unknown): x is null | undefined => {
  return x === null || x === undefined;
};

const isArray = (x: unknown): x is unknown[] => {
  return (
    Array.isArray(x)
    || x instanceof Array
    || Object.prototype.toString.call(x) === "[object Array]"
  );
};

const isSet = (x: unknown): x is Set<unknown> => {
  return (
    x instanceof Set
    || Object.prototype.toString.call(x) === "[object Set]"
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isIterable = (x: any): x is Iterable<unknown> => {
  // checks for null and undefined
  if (isNil(x)) {
    return false;
  }
  return isFunction(x[Symbol.iterator]);
};

const isNumeric = (x: unknown): boolean => {
  if (isNumber(x)) {
    return true;
  }
  if (!isString(x)) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return !isNaN(x as any) && !isNaN(parseFloat(x));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidBoolean = (x: any): boolean => {
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
      new Boolean(true),
      new Boolean(false),
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

const valueOf = <T>(x: T): string | number | bigint | boolean | symbol | T => {
  if (
    x instanceof Boolean
    || x instanceof Number
    || x instanceof String
    || x instanceof BigInt
    || x instanceof Symbol
  ) {
    if (x.valueOf && isFunction(x.valueOf)) {
      return x.valueOf();
    }
  }

  return x;
};

const isTrue = (x: unknown): boolean => {
  const valueOfX = valueOf(x);
  if (x === true || valueOfX === true) {
    return true;
  }

  if (isValidBoolean(x)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const alts: any[] = [
      true,
      "true",
      "1",
      1,
      new Boolean(true),
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
      const y = (x as string).trim();
      const len = Math.max(...alts.map((x) => x.toString().length));
      if (y.length <= len && alts.includes(y.toLowerCase())) {
        return true;
      }
    }
  }

  return false;
};

const isFalse = (x: unknown): boolean => {
  if (x === false || valueOf(x) === false) {
    return true;
  }

  if (isValidBoolean(x)) {
    return !isTrue(x);
  }

  return false;
};

const isDate = (x: unknown): boolean => {
  if (isNil(x)) {
    return false;
  }

  if (isString(x) && typeof x === "string") {
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

  const y = date.parse(x);
  return !!y;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isError = (x: any, errorLike = false): x is Error => {
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

// @exports
export default {
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
  isError,
};
