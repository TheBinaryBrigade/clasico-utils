/* eslint-disable @typescript-eslint/no-explicit-any */

// This code is based on the emoteJAM project (https://github.com/tsoding/emoteJAM),
// which is licensed under the MIT License.
// Copyright 2021 Alexey Kutepov <reximkut@gmail.com>

import { type AnyFn } from "../@types";
import check from "../check";
import fuzzy from "../fuzzy";
import inflection from "../inflection";

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
        return `${lhs}+${rhs}`;
      }
      return lhs + rhs;
    },
    prec: BIN_PREC.PREC0,
  },
  "-": {
    func: (lhs: any, rhs: any) => {
      if (![lhs, rhs].every(check.isNumber)) {
        return `${lhs}-${rhs}`;
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
        return `${lhs}/${rhs}`;
      }
      return lhs / rhs;
    },
    prec: BIN_PREC.PREC1
  },
  "%": {
    func: (lhs: any, rhs: any) => {
      if (![lhs, rhs].every(check.isNumber)) {
        return `${lhs}%${rhs}`;
      }
      return lhs % rhs;
    },
    prec: BIN_PREC.PREC1
  },
};

export const UNARY_OPS = {
  "-": (arg: number) => -arg,
};

export type UnaryOpsKeys = keyof typeof UNARY_OPS;
export type BinaryOpsKeys = keyof typeof BINARY_OPS;
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

  nextToken(): string | null {
    const token = this.next();
    if (token !== null) {
      this.unnext(token);
    }
    return token;
  }

  lastToken(): string | undefined {
    return this.hist[this.hist.length - 1];
  }

  unnext(token: string) {
    this.src = token + this.src;
    this.hist.pop();
  }

  next(): string | null {
    this.src = this.src.trimStart();
    if (this.src.length === 0) {
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
      const tok = this.src.slice(0, strEnd + 1);
      this.src = this.src.slice(strEnd + 1);
      this.hist.push(tok);
      return tok;
    }

    if (isTokenBreak(this.src[0])) {
      const tok = this.src[0];
      this.src = this.src.slice(1);
      this.hist.push(tok);
      return tok;
    }
    for (let i = 0; i < this.src.length; ++i) {
      if (isTokenBreak(this.src[i]) || this.src[i] === " ") {
        const tok = this.src.slice(0, i);
        this.src = this.src.slice(i);
        this.hist.push(tok);
        return tok;
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

  spaceAfterToken(): string {
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
        while (nextToken === ",") {
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
    if (opToken in BINARY_OPS && BINARY_OPS[opToken as BinaryOpsKeys].prec === prec) {
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

export type EvalWarningMeta = {
  timestamp: Date,
  message: string
};


export const runExpr = (expr: Expression, ctx: EvalContext = {}, warnings: EvalWarningMeta[] = []): any => {
  // tslint:disable-next-line:no-console
  console.assert(check.isObject(expr));

  function warningsPush(message: string): void {
    warnings.push({
      timestamp: new Date(),
      message,
    });
  }

  const recommend = (ctxKey: keyof EvalContext, value: string): string[] => {
    return fuzzy.topSimilar(
      value,
      [...Object.keys(ctx[ctxKey] || {})],
      (x) => x,
      5,
    )
      .map((str) => {
        return str.replace(
          /[\u00A0-\u9999<>&]/g,
          (i) => "&#" + i.charCodeAt(0) + ";"
        );
      });
  };

  const singularOrPlural = (word: string, count: number) => {
    return count > 1 ? inflection.pluralize(word) : inflection.singularize(word);
  };

  switch (expr.kind) {
  case "symbol": {
    const symbol = expr.payload;
    const value = symbol.value;
    const num = Number(value);
    if (isNaN(num)) {
      if (ctx.vars && value && value in ctx.vars) {
        return ctx.vars[value];
      }
      if (value?.startsWith("$") && !/^\$\d/.test(value)) {
        const similarNames = recommend("vars", value);
        const typeName = singularOrPlural("variable", similarNames.length);
        const areIs = similarNames.length > 1 ? "are" : "is";
        const recommendations = ` The most similar ${typeName} ${areIs} ${similarNames.join(", ")}`;
        warningsPush("Unknown variable '" + value + "'." + (similarNames.length > 0 ? recommendations : ""));

        if (value in (ctx.funcs || {})) {
          warningsPush("'" + value + "' is defined as a function.");
        }
      }
      return value;
    } else {
      return num;
    }
  }
  case "unary_op": {
    const unaryOp = expr.payload;
    const op = unaryOp?.op;
    const operand = unaryOp?.operand;
    if (op && op in UNARY_OPS) {
      if (operand === undefined) {
        throw new Error("operand needs to be an object not undefined");
      }
      return UNARY_OPS[op as UnaryOpsKeys](runExpr(operand, ctx));
    }
    throw new Error("Unknown unary operator '" + unaryOp.op + "'");
  }
  case "binary_op": {
    const binaryOp = expr.payload;
    const op = binaryOp?.op;
    const lhs = binaryOp?.lhs;
    const rhs = binaryOp?.rhs;
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
    if (name?.startsWith("$") && !/^\$\d/.test(name)) {
      const similarNames = recommend("funcs", name);
      const typeName = singularOrPlural("function", similarNames.length);
      const areIs = similarNames.length > 1 ? "are" : "is";
      const recommendations = ` The most similar ${typeName} ${areIs} ${similarNames.join(", ")}`;
      warningsPush("Unknown function '" + name + "'." + (similarNames.length > 0 ? recommendations : ""));

      if (name in (ctx.vars || {})) {
        warningsPush("'" + name + "' is defined as a variable.");
      }
    }
    const params = args
      ?.map((x) => x?.payload?.value)
      .map((x) => check.isObject(x) ? JSON.stringify(x) : x)
      .join(", ");
    return `${name}(${params || ""})`;
  }
  default: {
    throw new Error("Unexpected AST node '" + expr.kind + "'");
  }
  }
};
