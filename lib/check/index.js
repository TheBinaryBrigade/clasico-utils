"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_1 = require("../date");
const isNumber = (x) => {
    return (typeof x === "number"
        || x instanceof Number
        || typeof x === "bigint"
        || x instanceof BigInt);
};
const isString = (x) => {
    return (typeof x === "string"
        || x instanceof String);
};
const isBoolean = (x) => {
    return (typeof x === "boolean"
        || x instanceof Boolean);
};
// eslint-disable-next-line @typescript-eslint/ban-types
const isFunction = (x) => {
    return (typeof x === "function"
        || x instanceof Function);
};
const isObject = (x) => {
    if (isNil(x)) {
        return false;
    }
    return typeof x === "object";
};
const isNil = (x) => {
    return x === null || x === undefined;
};
const isArray = (x) => {
    return (Array.isArray(x)
        || x instanceof Array
        || Object.prototype.toString.call(x) === "[object Array]");
};
const isSet = (x) => {
    return (x instanceof Set
        || Object.prototype.toString.call(x) === "[object Set]");
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isIterable = (x) => {
    // checks for null and undefined
    if (isNil(x)) {
        return false;
    }
    return isFunction(x[Symbol.iterator]);
};
const isNumeric = (x) => {
    if (isNumber(x)) {
        return true;
    }
    if (!isString(x)) {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return !isNaN(x) && !isNaN(parseFloat(x));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidBoolean = (x) => {
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
const valueOf = (x) => {
    if (x instanceof Boolean
        || x instanceof Number
        || x instanceof String
        || x instanceof BigInt
        || x instanceof Symbol) {
        if (x.valueOf && isFunction(x.valueOf)) {
            return x.valueOf();
        }
    }
    return x;
};
const isTrue = (x) => {
    const valueOfX = valueOf(x);
    if (x === true || valueOfX === true) {
        return true;
    }
    if (isValidBoolean(x)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const alts = [
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
            const y = x.trim();
            const len = Math.max(...alts.map((x) => x.toString().length));
            if (y.length <= len && alts.includes(y.toLowerCase())) {
                return true;
            }
        }
    }
    return false;
};
const isFalse = (x) => {
    if (x === false || valueOf(x) === false) {
        return true;
    }
    if (isValidBoolean(x)) {
        return !isTrue(x);
    }
    return false;
};
const isDate = (x) => {
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
    const y = date_1.default.parse(x);
    return !!y;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isError = (x, errorLike = false) => {
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
exports.default = {
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
    isError,
};
