/* eslint-disable @typescript-eslint/no-explicit-any */

import check from "../check";
import { type EvalContext, type ContextFuncs, type TypeOf, Lexer, parseExpr, runExpr } from "./eval";

const fixString = (x: string) => {
  if (check.isString(x)) {
    if (x.startsWith("\"") && x.endsWith("\"")) {
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

    return !!x;
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
  const $getattr = (obj: any, ...path: any[]) => {
    let ptr = obj;
    path.map($str).forEach((literalKey) => {
      // Split key into parts on '.'
      let keys = literalKey.split(".");

      // Check if first attr exists if not revert back 
      // to original key
      if (!ptr[keys[0]]) {
        keys = [literalKey];
      }
      
      keys.filter((x) => !!x)
        .forEach((key) => {
          if (ptr && ptr[key]) {
            ptr = ptr[key];
          }
        });
    });

    return ptr;
  };
  return {
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
  };
};

const parseSentence = (sentence: string, _ctx: EvalContext = {}) => {
  const ctx = wrapCtxFuncs({/*clone*/..._ctx });
  const lex = new Lexer(sentence);

  const builder = [];
  while (lex.hasNext()) {
    const expr = parseExpr(lex);
    const resolved = runExpr(expr, ctx);
    builder.push(resolved);
    
    const isFuncCall = expr.kind === "funcall";
    const isSymbol = expr.kind === "symbol";
    const isVar = lex.lastToken()?.startsWith("$");
    if (isFuncCall || (isSymbol && isVar)) {
      builder.push("");
    } else {
      builder.push(" ");
    }

    builder.push("");
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


console.log(">>", parseSentence("$substring($hello, 1), $world, $pow(1+1, 2), $fakePow(1, 2), $cow", {
  funcs: {
    ...builtinFunctions(),
  },
  vars: {
    $hello: " Hello"
  }
}));