/* eslint-disable @typescript-eslint/no-explicit-any */

import check from "../check";
import { type EvalContext, type ContextFuncs, type EvalWarningMeta, Lexer, parseExpr, runExpr } from "./eval";
import { AnyFn, type TypeOf } from "../@types";
import date from "../date";

const fixString = (x: string) => {
  if (check.isString(x)) {
    if (x.startsWith("\"") && x.endsWith("\"")) {
      x = x.substring(1, x.length - 1);
    } else if (x.startsWith("'") && x.endsWith("'")) {
      x = x.substring(1, x.length - 1);
    }
  }

  return x;
};

const wrapCtxFuncs = (mut_ctx: EvalContext) => {
  const _f = mut_ctx?.funcs;
  if (_f && check.isObject(_f)) {
    const f = { ..._f };
    const updated: ContextFuncs = {};
    Object
      .keys(f)
      .forEach((k) => {
        updated[k] = (...args: any[]) => {
          args = args.map(fixString);
          return f[k](...args);
        };
      });

    mut_ctx.funcs = updated;
  }
  return mut_ctx;
};

export type ParserLogsLevel = "WARN" | "ERROR";
export type ParserLog = EvalWarningMeta & {
  level: "WARN" | "ERROR",
  lineNumber: number,
  error?: Error,
};

export type ParseTemplateResult = {
  result: string,
  logs: ParserLog[],
};

/**
 *
 * @param sentence sentence
 * @param _ctx context
 * @returns evaludated sentence
 *
 * @deprecated use `class TemplateParser` or `lval` function
 */
const parseTemplate = (sentence: string, _ctx: EvalContext = {}): ParseTemplateResult => {
  const logs: ParserLog[] = [];

  const result = sentence
    .split("\n")
    .map((line, index) => {
      try {
        const parsed = _parseTemplate(line, _ctx);
        logs.push(...parsed.warnings.map((wranMeta) => ({
          lineNumber: index + 1,
          level: "WARN" as const,
          ...wranMeta,
        })));

        return parsed.result;
      } catch (error: any) {

        if (error.message.toLowerCase().startsWith("no primary expression starts with ')'") || error.message.startsWith("Expected ')' but got '")) {
          const modded = line.replace(/(\W)\(([^)]+)\)/g, "$1 <parentheses> $2 </parentheses>");

          try {
            const parsed = _parseTemplate(modded, _ctx);
            logs.push(...parsed.warnings.map((wranMeta) => ({
              lineNumber: index + 1,
              level: "WARN" as const,
              ...wranMeta,
            })));
            return parsed
              .result
              .replace(/<parentheses> /gi, "(")
              .replace(/ <\/parentheses>/gi, ")");
          } catch (ignored) { /* emtpy */ }
        }

        let message = "";

        if (error) {
          message = error.message;
          if (!message && error.toString) {
            message = error.toString();
          }
        }

        if (!message) {
          message = `${error}`;
        }

        logs.push({
          lineNumber: index + 1,
          level: "ERROR",
          message,
          error,
          timestamp: new Date(),
        });
      }

      return line;
    })
    .join("\n");
  return {
    result,
    logs,
  };
};

const _parseTemplate = (sentence: string, _ctx: EvalContext = {}) => {
  const warnings: EvalWarningMeta[] = [];
  const ctx = wrapCtxFuncs({/*clone*/..._ctx });
  const lex = new Lexer(sentence);

  const builder = [];
  while (lex.hasNext()) {
    const _restore = lex.spaceAfterToken();
    let restoreSpace = "";
    const expr = parseExpr(lex);
    let word = expr.payload.value;
    const cutHist = [];
    if (word && check.isString(word) && word.startsWith("$")) {
      restoreSpace = _restore;
      let isPeriod = word.endsWith(".");
      let isExcla = word.endsWith("!");
      let isParenOpen = word.endsWith("(");
      let isParenClose = word.endsWith(")");
      let isGt = word.endsWith(">");
      let isLt = word.endsWith("<");
      while (word && (isPeriod || isExcla || isParenOpen || isParenClose || isGt || isLt)) {
        word = word.substring(0, word.length - 1);

        if (isPeriod) {
          cutHist.push(".");
        } else if (isExcla) {
          cutHist.push("!");
        } else if (isParenOpen) {
          cutHist.push("(");
        } else if (isParenClose) {
          cutHist.push(")");
        } else if (isGt) {
          cutHist.push(">");
        } else if (isLt) {
          cutHist.push("<");
        }
        isPeriod = word.endsWith(".");
        isExcla = word.endsWith("!");
        isParenOpen = word.endsWith("(");
        isParenClose = word.endsWith(")");
        isGt = word.endsWith(">");
        isLt = word.endsWith("<");
      }

      if (cutHist.length !== 0) {
        expr.payload.value = word;
      }
    }
    const isFuncCall = expr.kind === "funcall";
    const isSymbol = expr.kind === "symbol";
    const resolved = runExpr(expr, ctx, /*&mut*/warnings);
    const append = cutHist.join("");
    builder.push(resolved + append + restoreSpace);

    const isVar = lex.lastToken()?.startsWith("$");
    const commaLoc = builder.lastIndexOf(",") - 1;
    if (lex.lastToken() === "," && builder[commaLoc] === " ") {
      builder.splice(commaLoc, 1);
    }

    if (isFuncCall && !["!", ".", ","].includes(lex.nextToken() as string)) {
      builder.push(" ");
    }

    if (!(isFuncCall || (isSymbol && isVar))) {
      builder.push(" ");
    }
  }

  return {
    result: builder.join("").trim(),
    warnings,
  };
};

