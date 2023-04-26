import { type AnyFn } from "../@types";
export declare const BIN_PREC: {
    readonly "0": "PREC0";
    readonly "1": "PREC1";
    readonly "2": "COUNT_PRECS";
    readonly PREC0: 0;
    readonly PREC1: 1;
    readonly COUNT_PRECS: 2;
};
export declare const BINARY_OPS: {
    "+": {
        func: (lhs: any, rhs: any) => any;
        prec: 0;
    };
    "-": {
        func: (lhs: any, rhs: any) => string | number;
        prec: 0;
    };
    "*": {
        func: (lhs: any, rhs: any) => string | number;
        prec: 1;
    };
    "/": {
        func: (lhs: any, rhs: any) => string | number;
        prec: 1;
    };
    "%": {
        func: (lhs: any, rhs: any) => string | number;
        prec: 1;
    };
};
export declare const UNARY_OPS: {
    "-": (arg: number) => number;
};
export type UnaryOpsKeys = keyof typeof UNARY_OPS;
export type BinaryOpsKeys = keyof typeof BINARY_OPS;
export type ContextVarsVarType = any;
export type ContextFuncs = {
    [key: string]: AnyFn;
};
export type ContextVars = {
    [key: string]: ContextVarsVarType;
};
export type EvalContext = {
    funcs?: ContextFuncs;
    vars?: ContextVars;
};
export type Expression = {
    kind: "funcall" | "unary_op" | "symbol" | "binary_op";
    payload: {
        name?: string;
        op?: string;
        value?: string;
        operand?: Expression;
        rhs?: Expression;
        lhs?: Expression;
        args?: Expression[];
    };
};
export declare class Lexer {
    private src;
    private hist;
    private syntax;
    alreadyCrashed: boolean;
    constructor(src: string, hist?: string[], syntax?: string, alreadyCrashed?: boolean);
    nextToken(): string | null;
    lastToken(): string | undefined;
    unnext(token: string): void;
    next(): string | null;
    hasNext(): boolean;
    spaceAfterToken(): string;
}
export declare const parsePrimary: (lexer: Lexer) => Expression;
export declare const parseExpr: (lexer: Lexer, prec?: number) => Expression;
export declare const runExpr: (expr: Expression, ctx?: EvalContext) => any;
