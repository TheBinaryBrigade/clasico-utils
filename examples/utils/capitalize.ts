import clasico from "../../src/index";

const expect = (a: unknown, b: unknown) => {
  if (a !== b) {
    console.error(a);
    console.error(b);
    console.error("Expected output did not match result");
    process.exit(1);
  }
};

const hello = clasico.utils.capitalize("hello");
console.log("hello", hello);
expect(hello, /* to be */ "Hello");

const helloWorld = clasico.utils.capitalize("hello, world!");
console.log("hello, world!", hello);
expect(helloWorld, /* to be */ "Hello, world!");