export type Context = EvalContext;
export type TemplateParserOptions = {
  includeBuiltIns: boolean,
};
class TemplateParser {
  constructor(
    public options: TemplateParserOptions = {
      includeBuiltIns: true,
    },
    public ctx: Context = {},
    public logs: ParserLog[] = [],
  ) {

    if (this.options.includeBuiltIns) {
      this.ctx.funcs = {
        ...this.builtinFunctions(),
        ...(this.ctx.funcs || {}),
      };
    }
  }

  builtinFunctions() {
    const $abs = (x: any): number => Math.abs(x);
    const $all = (...args: any[]): boolean => {
      return args.map($bool).every((x) => x === true);
    };
    const $any = (...args: any[]): boolean => {
      return args.map($bool).some((x) => x === true);
    };

    const $bool = (x: any): boolean => {
      if (check.isValidBoolean(x)) {
        return check.isTrue(x);
      }

      return !!x && $isset(x);
    };
    const $float = (x: any): number => parseFloat(x);
    const $str = (x: any): string => {
      if ($isnil(x)) {
        return `${x}`;
      }

      if (check.isObject(x)) {

        try {
          x = JSON.stringify(x);
        } catch (ignored) {
          const circularReference: any[] = [];
          const jsonString = JSON.stringify(x, (key, value) => {
            if (typeof value === "object" && value !== null) {
              if (circularReference.includes(value)) {
                return "[Circular]";
              }
              circularReference.push(value);
            }
            return value;
          });

          // Replace circular references with actual object reference
          x = jsonString.replace(/"\[Circular\]"/g, () => {
            return JSON.stringify("[Circular]");
          });
        }
      }

      if (!check.isString(x)) {
        x = x.toString ? x.toString() : `${x}`;
      }

      return x;
    };

    const $format = (fmt: string, ...args: any[]): string => {
      if (!check.isString(fmt) || args.length === 0) {
        return fmt;
      }
      args.map($str).forEach((variable, index) => {
        const template = `{${index}}`;
        while (fmt.includes(template)) {
          fmt = fmt.replace(template, variable);
        }
      });

      return fmt;
    };

    const $if = (condition: boolean, ifTrue: any, ifFalse: any) => {
      return $bool(condition) ? ifTrue : ifFalse;
    };

    const $int = (x: any): number => parseInt(x);
    const $isinstance = (x: any, ...types: TypeOf[]): boolean => {
      const xType = $type(x);
      return types.map($str).some((t) => xType === t);
    };

    const $tisstring = (x: any) => {
      return $isinstance(x, "string");
    };
    const $tisnumber = (x: any) => {
      return $isinstance(x, "number", "bigint");
    };
    const $tisundefined = (x: any) => {
      return $isinstance(x, "undefined");
    };
    const $tisobject = (x: any) => {
      return $isinstance(x, "object");
    };
    const $tisboolean = (x: any) => {
      return $isinstance(x, "boolean");
    };
    const $isnil = (x: any) => {
      return x === null || x === undefined;
    };

    const $endsWith = (x: any, searchString: string, endPos?: number) => {
      x = $str(x);
      searchString = $str(searchString);
      return x.endsWith(searchString, endPos);
    };
    const $startsWith = (x: any, searchString: string, pos?: number) => {
      return $str(x).startsWith(searchString, pos);
    };
    const $lower = (x: any) => {
      return $str(x).toLowerCase();

    };
    const $upper = (x: any) => {
      return $str(x).toUpperCase();
    };

    const $len = (x: any): number => {
      return $str(x).length;
    };

    const $max = (...args: any[]): any => {
      return Math.max(
        ...args
          .map($str)
          .map($float)
          .filter((x) => !isNaN(x))
      );
    };
    const $min = (...args: any[]): any => {
      return Math.min(
        ...args
          .map($str)
          .map($float)
          .filter((x) => !isNaN(x))
      );
    };

    const $pow = (a: number, b: number) => Math.pow(a, b);
    const $round = (a: number) => Math.round(a);
    const $math = (key: string, ...args: any[]) => {
      try {
        const intrinsic = (Math as any)[key];
        const result = check.isFunction(intrinsic) ? intrinsic(...args) : intrinsic;
        if (result) {
          return result;
        }
      } catch (error: any) {
        this.logs.push({
          level: "ERROR",
          error,
          message: error.message || `${error}`,
          lineNumber: NaN,
          timestamp: new Date(),
        });
      }

      const argv = args.join(", ");
      this.logs.push({
        level: "WARN",
        lineNumber: NaN,
        message: `Couldn't resolve Math.${key}${!argv ? "" : "(" + argv + ")"}`,
        timestamp: new Date(),
      });
      return `$math('${key}'${!argv ? "" : ", " + argv})`;
    };
    const $concat = (...args: any[]) => {
      return args.map($str).join("");
    };
    const $substring = (x: string, start: number, end?: number) => {
      const str = $str(x);
      if (start === undefined || !check.isNumber(start) || start < 0) {
        start = 0;
      }
      if (end === undefined || !check.isNumber(start) || end > str.length) {
        end = str.length;
      }
      return str.substring(start, end);

    };
    const $type = (x: any) => typeof x;
    const $getattr = (obj: any, ...path: string[]) => {
      let ptr = obj;
      path.filter(check.isString).forEach((literalKey) => {
        // Split key into parts on '.'
        let keys = literalKey.split(".");

        // Check if first attr exists if not revert back
        // to original key
        if (!ptr[keys[0]]) {
          keys = [literalKey];
        }

        keys
          .filter((x) => !!x)
          .forEach((key) => {
            if (ptr && key && ptr[key]) {
              ptr = ptr[key];
            }
          });
      });


      return ptr;
    };

    const $hasattr = (obj: any, ...path: string[]) => {
      let ptr = obj;
      let result = true;
      path.filter(check.isString).forEach((literalKey) => {
        // Split key into parts on '.'
        let keys = literalKey.split(".");

        // Check if first attr exists if not revert back
        // to original key
        if (!ptr[keys[0]]) {
          keys = [literalKey];
        }

        keys
          .filter((x) => !!x)
          .forEach((key) => {
            if (ptr && key && ptr[key]) {
              ptr = ptr[key];
            } else {
              result = false;
            }
          });
      });


      return result;
    };
    const $isset = (obj: any) => {
      return !$str(obj).startsWith("$");
    };

    const $includes = (x: any, value: any) => {
      if (x) {
        if (x.includes && check.isFunction(x.includes)) {
          return x.includes(value);
        }

        if (x.has && check.isFunction(x.has)) {
          return x.has(value);
        }
      }

      return false;
    };

    const $now = () => {
      return new Date();
    };

    return {
      $if,
      $abs,
      $all,
      $any,
      $bool,
      $float,
      $str,
      $format,
      $int,
      $isnil,
      $isinstance,
      $tisstring,
      $tisnumber,
      $tisboolean,
      $tisundefined,
      $tisobject,
      $len,
      $max,
      $min,
      $pow,
      $round,
      $substring,
      $type,
      $math,
      $getattr,
      $concat,
      $hasattr,
      $isset,
      $includes,
      $endsWith,
      $startsWith,
      $lower,
      $upper,
      $now,
    };
  }

