export type StopWordLanguages = "english";
declare const _default: {
    isStopWord: (word: string, lang?: "english") => boolean;
    removeStopWords: (input: string, lang?: "english") => string;
};
export default _default;
