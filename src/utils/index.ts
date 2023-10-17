/* eslint-disable @typescript-eslint/no-explicit-any */
import check from "../check";
// import * as crypto from "crypto";

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

      if (!check.isString(str) && str?.toString) {
        str = str.toString();
      }
    }
  }

  if (!check.isString(str)) {
    return null;
  }

  let hsh = 0;
  for (let i = 0; i < str.length; ++i) {
    const code = str.charCodeAt(i);
    // tslint:disable-next-line:no-bitwise
    hsh = ((hsh << 5) - hsh) + code;
    // tslint:disable-next-line:no-bitwise
    hsh &= hsh;
  }
  return hsh;
}

function capitalize(str: string) {
  if (!check.isString(str)) {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function retry<T>(operation: () => Promise<T>, maxRetries: number, delay: number) {
  return new Promise<T>((resolve, reject) => {
    let retries = 0;

    function attempt() {
      operation()
        .then(resolve)
        .catch(error => {
          retries += 1;
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

const isPrime: (num: number) => boolean = (() => {
  const LITERAL_ONE = "1";
  const EMPTY_STR = "";
  const PROG = /^1?$|^(11+?)\1+$/;

  function isPrimeInner(num: number): boolean {
    const ones = EMPTY_STR.padEnd(num, LITERAL_ONE);
    return !PROG.test(ones);
  }

  return isPrimeInner;
})();

// const uuid = (params?: { hex?: boolean }) => {
//   const r = crypto.randomUUID();
//   return params?.hex === true ? r.replace(/-/g, "") : r;
// };
//
// const randomString = (size = 64) => {
//   return crypto.randomBytes(size).toString("hex");
// };
//
// export type HashAlgorithm = {
//   node: string,
//   web: crypto.webcrypto.AlgorithmIdentifier,
// }
//
// const Algorithms: { [name: string]: HashAlgorithm } = {
//   SHA_1: {
//     node: "sha1",
//     web: "SHA-1",
//   },
//   SHA_256: {
//     node: "sha256",
//     web: "SHA-256",
//   },
//   SHA_512: {
//     node: "sha512",
//     web: "SHA-512",
//   },
// };

// const hash = async (message: string, salt: string, alg: HashAlgorithm = Algorithms.SHA_256) => {
//   if (!crypto.subtle?.digest) {
//     return crypto
//       .createHash(alg.node)
//       .update(message)
//       .update(salt)
//       .digest()
//       .toString("hex");
//   }
//
//   const encoder = new TextEncoder();
//   const data = encoder.encode(message);
//   const hashBuffer = await crypto.subtle.digest(alg.web, data);
//   const hashArray = Array.from(new Uint8Array(hashBuffer));
//   return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
// };

export default {
  hashCode,
  isPrime,
  capitalize,
  retry,
  sleep,
  // uuid,
  // randomString,
  // hash,
};
