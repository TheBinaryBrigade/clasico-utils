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