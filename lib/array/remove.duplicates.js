"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllCommonPrefixes = exports.noDuplicates = exports.walkBackString = exports.removeDuplicates = void 0;
function removeDuplicates(iter, key) {
    return [...noDuplicates(iter, key)];
}
exports.removeDuplicates = removeDuplicates;
function* walkBackString(str, offset = 0) {
    for (let i = str.length - offset; i > 0; --i) {
        yield str.substring(0, i);
    }
}
exports.walkBackString = walkBackString;
function* noDuplicates(iter, key) {
    const seen = new Set();
    for (const elem of iter) {
        const hashable = key ? key(elem) : elem;
        if (seen.has(hashable)) {
            continue;
        }
        seen.add(hashable);
        yield elem;
    }
}
exports.noDuplicates = noDuplicates;
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
    const prefixes = new Set();
    const matched = new Set();
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
    // Edge case
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
exports.findAllCommonPrefixes = findAllCommonPrefixes;
