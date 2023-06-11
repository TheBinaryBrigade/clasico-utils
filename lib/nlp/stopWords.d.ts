export type StopWordLanguages = "english";
declare const stopWords: {
    isStopWord: (word: string, lang?: StopWordLanguages) => boolean;
    removeStopWords: (input: string, lang?: StopWordLanguages) => string;
};
export default stopWords;
