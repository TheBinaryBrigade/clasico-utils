"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortedCompareArray = exports.ReverseCompareArray = exports.SortedStringArray = exports.ReverseStringArray = exports.SortedNumberArray = exports.ReverseNumberArray = exports.SortedArray = exports.ReverseSortedArray = exports.BisectArray = void 0;
const check_1 = require("../check");
class BisectArray extends Array {
    constructor(opts) {
        const items = opts.items;
        super(...items);
        this.opts = opts;
        if (this.isValidCmp()) {
            this.sort(this.opts.cmp);
        }
        else {
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
            }
            else if (this.shouldSwap(item, this[mid])) {
                right = mid - 1;
            }
            else {
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
        return (this.isReversed() ? keyB - keyA <= 0 : keyA - keyB <= 0);
    }
    isValidCmp() {
        return this.opts.cmp && check_1.default.isFunction(this.opts.cmp);
    }
    isReversed() {
        return this.opts.asReversed;
    }
}
exports.BisectArray = BisectArray;
class ReverseSortedArray extends BisectArray {
    constructor(key, ...items) {
        super({ key, asReversed: true, items });
    }
}
exports.ReverseSortedArray = ReverseSortedArray;
class SortedArray extends BisectArray {
    constructor(key, ...items) {
        super({ key, asReversed: false, items });
    }
}
exports.SortedArray = SortedArray;
class ReverseNumberArray extends BisectArray {
    constructor(...items) {
        super({ key: (a) => a, asReversed: true, items });
    }
}
exports.ReverseNumberArray = ReverseNumberArray;
class SortedNumberArray extends BisectArray {
    constructor(...items) {
        super({ key: (a) => a, asReversed: false, items });
    }
}
exports.SortedNumberArray = SortedNumberArray;
class ReverseStringArray extends BisectArray {
    constructor(...items) {
        super({ key: () => 0, cmp: (a, b) => a.localeCompare(b), asReversed: true, items });
    }
}
exports.ReverseStringArray = ReverseStringArray;
class SortedStringArray extends BisectArray {
    constructor(...items) {
        super({ key: () => 0, cmp: (a, b) => a.localeCompare(b), asReversed: true, items });
    }
}
exports.SortedStringArray = SortedStringArray;
class ReverseCompareArray extends BisectArray {
    constructor(cmp, ...items) {
        super({ key: () => 0, cmp, asReversed: true, items });
    }
}
exports.ReverseCompareArray = ReverseCompareArray;
class SortedCompareArray extends BisectArray {
    constructor(cmp, ...items) {
        super({ key: () => 0, cmp, asReversed: true, items });
    }
}
exports.SortedCompareArray = SortedCompareArray;
