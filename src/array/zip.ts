import { FlattenArray, FlattenTuple } from "../@types";

export function* zip<T extends ArrayLike<unknown>[]>(...args: T): Generator<FlattenTuple<FlattenArray<T>>> {
  const min = args.reduce((acc, curr) => {
    const len = curr.length;
    if (len < acc) {
      return len;
    }
    return acc;
  }, 0);

  for (let i = 0; i < min; ++i) {
    yield args.map((arr) => arr[i]) as FlattenTuple<FlattenArray<T>>;
  }
}
