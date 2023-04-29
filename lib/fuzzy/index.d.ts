declare const _default: {
    similarity: (str1: string, str2: string, gramSize?: number) => number;
    topSimilar: <T = string>(value: T, values: T[], key: (obj: T) => string, topK?: number, thresh?: number, gramSize?: number) => T[];
};
export default _default;
