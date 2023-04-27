"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
const date_1 = require("../date");
const TRUE = new Boolean(true);
const FALSE = new Boolean(false);
const BOOLEANS = [true, TRUE, false, FALSE];
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
        || x instanceof Boolean
        || BOOLEANS.includes(x));
};
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
    return !isNaN(x) && !isNaN(parseFloat(x));
};
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
const isTrue = (x) => {
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
const isFalse = (x) => {
    if (x && x.toString && x.toString() === "false") {
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
    const y = date_1.default.parse(x);
    return !!y;
};
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
