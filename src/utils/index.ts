/* eslint-disable @typescript-eslint/no-explicit-any */
import check from "../check";

function hashCode(str: any, coerceToString = true): number | null {

  if (coerceToString) {
    if (!check.isString(str)) {
      if (check.isSet(str)) {
        str = Array.from(str);
      }

      if (check.isObject(str)) {
        try {
          str = JSON.stringify(str);
        } catch (ignored) {
          const circularReference: any[] = [];
          const jsonString = JSON.stringify(str, (key, value) => {
            if (typeof value === "object" && value !== null) {
              if (circularReference.includes(value)) {
                return "[Circular]";
              }
              circularReference.push(value);
            }
            return value;
          });

          // Replace circular references with actual object reference
          str = jsonString.replace(/"\[Circular]"/g, () => {
            return JSON.stringify("[Circular]");
          });
        }
      }

      if (!check.isString(str) && str.toString) {
        str = str.toString();
      }
    }
  }

  if (!check.isString(str)) {
    return null;
  }

  let hash = 0;
  for (let i = 0; i < str.length; ++i) {
    const code = str.charCodeAt(i);
    // tslint:disable-next-line:no-bitwise
    hash = ((hash << 5) - hash) + code;
    // tslint:disable-next-line:no-bitwise
    hash &= hash;
  }
  return hash;
}

function capitalize (str: string) {
  if (!check.isString(str)) {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

function retry<T>(operation: () => Promise<T>, maxRetries: number, delay: number) {
  return new Promise<T>((resolve, reject) => {
    let retries = 0;

    function attempt() {
      operation()
        .then(resolve)
        .catch(error => {
          retries++;
          if (retries < maxRetries) {
            setTimeout(attempt, delay);
          } else {
            reject(error);
          }
        });
    }

    attempt();
  });
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  hashCode,
  capitalize,
  retry,
  sleep,
};
