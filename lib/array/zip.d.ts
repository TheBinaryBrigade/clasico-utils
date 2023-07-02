import { FlattenArray, FlattenTuple } from "../@types";
export declare function zip<T extends ArrayLike<unknown>[]>(...args: T): Generator<FlattenTuple<FlattenArray<T>>>;
export type RangeProps = {
    start?: number;
    stop: number;
    step?: number;
};
export declare function range(props: RangeProps): Generator<number>;
