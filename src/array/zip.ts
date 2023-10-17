import {FlattenArray, FlattenTuple} from "../@types";
import check from "../check";

export function* zip<T extends ArrayLike<unknown>[]>(...args: T): Generator<FlattenTuple<FlattenArray<T>>> {
  const min = args.reduce((acc, curr) => {
    const len = curr.length;
    if (len < acc) {
      return len;
    }
    return acc;
  }, Infinity);

  for (let i = 0; i < min; ++i) {
    yield args.map((arr) => arr[i]) as FlattenTuple<FlattenArray<T>>;
  }
}

export function* chunkArray<T extends unknown[]>(array: T, chunkSize: number): Generator<FlattenTuple<FlattenArray<T>>> {
  for (let i = 0; i < array.length; i += chunkSize) {
    yield array.slice(i, i + chunkSize) as FlattenTuple<T>;
  }
}

export type RangeProps = {
  start?: number,
  stop: number,
  step?: number,
}

export function* range(props: RangeProps): Generator<number> {
  const stop = props.stop;
  let start = props.start || 0;
  let step = props.step || 1;

  if (check.isNil(start) || !check.isNumber(start) || isNaN(start)) {
    start = 0;
  }

  if (check.isNil(step) || !check.isNumber(step) || isNaN(step)) {
    step = 1;
  }

  if (step <= 0) {
    step = 1;
  }

  for (let i = start; i < stop; i += step) {
    yield i;
  }
}
