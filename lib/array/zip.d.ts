import { FlattenArray, FlattenTuple } from "../@types";
export declare function zip<T extends ArrayLike<unknown>[]>(...args: T): Generator<FlattenTuple<FlattenArray<T>>>;
