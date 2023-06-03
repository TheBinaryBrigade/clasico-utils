"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = void 0;
function* zip(...args) {
    const min = args.reduce((acc, curr) => {
        const len = curr.length;
        if (len < acc) {
            return len;
        }
        return acc;
    }, Infinity);
    for (let i = 0; i < min; ++i) {
        yield args.map((arr) => arr[i]);
    }
}
exports.zip = zip;
