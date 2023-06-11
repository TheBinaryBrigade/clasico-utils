import { describe, test, expect } from "@jest/globals";

import nlp from "..";

describe("remove stop words", () => {
  test("", () => {
    const input = "I am a person, I swear!";
    const expected = "person, swear!";

    expect(nlp.removeStopWords(input)).toBe(expected);
  });

  test("Empty input string", () => {
    const input = "";
    const expected = "";

    expect(nlp.removeStopWords(input)).toBe(expected);
  });

  test("No stopwords in the input string", () => {
    const input = "This is a test sentence";
    const expected = "test sentence";

    expect(nlp.removeStopWords(input)).toBe(expected);
  });

  test("Input string with only stopwords", () => {
    const input = "I am the and to of";
    const expected = "";

    expect(nlp.removeStopWords(input)).toBe(expected);
  });

  test("Input string with mixed stopwords and non-stopwords", () => {
    const input = "I wasn't going to say anything";
    const expected = "going say anything";

    expect(nlp.removeStopWords(input)).toBe(expected);
  });

  test("Input string with stopwords and punctuation", () => {
    const input = "Don't forget to bring your ID, and don't be late!";
    const expected = "forget bring ID, late!";

    expect(nlp.removeStopWords(input)).toBe(expected);
  });
});

describe("stemmer", () => {
  test("should handle basic stemming", () => {
    expect(nlp.stemmer("jumped")).toBe("jump");
    expect(nlp.stemmer("running")).toBe("run");
    expect(nlp.stemmer("cats")).toBe("cat");
  });

  test("should handle plural forms", () => {
    expect(nlp.stemmer("dogs")).toBe("dog");
    expect(nlp.stemmer("cities")).toBe("city");
    expect(nlp.stemmer("wolves")).toBe("wolv");
  });

  test("should handle past tense", () => {
    expect(nlp.stemmer("played")).toBe("play");
    expect(nlp.stemmer("hoped")).toBe("hope");
    expect(nlp.stemmer("studied")).toBe("studi");
  });

  test("should handle adjectives and adverbs", () => {
    expect(nlp.stemmer("beautifully")).toBe("beauti");
    expect(nlp.stemmer("quickly")).toBe("quick");
    expect(nlp.stemmer("calmness")).toBe("calm");
  });

  test("should handle specific cases", () => {
    expect(nlp.stemmer("relational")).toBe("relat");
    expect(nlp.stemmer("jumping")).toBe("jump");
    expect(nlp.stemmer("skies")).toBe("sky");
  });

  test("should not stem already stemmed words", () => {
    expect(nlp.stemmer("running")).toBe("run");
    expect(nlp.stemmer("dogs")).toBe("dog");
    expect(nlp.stemmer("beautiful")).toBe("beauti");
  });

  test("should not modify words without applicable stemming rules", () => {
    expect(nlp.stemmer("open")).toBe("open");
    expect(nlp.stemmer("programming")).toBe("program");
    expect(nlp.stemmer("awesome")).toBe("awesom");
  });
});
