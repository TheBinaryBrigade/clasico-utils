import clasico from "../../src/index";

const arr1 = [1, 2, 3, 4];
const arr2 = ["a", "b", "c"];

const expected = [
  [1, "a"],
  [2, "b"],
  [3, "c"],
];

let idx = 0;

for (const [e1, e2] of clasico.array.zip(arr1, arr2)) {   // USAGE 1: Correct
  if (e1 !== expected[idx][0]) {
    console.error(`${e1} did not match ${arr1[idx]}`);
    process.exit(1);
  }
  
  if (e2 !== expected[idx][1]) {
    console.error(`${e2} did not match ${arr2[idx]}`);
    process.exit(2);
  }
  
  ++idx;
}

const zipped = [...clasico.array.zip(arr1, arr2)];   // USAGE 2: Incorrect (but if needed)

if (JSON.stringify(zipped) !== JSON.stringify(expected)) {
  console.error("Failed to zip arrays");
  console.error("Got", zipped);
  console.error("Expected", expected);
  process.exit(3);
}
