/* tslint:disable:no-console */

import clasico from "../../src/index";

const examples = [
  {input: "calmness", expected: "calm"},
  {input: "skies", expected: "sky"},
];

examples.forEach(({input, expected}) => {
  const output = clasico.nlp.stemmer(input);
  if (output !== expected) {
    console.error("Failed to stem word", {
      output,
      expected
    });
    process.exit(1);
  }
});
