"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runExpr = exports.parseExpr = exports.parsePrimary = exports.Lexer = exports.UNARY_OPS = exports.BINARY_OPS = exports.BIN_PREC = void 0;
const check_1 = require("../check");
const __SAVE = "$B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B";
exports.BIN_PREC = {
    "0": "PREC0",
    "1": "PREC1",
    "2": "COUNT_PRECS",
    "PREC0": 0,
    "PREC1": 1,
    "COUNT_PRECS": 2
};
Object.freeze(exports.BIN_PREC);
Object.seal(exports.BIN_PREC);
exports.BINARY_OPS = {
    "+": {
        func: (lhs, rhs) => {
            if (![lhs, rhs].every(check_1.default.isNumber)) {
                return `${lhs}+${rhs}`;
            }
            return lhs + rhs;
        },
        prec: exports.BIN_PREC.PREC0,
    },
    "-": {
        func: (lhs, rhs) => {
            if (![lhs, rhs].every(check_1.default.isNumber)) {
                return `${lhs}-${rhs}`;
            }
            return lhs - rhs;
        },
        prec: exports.BIN_PREC.PREC0,
    },
    "*": {
        func: (lhs, rhs) => {
            if (![lhs, rhs].every(check_1.default.isNumber)) {
                return `${lhs}*${rhs}`;
            }
            return lhs * rhs;
        },
        prec: exports.BIN_PREC.PREC1
    },
    "/": {
        func: (lhs, rhs) => {
            if (![lhs, rhs].every(check_1.default.isNumber)) {
                return `${lhs}/${rhs}`;
            }
            return lhs / rhs;
        },
        prec: exports.BIN_PREC.PREC1
    },
    "%": {
        func: (lhs, rhs) => {
            if (![lhs, rhs].every(check_1.default.isNumber)) {
                return `${lhs}%${rhs}`;
            }
            return lhs % rhs;
        },
        prec: exports.BIN_PREC.PREC1
    },
};
exports.UNARY_OPS = {
    "-": (arg) => -arg,
};
class Lexer {
    constructor(src, hist = [], syntax = "(),", alreadyCrashed = false) {
        this.src = src;
        this.hist = hist;
        this.syntax = syntax;
        this.alreadyCrashed = alreadyCrashed;
    }
    nextToken() {
        const token = this.next();
        if (token !== null) {
            this.unnext(token);
        }
        return token;
    }
    lastToken() {
        return this.hist[this.hist.length - 1];
    }
    unnext(token) {
        this.src = token + this.src;
        this.hist.pop();
    }
    next() {
        this.src = this.src.trimStart();
        if (this.src.length == 0) {
            return null;
        }
        const isTokenBreak = (c) => {
            return (c in exports.BINARY_OPS
                || c in exports.UNARY_OPS
                || this.syntax.includes(c));
        };
        const isDouble = this.src.startsWith("\"");
        const isSingle = this.src.startsWith("'");
        const isSOFStr = isDouble || isSingle;
        const strEnd = this.src.indexOf(isDouble ? "\"" : "'", 1);
        if (isSOFStr && strEnd > 0) {
            const token = this.src.slice(0, strEnd + 1);
            this.src = this.src.slice(strEnd + 1);
            this.hist.push(token);
            return token;
        }
        if (isTokenBreak(this.src[0])) {
            const token = this.src[0];
            this.src = this.src.slice(1);
            this.hist.push(token);
            return token;
        }
        for (let i = 0; i < this.src.length; ++i) {
            if (isTokenBreak(this.src[i]) || this.src[i] == " ") {
                const token = this.src.slice(0, i);
                this.src = this.src.slice(i);
                this.hist.push(token);
                return token;
            }
        }
        const token = this.src;
        this.hist.push(token);
        this.src = "";
        return token;
    }
    hasNext() {
        const token = this.next();
        const valid = token !== null;
        if (valid) {
            this.unnext(token);
        }
        return valid;
    }
    spaceAfterToken() {
        const token = this.next();
        const valid = token !== null;
        if (valid && this.src) {
            const spaceCount = this.src.length - this.src.trimStart().length;
            if (spaceCount > 0) {
                this.unnext(token);
                return " ".repeat(spaceCount);
            }
        }
        if (valid) {
            this.unnext(token);
        }
        return "";
    }
}
exports.Lexer = Lexer;
const parsePrimary = (lexer) => {
    let token = lexer.next();
    if (token !== null) {
        if (token in exports.UNARY_OPS) {
            const operand = (0, exports.parseExpr)(lexer);
            return {
                "kind": "unary_op",
                "payload": {
                    "op": token,
                    "operand": operand,
                },
            };
        }
        else if (token === "(") {
            const expr = (0, exports.parseExpr)(lexer);
            token = lexer.next();
            if (token === __SAVE) {
                token = lexer.next();
            }
            if (token !== ")") {
                throw new Error("Expected ')' but got '" + token + "'");
            }
            return expr;
        }
        else if (token === ")") {
            if (!lexer.alreadyCrashed) {
                lexer.alreadyCrashed = true;
                lexer.unnext("," + __SAVE + ")");
                return (0, exports.parsePrimary)(lexer);
            }
            throw new Error("No primary expression starts with ')'");
        }
        else {
            let nextToken = lexer.next();
            if (nextToken === "(") {
                const args = [];
                nextToken = lexer.next();
                if (nextToken === ")") {
                    return {
                        "kind": "funcall",
                        "payload": {
                            "name": token,
                            "args": args,
                        }
                    };
                }
                if (nextToken === null) {
                    throw Error("Unexpected end of input");
                }
                lexer.unnext(nextToken);
                args.push((0, exports.parseExpr)(lexer));
                nextToken = lexer.next();
                // Don't @me >-<
                if (nextToken === __SAVE) {
                    nextToken = lexer.next();
                }
                while (nextToken == ",") {
                    args.push((0, exports.parseExpr)(lexer));
                    nextToken = lexer.next();
                    if (nextToken === __SAVE) {
                        nextToken = lexer.next();
                    }
                }
                if (nextToken === __SAVE) {
                    nextToken = lexer.next();
                }
                if (nextToken !== ")") {
                    // throw Error("Expected ')' but got '" + nextToken + "'");
                    return {
                        "kind": "symbol",
                        "payload": {
                            "value": token
                        }
                    };
                }
                return {
                    "kind": "funcall",
                    "payload": {
                        "name": token,
                        "args": args,
                    }
                };
            }
            else {
                if (nextToken !== null) {
                    lexer.unnext(nextToken);
                }
                return {
                    "kind": "symbol",
                    "payload": {
                        "value": token
                    }
                };
            }
        }
    }
    else {
        throw new Error("Expected primary expression but reached the end of the input");
    }
};
exports.parsePrimary = parsePrimary;
const parseExpr = (lexer, prec = exports.BIN_PREC.PREC0) => {
    if (prec >= exports.BIN_PREC.COUNT_PRECS) {
        return (0, exports.parsePrimary)(lexer);
    }
    const lhs = (0, exports.parseExpr)(lexer, prec + 1);
    const opToken = lexer.next();
    if (opToken !== null) {
        if (opToken in exports.BINARY_OPS && exports.BINARY_OPS[opToken].prec == prec) {
            const rhs = (0, exports.parseExpr)(lexer, prec);
            return {
                "kind": "binary_op",
                "payload": {
                    "op": opToken,
                    "lhs": lhs,
                    "rhs": rhs,
                }
            };
        }
        else {
            lexer.unnext(opToken);
        }
    }
    return lhs;
};
exports.parseExpr = parseExpr;
// export const compileExpr = (src: string) => {
//   const lexer = new Lexer(src);
//   const result = parseExpr(lexer);
//   const token = lexer.next();
//   if (token !== null) {
//     console.log(typeof (token));
//     console.log(token);
//     throw new Error("Unexpected token '" + token + "'");
//   }
//   return result;
// };
const runExpr = (expr, ctx = {}, warnings = []) => {
    console.assert(check_1.default.isObject(expr));
    switch (expr.kind) {
        case "symbol": {
            const symbol = expr.payload;
            const value = symbol.value;
            const number = Number(value);
            if (isNaN(number)) {
                if (ctx.vars && value && value in ctx.vars) {
                    return ctx.vars[value];
                }
                if (value === null || value === void 0 ? void 0 : value.startsWith("$")) {
                    warnings.push("Unknown variable '" + value + "'");
                }
                return value;
            }
            else {
                return number;
            }
        }
        case "unary_op": {
            const unary_op = expr.payload;
            const op = unary_op === null || unary_op === void 0 ? void 0 : unary_op.op;
            const operand = unary_op === null || unary_op === void 0 ? void 0 : unary_op.operand;
            if (op && op in exports.UNARY_OPS) {
                if (operand === undefined) {
                    throw new Error("operand needs to be an object not undefined");
                }
                return exports.UNARY_OPS[op]((0, exports.runExpr)(operand, ctx));
            }
            throw new Error("Unknown unary operator '" + unary_op.op + "'");
        }
        case "binary_op": {
            const binary_op = expr.payload;
            const op = binary_op === null || binary_op === void 0 ? void 0 : binary_op.op;
            const lhs = binary_op === null || binary_op === void 0 ? void 0 : binary_op.lhs;
            const rhs = binary_op === null || binary_op === void 0 ? void 0 : binary_op.rhs;
            if (op && op in exports.BINARY_OPS) {
                if (lhs === undefined) {
                    throw new Error("lhs operand needs to be an object not undefined: " + `lhs=${lhs} :: rhs=${rhs}`);
                }
                if (rhs === undefined) {
                    throw new Error("rhs operand needs to be an object not undefined: " + `lhs=${lhs} :: rhs=${rhs}`);
                }
                return exports.BINARY_OPS[op].func((0, exports.runExpr)(lhs, ctx), (0, exports.runExpr)(rhs, ctx));
            }
            throw new Error("Unknown binary operator '" + op + "'");
        }
        case "funcall": {
            const funcall = expr.payload;
            const name = funcall.name;
            const args = funcall.args;
            if (ctx.funcs && name !== undefined && args !== undefined && name in ctx.funcs) {
                let _a;
                return ((_a = ctx.funcs)[name].apply(_a, args.map((arg) => (0, exports.runExpr)(arg, ctx))));
            }
            if (name === null || name === void 0 ? void 0 : name.startsWith("$")) {
                warnings.push("Unknown function '" + name + "'");
            }
            const params = args === null || args === void 0 ? void 0 : args.map((x) => { var _b; return (_b = x === null || x === void 0 ? void 0 : x.payload) === null || _b === void 0 ? void 0 : _b.value; }).map((x) => check_1.default.isObject(x) ? JSON.stringify(x) : x).join(", ");
            return `${name}(${params || ""})`;
        }
        default: {
            throw new Error("Unexpected AST node '" + expr.kind + "'");
        }
    }
};
exports.runExpr = runExpr;
