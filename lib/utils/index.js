"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const check_1 = require("../check");
const hashCode = (str, coerceToString = true) => {
    if (coerceToString) {
        if (!check_1.default.isString(str)) {
            if (check_1.default.isSet(str)) {
                str = Array.from(str);
            }
            if (check_1.default.isObject(str)) {
                try {
                    str = JSON.stringify(str);
                }
                catch (ignored) {
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
                    // Replace circular references with actual object reference
                    str = jsonString.replace(/"\[Circular\]"/g, () => {
                        return JSON.stringify("[Circular]");
                    });
                }
            }
            if (!check_1.default.isString(str) && str.toString) {
                str = str.toString();
            }
        }
    }
    if (!check_1.default.isString(str)) {
        return null;
    }
    let hash = 0;
    for (let i = 0; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + code;
        hash &= hash;
    }
    return hash;
};
const capitalize = (str) => {
    if (!check_1.default.isString(str)) {
        return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.default = {
    hashCode,
    capitalize,
};
