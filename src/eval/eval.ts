/* eslint-disable @typescript-eslint/no-explicit-any */

// This code is based on the emoteJAM project (https://github.com/tsoding/emoteJAM), 
// which is licensed under the MIT License. 
// Copyright 2021 Alexey Kutepov <reximkut@gmail.com>

import check from "../check";

const __SAVE = "$B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B_B";

export const BIN_PREC = {
  "0": "PREC0",
  "1": "PREC1",
  "2": "COUNT_PRECS",
  "PREC0": 0,
  "PREC1": 1,
  "COUNT_PRECS": 2
} as const;
Object.freeze(BIN_PREC);
Object.seal(BIN_PREC);

export const BINARY_OPS = {
  "+": {
    func: (lhs: any, rhs: any) => {
      if (![lhs, rhs].every(check.isNumber)) {
        return `${lhs}*${rhs}`;
      }
      return lhs + rhs;
    },
    prec: BIN_PREC.PREC0,
  },
  "-": {
    func: (lhs: any, rhs: any) => {
      if (![lhs, rhs].every(check.isNumber)) {
        return `${lhs}*${rhs}`;
      }
      return lhs - rhs;
    },
    prec: BIN_PREC.PREC0,
  },
  "*": {
    func: (lhs: any, rhs: any) => {
      if (![lhs, rhs].every(check.isNumber)) {
        return `${lhs}*${rhs}`;
      }
      return lhs * rhs;
    },
    prec: BIN_PREC.PREC1
  },
  "/": {
    func: (lhs: any, rhs: any) => {
      if (![lhs, rhs].every(check.isNumber)) {
        return `${lhs}*${rhs}`;
      }
      return lhs / rhs;
    },
    prec: BIN_PREC.PREC1
  },
  "%": {
    func: (lhs: any, rhs: any) => {
      if (![lhs, rhs].every(check.isNumber)) {
        return `${lhs}*${rhs}`;
      }
      return lhs % rhs;
    },
    prec: BIN_PREC.PREC1
  },
  "^": {
    func: (lhs: any, rhs: any) => {
      if (![lhs, rhs].every(check.isNumber)) {
        return `${lhs}^${rhs}`;
      }
      return Math.pow(lhs, rhs);
    },
    prec: BIN_PREC.PREC1
  },
  "|": {
    func: (lhs: any, rhs: any) => {
      if (![lhs, rhs].every(check.isBoolean)) {
        return `${lhs} | ${rhs}`;
      }
      return lhs || rhs;
    },
    prec: BIN_PREC.PREC1
  },
  "&": {
    func: (lhs: any, rhs: any) => {
      if (![lhs, rhs].every(check.isBoolean)) {
        return `${lhs} & ${rhs}`;
      }
      return lhs && rhs;
    },
    prec: BIN_PREC.PREC1
  },
};

export const UNARY_OPS = {
  "-": (arg: number) => -arg,
};

export type UnaryOpsKeys = keyof typeof UNARY_OPS;
export type BinaryOpsKeys = keyof typeof BINARY_OPS;
const ____IGNORE: unknown = 42;
const ___TOF = typeof ____IGNORE;
export type TypeOf = typeof ___TOF;
export type AnyFn = (...args: any) => any;
export type ContextVarsVarType = any;
export type ContextFuncs = {
  [key: string]: AnyFn,
};
export type ContextVars = {
  [key: string]: ContextVarsVarType,
};
export type EvalContext = {
  funcs?: ContextFuncs,
  vars?: ContextVars,
};
export type Expression = {
  kind: "funcall" | "unary_op" | "symbol" | "binary_op",
  payload: {
    name?: string,
    op?: string,
    value?: string,
    operand?: Expression,
    rhs?: Expression,
    lhs?: Expression,
    args?: Expression[],
  },
};

export class Lexer {
  constructor(
    private src: string,
    private hist: string[] = [],
    private syntax: string = "(),",
    public alreadyCrashed: boolean = false,
  ) { }

  lastToken(): string | undefined {
    return this.hist[this.hist.length - 1];
  }

  unnext(token: string) {
    this.src = token + this.src;
    this.hist.pop();
  }

