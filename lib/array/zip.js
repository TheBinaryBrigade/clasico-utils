"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = exports.chunkArray = exports.zip = void 0;
const check_1 = require("../check");
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
function* chunkArray(array, chunkSize) {
    for (let i = 0; i < array.length; i += chunkSize) {
        yield array.slice(i, i + chunkSize);
    }
}
exports.chunkArray = chunkArray;
function* range(props) {
    const stop = props.stop;
    let start = props.start || 0;
    let step = props.step || 1;
    if (check_1.default.isNil(start) || !check_1.default.isNumber(start) || isNaN(start)) {
        start = 0;
    }
    if (check_1.default.isNil(step) || !check_1.default.isNumber(step) || isNaN(step)) {
        step = 1;
    }
    if (step <= 0) {
        step = 1;
    }
    for (let i = start; i < stop; i += step) {
        yield i;
    }
}
exports.range = range;
