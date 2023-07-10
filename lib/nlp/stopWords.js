"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stopWords = (() => {
    const STOP_WORDS = {
        english: new Set([
            // Source: NLTK(https://www.nltk.org/howto/collocations.html?highlight=stopwords)
            "a", "about", "above", "after", "again", "against", "ain", "all",
            "am", "an", "and", "any", "are", "aren", "aren't", "as", "at", "be",
            "because", "been", "before", "being", "below", "between", "both",
            "but", "by", "can", "couldn", "couldn't", "d", "did", "didn",
            "didn't", "do", "does", "doesn", "doesn't", "doing", "don", "don't",
            "down", "during", "each", "few", "for", "from", "further", "had",
            "hadn", "hadn't", "has", "hasn", "hasn't", "have", "haven",
            "haven't", "having", "he", "her", "here", "hers", "herself", "him",
            "himself", "his", "how", "i", "if", "in", "into", "is", "isn", "isn't",
            "it", "it's", "its", "itself", "just", "ll", "m", "ma", "me", "mightn",
            "mightn't", "more", "most", "mustn", "mustn't", "my", "myself",
            "needn", "needn't", "no", "nor", "not", "now", "o", "of", "off", "on",
            "once", "only", "or", "other", "our", "ours", "ourselves", "out", "over",
            "own", "re", "s", "same", "shan", "shan't", "she", "she's", "should",
            "should've", "shouldn", "shouldn't", "so", "some", "such", "t", "than",
            "that", "that'll", "the", "their", "theirs", "them", "themselves",
            "then", "there", "these", "they", "this", "those", "through", "to",
            "too", "under", "until", "up", "ve", "very", "was", "wasn", "wasn't",
            "we", "were", "weren", "weren't", "what", "when", "where", "which",
            "while", "who", "whom", "why", "will", "with", "won", "won't", "wouldn",
            "wouldn't", "y", "you", "you'd", "you'll", "you're", "you've", "your",
            "yours", "yourself", "yourselves",
        ]),
    };
    function isStopWord(word, lang = "english") {
        return STOP_WORDS[lang].has(word.replace(/[^\w\d']/gi, "").toLowerCase());
    }
    function removeStopWords(input, lang = "english") {
        const tokens = input.trim().split(/\s+/g);
        const result = tokens.filter((word) => !isStopWord(word, lang));
        return result.join(" ");
    }
    return {
        isStopWord,
        removeStopWords,
    };
})();
exports.default = stopWords;