export declare function removeDuplicates<T>(iter: Iterable<T>, key?: (item: T) => unknown): T[];
export declare function walkBackString(str: string, offset?: number): Generator<string, void, unknown>;
export declare function noDuplicates<T, R>(iter: Iterable<T>, key?: (elem: T) => R): Generator<T, void, unknown>;
export declare function findAllCommonPrefixes(stringsA: string[]): string[];
