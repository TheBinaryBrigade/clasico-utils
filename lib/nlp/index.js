"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stopWords_1 = require("./stopWords");
const stemmer_1 = require("./stemmer");
const PART_OF_SPEECH_MAP = {
    "CC": {
        "title": "Coordinating conjunction",
        "description": "A word that connects words, phrases, or clauses of equal rank.",
        "examples": ["and", "but", "or"]
    },
    "CD": {
        "title": "Cardinal number",
        "description": "A word that denotes quantity.",
        "examples": ["one", "two", "three"]
    },
    "DT": {
        "title": "Determiner",
        "description": "A word that introduces a noun and specifies it as known or unknown, and often specifies quantity.",
        "examples": ["a", "an", "the"]
    },
    "EX": {
        "title": "Existential there",
        "description": "A word used to introduce a sentence in which the existence of something is asserted.",
        "examples": ["There"]
    },
    "FW": {
        "title": "Foreign word",
        "description": "A word or phrase that is not native to the language but used in certain contexts.",
        "examples": ["rendezvous", "hacienda", "sushi"]
    },
    "IN": {
        "title": "Preposition or subordinating conjunction",
        "description": "A word that relates the noun or pronoun to another word in the sentence or introduces a subordinate clause.",
        "examples": ["in", "on", "because"]
    },
    "JJ": {
        "title": "Adjective",
        "description": "A word that describes or modifies a noun or pronoun.",
        "examples": ["happy", "green", "loud"]
    },
    "JJR": {
        "title": "Adjective, comparative",
        "description": "An adjective that compares two things.",
        "examples": ["happier", "greener", "louder"]
    },
    "JJS": {
        "title": "Adjective, superlative",
        "description": "An adjective that describes the highest degree of something.",
        "examples": ["happiest", "greenest", "loudest"]
    },
    "LS": {
        "title": "List item marker",
        "description": "A word or symbol that denotes an item in a list.",
        "examples": ["1.", "a)", "*"]
    },
    "MD": {
        "title": "Modal",
        "description": "A verb that is used with another verb to express necessity, possibility, intention, or ability.",
        "examples": ["can", "will", "must"]
    },
    "NN": {
        "title": "Noun, singular or mass",
        "description": "A word that represents a person, place, thing, or idea.",
        "examples": ["cat", "city", "love"]
    },
    "NNS": {
        "title": "Noun, plural",
        "description": "A word that represents multiple persons, places, or things.",
        "examples": ["cats", "cities", "loves"]
    },
    "NNP": {
        "title": "Proper noun, singular",
        "description": "A name used for an individual person, place, or organization, spelled with an initial capital letter.",
        "examples": ["Alice", "Paris", "Apple"]
    },
    "NNPS": {
        "title": "Proper noun, plural",
        "description": "Names used for a specific group of people, places, or things, spelled with an initial capital letter.",
        "examples": ["Americans", "Alps", "Aristotles"]
    },
    "PDT": {
        "title": "Predeterminer",
        "description": "A word that is placed before a determiner to modify the noun that follows.",
        "examples": ["all", "both", "half"]
    },
    "POS": {
        "title": "Possessive ending",
        "description": "A suffix added to nouns to indicate possession.",
        "examples": ["'s", "'"]
    },
    "PRP": {
        "title": "Personal pronoun",
        "description": "A word that substitutes for a noun or noun phrase and represents people or things.",
        "examples": ["I", "you", "he", "she", "it"]
    },
    "PRP$": {
        "title": "Possessive pronoun",
        "description": "A pronoun that shows ownership.",
        "examples": ["my", "your", "his", "her", "its"]
    },
    "RB": {
        "title": "Adverb",
        "description": "A word that modifies verbs, adjectives, or other adverbs, expressing manner, place, time, or degree.",
        "examples": ["quickly", "there", "very"]
    },
    "RBR": {
        "title": "Adverb, comparative",
        "description": "An adverb that compares two actions.",
        "examples": ["quicker", "more quickly", "less quickly"]
    },
    "RBS": {
        "title": "Adverb, superlative",
        "description": "An adverb that describes the highest degree of an action.",
        "examples": ["quickest", "most quickly"]
    },
    "RP": {
        "title": "Particle",
        "description": "A word that is used with verbs to create phrasal verbs.",
        "examples": ["up", "out", "on"]
    },
    "SYM": {
        "title": "Symbol",
        "description": "A character used as a conventional representation of an object, function, or process.",
        "examples": ["&", "%", "$"]
    },
    "TO": {
        "title": "Preposition/Infinitival to",
        "description": "A preposition or a part of an infinitive verb.",
        "examples": ["to the store", "to run"]
    },
    "UH": {
        "title": "Interjection",
        "description": "An exclamation, especially as a part of speech, e.g., ah! or dear me!.",
        "examples": ["oh", "wow", "uh"]
    },
    "VB": {
        "title": "Verb, base form",
        "description": "The basic form of a verb from which other forms are derived.",
        "examples": ["be", "have", "do"]
    },
    "VBD": {
        "title": "Verb, past tense",
        "description": "A verb form that indicates actions or states in the past.",
        "examples": ["was", "had", "did"]
    },
    "VBG": {
        "title": "Verb, gerund or present participle",
        "description": "A verb form that ends in -ing and functions as a noun or modifies nouns.",
        "examples": ["running", "having", "doing"]
    },
    "VBN": {
        "title": "Verb, past participle",
        "description": "A verb form that typically ends in -ed or -en and is used to form passive verb tenses or adjectives.",
        "examples": ["eaten", "written", "done"]
    },
    "VBP": {
        "title": "Verb, non-3rd person singular present",
        "description": "A verb form that does not agree with third-person singular subjects in the present tense.",
        "examples": ["am", "have", "run"]
    },
    "VBZ": {
        "title": "Verb, 3rd person singular present",
        "description": "A verb form that agrees with third-person singular subjects in the present tense.",
        "examples": ["is", "has", "runs"]
    },
    "WDT": {
        "title": "Wh-determiner",
        "description": "A determiner that introduces a relative clause, typically referring back to something previously mentioned.",
        "examples": ["which", "that", "what"]
    },
    "WP": {
        "title": "Wh-pronoun",
        "description": "A pronoun that introduces a relative clause, referring back to something previously mentioned.",
        "examples": ["who", "whom", "whose"]
    },
    "WP$": {
        "title": "Possessive wh-pronoun",
        "description": "A pronoun that shows ownership and introduces a relative clause.",
        "examples": ["whose"]
    },
    "WRB": {
        "title": "Wh-adverb",
        "description": "An adverb that introduces a question or relative clause.",
        "examples": ["where", "when", "why"]
    }
};
Object.seal(PART_OF_SPEECH_MAP);
Object.freeze(PART_OF_SPEECH_MAP);
exports.default = Object.assign(Object.assign({}, stopWords_1.default), { stemmer: stemmer_1.default,
    PART_OF_SPEECH_MAP });
