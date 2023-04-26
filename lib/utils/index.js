"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("../check");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hashCode = (str, coerceToString = true) => {
    if (coerceToString) {
        if (!check_1.default.isString(str)) {
            if (check_1.default.isSet(str)) {
                str = Array.from(str);
            }
            if (check_1.default.isObject(str)) {
                try {
                    str = JSON.stringify(str);
                    // eslint-disable-next-line no-empty
                }
                catch (ignored) { }
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
