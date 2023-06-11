"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const check_1 = require("../check");
function hashCode(str, coerceToString = true) {
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
                    str = jsonString.replace(/"\[Circular]"/g, () => {
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
        // tslint:disable-next-line:no-bitwise
        hash = ((hash << 5) - hash) + code;
        // tslint:disable-next-line:no-bitwise
        hash &= hash;
    }
    return hash;
}
function capitalize(str) {
    if (!check_1.default.isString(str)) {
        return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function retry(operation, maxRetries, delay) {
    return new Promise((resolve, reject) => {
        let retries = 0;
        function attempt() {
            operation()
                .then(resolve)
                .catch(error => {
                retries++;
                if (retries < maxRetries) {
                    setTimeout(attempt, delay);
                }
                else {
                    reject(error);
                }
            });
        }
        attempt();
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.default = {
    hashCode,
    capitalize,
    retry,
    sleep,
};