  fixName(name: string) {
    return name.startsWith("$") ? name : "$" + name;
  }

  fnExists(name: string): boolean {
    name = this.fixName(name);
    return name in (this.ctx.funcs || {});
  }

  varExists(name: string): boolean {
    name = this.fixName(name);
    return name in (this.ctx.vars || {});
  }

  addVar(name: string, value: any) {
    name = this.fixName(name);
    this.ctx.vars = this.ctx.vars || {};
    this.ctx.vars[name] = value;
  }

  addFunction(name: string, cb: AnyFn) {
    name = this.fixName(name);
    this.ctx.funcs = this.ctx.funcs || {};
    this.ctx.funcs[name] = cb;
  }

  clearLogs() {
    this.logs = [];
  }

  parse(sentence: string): ParseTemplateResult {
    const result = parseTemplate(sentence, this.ctx || {});
    this.logs.push(...result.logs);
    return result;
  }
}

const _lvalParseString = <T>(str: string) => {
  if (check.isNumeric(str)) {
    return parseFloat(str);
  } else if (check.isValidBoolean(str)) {
    return check.isTrue(str);
  } else if (date.parse(str) !== null) {
    return new Date(str);
  } else if (str === "undefined") {
    return undefined;
  } else if (str === "null") {
    return null;
  }

  try {
    return JSON.parse(str) as T;
  } catch(err) {
    return str;
  }
};

const lval = <T>(sentence: string, ctx?: Context) => {
  const r = parseTemplate(sentence, ctx || {});
  const expr = _lvalParseString<T>(r.result);
  return {
    result: expr,
    logs: r.logs,
  };
};

const ____builtins = new TemplateParser({ includeBuiltIns: false }).builtinFunctions;
export type BuiltInFunction = ReturnType<typeof ____builtins>;
export type BuiltInFunctionKey = keyof BuiltInFunction;

export default {
  /** @deprecated change `SentenceParser` to `TemplateParser`  */
  SentenceParser: TemplateParser,
  TemplateParser,
  lval,
};