  next(): string | null {
    this.src = this.src.trimStart();
    if (this.src.length == 0) {
      return null;
    }
    const isTokenBreak = (c: string) => {
      return (
        c in BINARY_OPS
        || c in UNARY_OPS
        || this.syntax.includes(c)
      );
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
      if ((isTokenBreak(this.src[i]) || this.src[i] == " ")) {
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

  hasNext(): boolean {
    const token = this.next();
    const valid = token !== null;
    if (valid) {
      this.unnext(token);
    }
    return valid;
  }
}

export const parsePrimary = (lexer: Lexer): Expression => {
  let token = lexer.next();
  if (token !== null) {
    if (token in UNARY_OPS) {
      const operand = parseExpr(lexer);
      return {
        "kind": "unary_op",
        "payload": {
          "op": token,
          "operand": operand,
        },
      };
    }
    else if (token === "(") {
      const expr = parseExpr(lexer);
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
        return parsePrimary(lexer);
      }

      throw new Error("No primary expression starts with ')'");
    }
    else {
      let nextToken = lexer.next();
      if (nextToken === "(") {
        const args: Expression[] = [];
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
        args.push(parseExpr(lexer));
        nextToken = lexer.next();

        // Don't @me >-<
        if (nextToken === __SAVE) {
          nextToken = lexer.next();
        }
        while (nextToken == ",") {
          args.push(parseExpr(lexer));
          nextToken = lexer.next();
          if (nextToken === __SAVE) {
            nextToken = lexer.next();
          }
        }
        if (nextToken === __SAVE) {
          nextToken = lexer.next();
        }
        if (nextToken !== ")") {
          throw Error("Expected ')' but got '" + nextToken + "'");
        }
        return {
          "kind": "funcall",
          "payload": {
            "name": token,
            "args": args,
          }
        };
      } else {
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
  } else {
    throw new Error("Expected primary expression but reached the end of the input");
  }
};

export const parseExpr = (lexer: Lexer, prec: number = BIN_PREC.PREC0): Expression => {
  if (prec >= BIN_PREC.COUNT_PRECS) {
    return parsePrimary(lexer);
  }
  const lhs = parseExpr(lexer, prec + 1);
  const opToken = lexer.next();
  if (opToken !== null) {
    if (opToken in BINARY_OPS && BINARY_OPS[opToken as BinaryOpsKeys].prec == prec) {
      const rhs = parseExpr(lexer, prec);
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

export const runExpr = (expr: Expression, ctx: EvalContext = {}): any => {
  console.assert(check.isObject(expr));
  switch (expr.kind) {
  case "symbol": {
    const symbol = expr.payload;
    const value = symbol.value;
    const number = Number(value);
    if (isNaN(number)) {
      if (ctx.vars && value && value in ctx.vars) {
        return ctx.vars[value];
      }
      if (value?.startsWith("$")) {
        console.warn("WARN: Unknown variable '" + value + "'");
      }
      return value;
    } else {
      return number;
    }
  }
  case "unary_op": {
    const unary_op = expr.payload;
    const op = unary_op?.op;
    const operand = unary_op?.operand;
    if (op && op in UNARY_OPS) {
      if (operand === undefined) {
        throw new Error("operand needs to be an object not undefined");
      }
      return UNARY_OPS[op as UnaryOpsKeys](runExpr(operand, ctx));
    }
    throw new Error("Unknown unary operator '" + unary_op.op + "'");
  }
  case "binary_op": {
    const binary_op = expr.payload;
    const op = binary_op?.op;
    const lhs = binary_op?.lhs;
    const rhs = binary_op?.rhs;
    if (op && op in BINARY_OPS) {
      if (lhs === undefined) {
        throw new Error("lhs operand needs to be an object not undefined: " + `lhs=${lhs} :: rhs=${rhs}`);
      }
      if (rhs === undefined) {
        throw new Error("rhs operand needs to be an object not undefined: " + `lhs=${lhs} :: rhs=${rhs}`);
      }
      return BINARY_OPS[op as BinaryOpsKeys].func(runExpr(lhs, ctx), runExpr(rhs, ctx));
    }

    throw new Error("Unknown binary operator '" + op + "'");
  }
  case "funcall": {
    const funcall = expr.payload;
    const name = funcall.name;
    const args = funcall.args;
    if (ctx.funcs && name !== undefined && args !== undefined && name in ctx.funcs) {
      let _a;
      return (
        (_a = ctx.funcs)[name].apply(
          _a,
          args.map((arg) => runExpr(arg, ctx))
        )
      );
    }
    if (name?.startsWith("$")) {
      console.warn("WARN: Unknown function '" + name + "'");
    }
    return `${name}(...[${args?.length} args])`;
  }
  default: {
    throw new Error("Unexpected AST node '" + expr.kind + "'");
  }
  }
};
