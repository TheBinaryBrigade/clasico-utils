
import { describe, expect, test } from "@jest/globals";
import fuzzy from "..";

describe("fuzzy", () => {
  test("similarity", () => {
    expect(fuzzy.similarity("Dog", "Dog")).toBe(1);
    expect(fuzzy.similarity("WolfmanJackIsDaBomb", "WolfmanJackIsDaBest")).toBe(0.8);
    expect(fuzzy.similarity("DateCreated", "CreatedDate")).toBe(0.5833333333333334);
    expect(fuzzy.similarity("a", "b")).toBe(0);
    expect(fuzzy.similarity("CreateDt", "DateCreted")).toBe(0.45454545454545453);
    expect(fuzzy.similarity("Phyllis", "PyllisX")).toBe(0.625);
    expect(fuzzy.similarity("Phyllis", "Pylhlis")).toBe(0.625);
    expect(fuzzy.similarity("cat", "cut")).toBe(0.5);
    expect(fuzzy.similarity("cat", "Cnut")).toBe(0.4);
    expect(fuzzy.similarity("cc", "Cccccccccccccccccccccccccccccccc")).toBe(0.09090909090909091);
    expect(fuzzy.similarity("ab", "ababababababababababababababab")).toBe(0.0967741935483871);
    expect(fuzzy.similarity("a whole long thing", "a")).toBe(0.10526315789473684);
    expect(fuzzy.similarity("a", "a whole long thing")).toBe(0.10526315789473684);
    expect(fuzzy.similarity("", "a non empty string")).toBe(0);
    expect(fuzzy.similarity(null as unknown as string, "a non empty string")).toBe(0);
  });

  test("topSimilar", () => {
    const _expect = <T>(value: T, key: (obj: T) => string, topK: number, input: T[], output: T[]) => {
      const result = fuzzy.topSimilar(value, input, key, topK);
      expect(result.length).toBe(topK >= 0 ? topK : 5);
      expect(JSON.stringify(result.map(key))).toBe(JSON.stringify(output.map(key)));
    };

        type ExampleA = {
            foo: {
                bar: string,
            }
        };

        const searchA: ExampleA = {
          foo: {
            bar: "hello",
          }
        };
        const inputA: ExampleA[] = [
          { foo: { bar: "konnichiwa" } },
          { foo: { bar: "hola" } },
          { foo: { bar: "bye" } },
          { foo: { bar: "hrllo" } },
          { foo: { bar: "saludos" } },
          { foo: { bar: "hallo" } },
        ];
        const outputA: ExampleA[] = [
          { foo: { bar: "hrllo" } },
          { foo: { bar: "hallo" } },
          { foo: { bar: "hola" } },
        ];

        const outputB: ExampleA[] = [
          { foo: { bar: "hrllo" } },
          { foo: { bar: "hallo" } },
          { foo: { bar: "hola" } },
          { foo: { bar: "konnichiwa" } },
          { foo: { bar: "bye" } },
        ];

        _expect(
          /* search for */ searchA,
          /* key */(a) => a.foo.bar,
          /* return top */ outputA.length,
          /* search in */ inputA,
          /* expect */ outputA
        );

        _expect(
          /* search for */ searchA,
          /* key */(a) => a.foo.bar,
          /* return top */ -3,
          /* search in */ inputA,
          /* expect */ outputB.splice(0, 5)
        );
  });
});

