declare const _default: {
    stemmer: (word: string) => string;
    isStopWord: (word: string, lang?: "english") => boolean;
    removeStopWords: (input: string, lang?: "english") => string;
};
export default _default;
