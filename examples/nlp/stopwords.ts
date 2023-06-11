/* tslint:disable:no-console */

import clasico from "../../src/index";

const input = "Don't forget to bring your ID, and don't be late!";
const expected = "forget bring ID, late!";

const output = clasico.nlp.removeStopWords(input);
if (output !== expected) {
  console.error("Failed to remove stopwords", {
    output,
    expected
  });
  process.exit(1);
}
