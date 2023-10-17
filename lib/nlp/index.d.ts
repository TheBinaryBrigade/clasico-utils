declare const _default: {
    stemmer: (word: string) => string;
    PART_OF_SPEECH_MAP: {
        readonly CC: {
            readonly title: "Coordinating conjunction";
            readonly description: "A word that connects words, phrases, or clauses of equal rank.";
            readonly examples: readonly ["and", "but", "or"];
        };
        readonly CD: {
            readonly title: "Cardinal number";
            readonly description: "A word that denotes quantity.";
            readonly examples: readonly ["one", "two", "three"];
        };
        readonly DT: {
            readonly title: "Determiner";
            readonly description: "A word that introduces a noun and specifies it as known or unknown, and often specifies quantity.";
            readonly examples: readonly ["a", "an", "the"];
        };
        readonly EX: {
            readonly title: "Existential there";
            readonly description: "A word used to introduce a sentence in which the existence of something is asserted.";
            readonly examples: readonly ["There"];
        };
        readonly FW: {
            readonly title: "Foreign word";
            readonly description: "A word or phrase that is not native to the language but used in certain contexts.";
            readonly examples: readonly ["rendezvous", "hacienda", "sushi"];
        };
        readonly IN: {
            readonly title: "Preposition or subordinating conjunction";
            readonly description: "A word that relates the noun or pronoun to another word in the sentence or introduces a subordinate clause.";
            readonly examples: readonly ["in", "on", "because"];
        };
        readonly JJ: {
            readonly title: "Adjective";
            readonly description: "A word that describes or modifies a noun or pronoun.";
            readonly examples: readonly ["happy", "green", "loud"];
        };
        readonly JJR: {
            readonly title: "Adjective, comparative";
            readonly description: "An adjective that compares two things.";
            readonly examples: readonly ["happier", "greener", "louder"];
        };
        readonly JJS: {
            readonly title: "Adjective, superlative";
            readonly description: "An adjective that describes the highest degree of something.";
            readonly examples: readonly ["happiest", "greenest", "loudest"];
        };
        readonly LS: {
            readonly title: "List item marker";
            readonly description: "A word or symbol that denotes an item in a list.";
            readonly examples: readonly ["1.", "a)", "*"];
        };
        readonly MD: {
            readonly title: "Modal";
            readonly description: "A verb that is used with another verb to express necessity, possibility, intention, or ability.";
            readonly examples: readonly ["can", "will", "must"];
        };
        readonly NN: {
            readonly title: "Noun, singular or mass";
            readonly description: "A word that represents a person, place, thing, or idea.";
            readonly examples: readonly ["cat", "city", "love"];
        };
        readonly NNS: {
            readonly title: "Noun, plural";
            readonly description: "A word that represents multiple persons, places, or things.";
            readonly examples: readonly ["cats", "cities", "loves"];
        };
        readonly NNP: {
            readonly title: "Proper noun, singular";
            readonly description: "A name used for an individual person, place, or organization, spelled with an initial capital letter.";
            readonly examples: readonly ["Alice", "Paris", "Apple"];
        };
        readonly NNPS: {
            readonly title: "Proper noun, plural";
            readonly description: "Names used for a specific group of people, places, or things, spelled with an initial capital letter.";
            readonly examples: readonly ["Americans", "Alps", "Aristotles"];
        };
        readonly PDT: {
            readonly title: "Predeterminer";
            readonly description: "A word that is placed before a determiner to modify the noun that follows.";
            readonly examples: readonly ["all", "both", "half"];
        };
        readonly POS: {
            readonly title: "Possessive ending";
            readonly description: "A suffix added to nouns to indicate possession.";
            readonly examples: readonly ["'s", "'"];
        };
        readonly PRP: {
            readonly title: "Personal pronoun";
            readonly description: "A word that substitutes for a noun or noun phrase and represents people or things.";
            readonly examples: readonly ["I", "you", "he", "she", "it"];
        };
        readonly PRP$: {
            readonly title: "Possessive pronoun";
            readonly description: "A pronoun that shows ownership.";
            readonly examples: readonly ["my", "your", "his", "her", "its"];
        };
        readonly RB: {
            readonly title: "Adverb";
            readonly description: "A word that modifies verbs, adjectives, or other adverbs, expressing manner, place, time, or degree.";
            readonly examples: readonly ["quickly", "there", "very"];
        };
        readonly RBR: {
            readonly title: "Adverb, comparative";
            readonly description: "An adverb that compares two actions.";
            readonly examples: readonly ["quicker", "more quickly", "less quickly"];
        };
        readonly RBS: {
            readonly title: "Adverb, superlative";
            readonly description: "An adverb that describes the highest degree of an action.";
            readonly examples: readonly ["quickest", "most quickly"];
        };
        readonly RP: {
            readonly title: "Particle";
            readonly description: "A word that is used with verbs to create phrasal verbs.";
            readonly examples: readonly ["up", "out", "on"];
        };
        readonly SYM: {
            readonly title: "Symbol";
            readonly description: "A character used as a conventional representation of an object, function, or process.";
            readonly examples: readonly ["&", "%", "$"];
        };
        readonly TO: {
            readonly title: "Preposition/Infinitival to";
            readonly description: "A preposition or a part of an infinitive verb.";
            readonly examples: readonly ["to the store", "to run"];
        };
        readonly UH: {
            readonly title: "Interjection";
            readonly description: "An exclamation, especially as a part of speech, e.g., ah! or dear me!.";
            readonly examples: readonly ["oh", "wow", "uh"];
        };
        readonly VB: {
            readonly title: "Verb, base form";
            readonly description: "The basic form of a verb from which other forms are derived.";
            readonly examples: readonly ["be", "have", "do"];
        };
        readonly VBD: {
            readonly title: "Verb, past tense";
            readonly description: "A verb form that indicates actions or states in the past.";
            readonly examples: readonly ["was", "had", "did"];
        };
        readonly VBG: {
            readonly title: "Verb, gerund or present participle";
            readonly description: "A verb form that ends in -ing and functions as a noun or modifies nouns.";
            readonly examples: readonly ["running", "having", "doing"];
        };
        readonly VBN: {
            readonly title: "Verb, past participle";
            readonly description: "A verb form that typically ends in -ed or -en and is used to form passive verb tenses or adjectives.";
            readonly examples: readonly ["eaten", "written", "done"];
        };
        readonly VBP: {
            readonly title: "Verb, non-3rd person singular present";
            readonly description: "A verb form that does not agree with third-person singular subjects in the present tense.";
            readonly examples: readonly ["am", "have", "run"];
        };
        readonly VBZ: {
            readonly title: "Verb, 3rd person singular present";
            readonly description: "A verb form that agrees with third-person singular subjects in the present tense.";
            readonly examples: readonly ["is", "has", "runs"];
        };
        readonly WDT: {
            readonly title: "Wh-determiner";
            readonly description: "A determiner that introduces a relative clause, typically referring back to something previously mentioned.";
            readonly examples: readonly ["which", "that", "what"];
        };
        readonly WP: {
            readonly title: "Wh-pronoun";
            readonly description: "A pronoun that introduces a relative clause, referring back to something previously mentioned.";
            readonly examples: readonly ["who", "whom", "whose"];
        };
        readonly WP$: {
            readonly title: "Possessive wh-pronoun";
            readonly description: "A pronoun that shows ownership and introduces a relative clause.";
            readonly examples: readonly ["whose"];
        };
        readonly WRB: {
            readonly title: "Wh-adverb";
            readonly description: "An adverb that introduces a question or relative clause.";
            readonly examples: readonly ["where", "when", "why"];
        };
    };
    isStopWord: (word: string, lang?: "english") => boolean;
    removeStopWords: (input: string, lang?: "english") => string;
};
export default _default;
