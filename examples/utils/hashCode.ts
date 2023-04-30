import clasico from "../../src/index";

const expect = (a: unknown, b: unknown) => {
  if (a !== b) {
    console.error(a);
    console.error(b);
    console.error("Expected output did not match result");
    process.exit(1);
  }
};

const hello = clasico.utils.hashCode("hello");
console.log("hello", hello);
expect(typeof hello, /* to be */ "number");

// by default it'll stringify the input
const ok = clasico.utils.hashCode({ hello: 42 });
console.log("{hello: 42}", ok);
expect(typeof ok, /* to be */ "number");

// pass false to only hash strings
const failure = clasico.utils.hashCode({ hello: 42 }, false);
console.log("failure", failure);
expect(failure, /* to be */ null);
