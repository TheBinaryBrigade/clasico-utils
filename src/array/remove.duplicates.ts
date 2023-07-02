export function removeDuplicates<T>(iter: Iterable<T>, key?: (item: T) => unknown): T[] {
  return [...noDuplicates(iter, key)];
}

export function* walkBackString(str: string, offset = 0) {
  for (let i = str.length - offset; i > 0; --i) {
    yield str.substring(0, i);
  }
}

export function* noDuplicates<T, R>(iter: Iterable<T>, key?: (elem: T) => R) {
  const seen = new Set<T | R>();
  for (const elem of iter) {
    const hashable = key ? key(elem) : elem;
    if (seen.has(hashable)) {
      continue;
    }

    seen.add(hashable);
    yield elem;
  }
}

function filterMap<T>(iter: Iterable<T>, condition: (elem: T, index: number, iter: Iterable<T>) => boolean): T[] {
  const result: T[] = [];
  let index = 0;
  for (const elem of iter) {
    if (condition(elem, index, iter)) {
      result.push(elem);
    }
    ++index;
  }
  return result;
}

export function findAllCommonPrefixes(stringsA: string[]): string[] {

  if (stringsA.length <= 1) {
    return stringsA;
  }

  const prefixes = new Set<string>();
  const matched = new Set<string>();
  const seen = [];
  for (const parent of noDuplicates(stringsA)) {
    if (seen.length !== 2) {
      seen.push(parent);
    }
    const before = prefixes.size;
    for (const substr of walkBackString(parent, 0)) {
      for (const child of stringsA) {
        if (!matched.has(child) && parent !== child && child.startsWith(substr)) {
          matched.add(child);
          prefixes.add(substr);
          break;
        }
      }

      if (before !== prefixes.size) {
        break;
      }
    }
  }

  // Edge case
  if (seen.length === 1) {
    return seen;
  }

  return filterMap(prefixes, (value, index1, array) => {
    let index2 = 0;
    for (const val of array) {
      if (index1 !== index2 && value.startsWith(val)) {
        return false;
      }
      ++index2;
    }

    return true;
  });
}


