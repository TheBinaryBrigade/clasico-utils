/* tslint:disable:no-console */

import clasico from "../../src/index";

const arr1 = [1, 2, 3, 4];
const arr2 = ["a", "b", "c"];

const expectedOutput = [
  [1, "a"],
  [2, "b"],
  [3, "c"],
];

let idx = 0;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
for (const [output1, output2] of clasico.array.zip(arr1, arr2)) {   // USAGE 1: Correct
  const [expected1, expected2] = expectedOutput[idx];
  if (output1 !== expected1 || output2 !== expected2) {
    console.error("Failed to zip arrays", {idx});
    console.error("Got", [output1, output2]);
    console.error("Expected", [expected1, expected2]);
    process.exit(1);
  }

  ++idx;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const zipped: [number, string][] = [...clasico.array.zip(arr1, arr2)];   // USAGE 2: Incorrect (but if needed)

if (JSON.stringify(zipped) !== JSON.stringify(expectedOutput)) {
  console.error("Failed to zip arrays");
  console.error("Got", zipped);
  console.error("Expected", expectedOutput);
  process.exit(3);
}
