import _check from "./check";
import _eval from "./eval";

export const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; ++i) {
    const code = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + code;
    hash &= hash;
  }
  return hash;
};

export const check = _check;
export const parser = _eval;