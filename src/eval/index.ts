/* eslint-disable @typescript-eslint/no-explicit-any */

import check from "../check";
import { type EvalContext, type ContextFuncs, type TypeOf, Lexer, parseExpr, runExpr } from "./eval";

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

const builtinFunctions = () => {
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
    if (check.isObject(x)) {
      x = JSON.stringify(x, null, 0);
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

  // const $hash = (x: string): number => {
  //   x = $str(x);
  //   let hash = 0;
  //   for (let i = 0; i < x.length; ++i) {
  //     const code = x.charCodeAt(i);
  //     hash = ((hash << 5) - hash) + code;
  //     hash &= hash;
  //   }
  //   return hash;
  // };

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
    } catch (error) {
      console.error(error);
    }

    const argv = args.join(", ");
    return `Math.${key}${!argv ? "" : "(" + argv + ")"}`;
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
  };
};

const parseSentence = (sentence: string, _ctx: EvalContext = {}) => {
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
      let isPeriod = word.endsWith(".");
      let isExcla = word.endsWith("!");
      while (word && (isPeriod || isExcla)) {
        restoreSpace = _restore;
        word = word.substring(0, word.length - 1);
        
        if (isPeriod) {
          cutHist.push(".");
        } else if (isExcla) {
          cutHist.push("!");
        }
        isPeriod = word.endsWith(".");
        isExcla = word.endsWith("!");
      }

      if (cutHist.length !== 0) {
        expr.payload.value = word;
      }  
    }
    const isFuncCall = expr.kind === "funcall";
    const isSymbol = expr.kind === "symbol";
    const resolved = runExpr(expr, ctx);
    const append = cutHist.join("");
    builder.push(resolved + append + restoreSpace);
    
    const isVar = lex.lastToken()?.startsWith("$");
    const commaLoc = builder.lastIndexOf(",") - 1;
    if (lex.lastToken() === "," && builder[commaLoc] === " ") {
      builder.splice(commaLoc, 1);
    }

    if (!(isFuncCall || (isSymbol && isVar))) {
      builder.push(" ");
    }
  }

  return builder.join("").trim();
};

// @exports
export type BuiltInFunction = ReturnType<typeof builtinFunctions>;
export type BuiltInFunctionKey = keyof BuiltInFunction;
export type Context = EvalContext;

export default {
  builtinFunctions,
  parseSentence,
};
