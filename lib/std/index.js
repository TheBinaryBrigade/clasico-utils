"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = exports.Option = void 0;
const check_1 = require("../check");
const isError = (x) => {
    return check_1.default.isError(x, /*error like = */ false);
};
class Option {
}
exports.Option = Option;
class Result {
    constructor(fn, result, error, ran = false) {
        this.fn = fn;
        this.result = result;
        this.error = error;
        this.ran = ran;
    }
    match(callbacks) {
        const isErr = this.isErr();
        const isOk = this.isOk();
        if (isOk && this.result !== undefined) {
            callbacks.onOk(this.result);
        }
        else if (isErr && this.error !== undefined) {
            callbacks.onError(this.error);
        }
        else if (callbacks.debug) {
            callbacks.debug(this.result, this.error);
        }
        return [this.result, this.error];
    }
    run(...args) {
        this.ran = true;
        try {
            const result = this.fn(...args);
            if (isError(result)) {
                // SAFETY: Checking if it is an instanceof Error
                this.error = result;
            }
            else {
                this.result = result;
            }
        }
        catch (error) {
            this.error = error;
        }
        return this;
    }
    isErr() {
        if (!this.ran) {
            return null;
        }
        const noError = this.error === undefined;
        const noResult = this.result === undefined;
        if (noResult && noError) {
            return null;
        }
        if (noResult && !noError) {
            return true;
        }
        return false;
    }
    isOk() {
        if (!this.ran) {
            return null;
        }
        const noError = this.error === undefined;
        const noResult = this.result === undefined;
        if (noResult && noError) {
            return null;
        }
        if (noError) {
            return true;
        }
        return false;
    }
}
exports.Result = Result;
// const r = new Result<number, Error>(
//   (a: number, b: number) => {
//     return a + a * b;
//   },
// );
// const [result, error] = r.run(1, 2).match({
//   onOk: (a) => {
//     //
//   },
//   onError: (a) => {
//     //
//   },
// });
