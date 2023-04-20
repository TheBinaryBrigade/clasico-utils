

import _eval, { BuiltInFunctionKey, Context } from "./index";

export type BuiltinExample = {
    input: {
        text: string,
        context?: Context,
    },
    output: string,
    notes?: string[],
};
export type BuiltinDoc = {
    description: string,
    examples: BuiltinExample[],
    isDeprecated: boolean,
    implementation?: string,
};

export type BuiltinDocs = {
    [key in BuiltInFunctionKey]: BuiltinDoc;
};

const docs: BuiltinDocs = {
  $abs: {
    description: "Return the absolute value of the argument.",
    examples: [
      {
        input: { text: "$abs(idx + 142)" },
        output: "42",
      },
      {
        input: {
          text: "$abs($x)",
          context: {
            vars: {
              $x: "hello, world!",
            },
          },
        },
        output: "NaN",
      },
    ],
    isDeprecated: false,
  },
  $all: {
    description: "Return `true` if `$bool(x)` is `true` for all values x in the passed arguments",
    examples: [
      {
        input: { text: "$all(true, false, true)" },
        output: "false",
      },
      {
        input: { text: "$all(true, true)" },
        output: "true",
      },
    ],
    isDeprecated: false,
  },
  $any: {
    description: "Return `true` if `$bool(x)` is `true` for any x in the passed arguments",
    examples: [
      {
        input: { text: "$any(true, false, true)" },
        output: "true",
      },
      {
        input: { text: "$any(true, true)" },
        output: "true",
      },
      {
        input: { text: "$any(false, false, false, false)" },
        output: "false",
      },
      {
        input: { text: "$any(false)" },
        output: "false",
      },
    ],
    isDeprecated: false,
  },
  $bool: {
    description: "Returns `true` when the argument x is `true`, False otherwise. If **not** a valid boolean it will check truthiness (`!!x`).",
    examples: [
      {
        input: { text: "$bool(false)" },
        output: "false",
      },
      {
        input: { text: "$bool(0)" },
        output: "false",
      },
      {
        input: { text: "$bool(0.0)" },
        output: "false",
      },
      {
        input: { text: "$bool(true)" },
        output: "true",
      },
      {
        input: { text: "$bool(1)" },
        output: "true",
      },
      {
        input: { text: "$bool(1.0)" },
        output: "true",
      },
      {
        input: {
          text: "$bool($x)",
          context: {
            vars: {
              $x: ""
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$bool($x)",
          context: {
            vars: {
              $x: "Hello, world!"
            }
          }
        },
        output: "true",
      },
    ],
    isDeprecated: false,
  },
  $float: {
    description: "Convert a string or number to a floating point number, if possible.",
    examples: [
      {
        input: { text: "$float()" },
        output: "NaN",
      },
      {
        input: { text: "$float(42)" },
        output: "42",
      },
      {
        input: {
          text: "$float($x)",
          context: {
            vars: {
              $x: "42.2"
            }
          }
        },
        output: "42.2",
      },
      {
        input: {
          text: "$float($x)",
          context: {
            vars: {
              $x: "hello"
            }
          }
        },
        output: "NaN",
      },
    ],
    isDeprecated: false,
  },
  $str: {
    description: "Create a new string object from the given object.",
    examples: [
      {
        input: {
          text: "$str($x)",
          context: {
            vars: {
              $x: false,
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$str($x)",
          context: {
            vars: {
              $x: 42,
            }
          }
        },
        output: "42",
      },
      {
        input: {
          text: "$str($x)",
          context: {
            vars: {
              $x: "Hello, World!",
            }
          }
        },
        output: "Hello, World!",
      },
      {
        input: {
          text: "$str($x)",
          context: {
            vars: {
              $x: { hello: "world" },
            }
          }
        },
        output: JSON.stringify({ hello: "world" }, null, 0),
      },
    ],
    isDeprecated: false,
  },
  $format: {
    description: "Pass values to a template string (see examples).",
    examples: [
      {
        input: {
          text: "$format($fmt, $name, $animal)",
          context: {
            vars: {
              $fmt: "This is {0} a {1}. {0} likes lasagna.",
              $name: "Garfield",
              $animal: "cat"
            },
          },
        },
        output: "This is Garfield a cat. Garfield likes lasagna.",
        notes: [
          "The argument's (index) position will indicate the placeholder value (i.e., `{index}`)",
        ]
      },
    ],
    isDeprecated: false,
  },
  $int: {
    description: "Convert a string or number to an integer, if possible.",
    examples: [
      {
        input: { text: "$int()" },
        output: "NaN",
      },
      {
        input: { text: "$int(42)" },
        output: "42",
      },
      {
        input: {
          text: "$int($x)",
          context: {
            vars: {
              $x: "42.2"
            }
          }
        },
        output: "42",
      },
      {
        input: {
          text: "$int($x)",
          context: {
            vars: {
              $x: "hello"
            }
          }
        },
        output: "NaN",
      },
    ],
    isDeprecated: false,
  },
  $isinstance: {
    description: "",
    examples: [
      {
        input: {
          text: "$isinstance($x, $strType, $numType)",
          context: {
            vars: {
              $x: "hello",
              $strType: "string",
              $numType: "number",
            }
          }
        },
        output: "true",
      },
      {
        input: {
          text: "$isinstance($x, $strType, $numType)",
          context: {
            vars: {
              $x: 42,
              $strType: "string",
              $numType: "number",
            }
          }
        },
        output: "true",
      },
      {
        input: {
          text: "$isinstance($x, $strType, $numType)",
          context: {
            vars: {
              $x: true,
              $strType: "string",
              $numType: "number",
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$isinstance($x, $boolType, $numType)",
          context: {
            vars: {
              $x: true,
              $boolType: "boolean",
            }
          }
        },
        output: "true",
      },
    ],
    isDeprecated: false,
  },
  $len: {
    description: "Will convert `x` into a string and calculate its `length`/`characters`",
    examples: [
      {
        input: {
          text: "$len($x)",
          context: { vars: { $x: true } }
        },
        output: `${true}`.length + "",
      },
      {
        input: {
          text: "$len($x)",
          context: { vars: { $x: 42 } }
        },
        output: `${42}`.length + "",
      },
      {
        input: {
          text: "$len($x)",
          context: { vars: { $x: "Hello" } }
        },
        output: "Hello".length + "",
      },
      {
        input: {
          text: "$len($x)",
          context: { vars: { $x: {hello: "world!"} } }
        },
        output: JSON.stringify({hello: "world!"}, null, 0).length + "",
      },
    ],
    isDeprecated: false,
  },
  $max: {
    description: "Will return biggest item in arguments. It will convert all items into strins and parse them into floats (see impl)",
    examples: [
      {
        input: {
          text: "$max(1, 2, 3, 4, $x)",
          context: { vars: { $x: true } }
        },
        output: "4",
      },
      {
        input: {
          text: "$max(1, 2, 3, 4, $x)",
          context: { vars: { $x: 50 } }
        },
        output: "50",
      },
      {
        input: {
          text: "$max(1, 2, 3, 4, $x)",
          context: { vars: { $x: "hello" } }
        },
        output: "4",
      },
      {
        input: {
          text: "$max(1, 2, 3, 4, $x)",
          context: { vars: { $x: -1 } }
        },
        output: "4",
      },
    ],
    isDeprecated: false,
  },
  $min: {
    description: "Will return smallest item in arguments. It will convert all items into strins and parse them into floats (see impl)",
    examples: [
      {
        input: {
          text: "$min(1, 2, 3, 4, $x)",
          context: { vars: { $x: true } }
        },
        output: "1",
      },
      {
        input: {
          text: "$min(1, 2, 3, 4, $x)",
          context: { vars: { $x: 50 } }
        },
        output: "1",
      },
      {
        input: {
          text: "$min(1, 3, 4, $x, 2)",
          context: { vars: { $x: "hello" } }
        },
        output: "1",
      },
      {
        input: {
          text: "$min(1, 2, 3, $x)",
          context: { vars: { $x: -1 } }
        },
        output: "-1",
      },
    ],
    isDeprecated: false,
  },
  $pow: {
    description: "Will take `x` to the power of `y` (`x ^ y`)",
    examples: [
      {
        input: {
          text: "$pow(1, 1)",
        },
        output: Math.pow(1, 1) + "",
      },
      {
        input: {
          text: "$pow(2, 1)",
        },
        output: Math.pow(2, 1) + "",
      },
      {
        input: {
          text: "$pow(2, 42)",
        },
        output: Math.pow(2, 42) + "",
      },
    ],
    isDeprecated: false,
  },
  $round: {
    description: "Returns a supplied numeric expression rounded to the nearest integer.",
    examples: [
      {
        input: {
          text: "$round(2.020)",
        },
        output: "2",
      },
      {
        input: {
          text: "$round(2)",
        },
        output: "2",
      },
      {
        input: {
          text: "$round(2.202)",
        },
        output: "2",
      },
      {
        input: {
          text: "$round(true)",
        },
        output: "NaN",
      },
    ],
    isDeprecated: false,
  },
  $substring: {
    description: "Will coerce `x` into a string and slice it on `start` and `end`",
    examples: [
      {
        input: {
          text: "$substring($x, 0, 4)",
          context: { vars: { $x: "hello" } }
        },
        output: "hell",
      },
      {
        input: {
          text: "$substring($x, 1)",
          context: { vars: { $x: "hello" } }
        },
        output: "ello",
      },
      {
        input: {
          text: "$substring($x)",
          context: { vars: { $x: "hello" } }
        },
        output: "hello",
      },
      {
        input: {
          text: "$substring($x, 0, $len($x) - 1)",
          context: { vars: { $x: "hello" } }
        },
        output: "hell",
      },
    ],
    isDeprecated: false,
  },
  $type: {
    description: "Returns `typeof x`",
    examples: [
      {
        input: {
          text: "$type($x)",
          context: {
            vars: {
              $x: "hello",
            }
          }
        },
        output: "string",
      },
      {
        input: {
          text: "$type($x)",
          context: {
            vars: {
              $x: 42,
            }
          }
        },
        output: "number",
      },
      {
        input: {
          text: "$type($x)",
          context: {
            vars: {
              $x: true,
            }
          }
        },
        output: "boolean",
      },
      {
        input: {
          text: "$type($x)",
          context: {
            vars: {
              $x: undefined,
            }
          }
        },
        output: "undefined",
      },
      {
        input: {
          text: "$type($x)",
          context: {
            vars: {
              $x: { hello: "42" },
            }
          }
        },
        output: "object",
      },
    ],
    isDeprecated: false,
  },
  $math: {
    description: "An intrinsic function that provides basic mathematics functionality and constants. It will call the `Math` object in the `js` impl.",
    examples: [
      {
        input: {
          text: "$math($PI)",
          context: {
            vars: {
              $PI: "PI",
            }
          }
        },
        output: Math.PI + "",
      },
      {
        input: {
          text: "$math($cos, 90)",
          context: {
            vars: {
              $cos: "cos",
            }
          }
        },
        output: Math.cos(90) + "", 
      },
      {
        input: {
          text: "$math($x, 90)",
          context: {
            vars: {
              $x: "someUnknownFunction",
            }
          }
        },
        output: "Math.someUnknownFunction(90)", 
      },
      {
        input: {
          text: "$math($x)",
          context: {
            vars: {
              $x: "someUnknownVar",
            }
          }
        },
        output: "Math.someUnknownVar", 
      },
    ],
    isDeprecated: false,
  },
  $getattr: {
    description: "Get attribute of an oject",
    examples: [
      {
        input: {
          text: "$getattr($x, $lenAttr)",
          context: {
            vars: {
              $x: "some string",
              $lenAttr: "length"
            }
          }
        },
        output: "some string".length + "", 
      },
      {
        input: {
          text: "$getattr($x, $attr)",
          context: {
            vars: {
              $x: {
                some: {
                  deep: {
                    object: 42
                  }
                }
              },
              $attr: "some.deep.object"
            }
          }
        },
        output: "42", 
      },
      {
        input: {
          text: "$getattr($x, $attrsome, $attrdeep, $attrobject)",
          context: {
            vars: {
              $x: {
                some: {
                  deep: {
                    object: 42
                  }
                }
              },
              $attrsome: "some",
              $attrdeep: "deep",
              $attrobject: "object",
            }
          }
        },
        output: "42", 
      },
      {
        input: {
          text: "$getattr($x, $attrsome, $attrdeep, $attrdeep)",
          context: {
            vars: {
              $x: {
                "some.tricky": {
                  deep: {
                    object: 42
                  }
                }
              },
              $attrsome: "some.tricky",
              $attrdeep: "deep.object",
            }
          }
        },
        output: "42", 
      },
    ],
    isDeprecated: false,
  },
  $tisstring: {
    description: "Wrapper for `$isinstance(x, 'string')`",
    examples: [
      {
        input: {
          text: "$tisstring($x)",
          context: {
            vars: {
              $x: "hello",
            }
          }
        },
        output: "true",
      },
      {
        input: {
          text: "$tisstring($x)",
          context: {
            vars: {
              $x: 42,
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$tisstring($x)",
          context: {
            vars: {
              $x: true,
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$tisstring($x)",
          context: {
            vars: {
              $x: undefined,
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$tisstring($x)",
          context: {
            vars: {
              $x: { hello: "42" },
            }
          }
        },
        output: "false",
      },
    ],
    isDeprecated: false,
  },
  $tisnumber: {
    description: "Wrapper for `$isinstance(x, 'number', 'bigint')`",
    examples: [
      {
        input: {
          text: "$tisnumber($x)",
          context: {
            vars: {
              $x: "hello",
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$tisnumber($x)",
          context: {
            vars: {
              $x: 42,
            }
          }
        },
        output: "true",
      },
      {
        input: {
          text: "$tisnumber($x)",
          context: {
            vars: {
              $x: true,
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$tisnumber($x)",
          context: {
            vars: {
              $x: undefined,
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$tisnumber($x)",
          context: {
            vars: {
              $x: { hello: "42" },
            }
          }
        },
        output: "false",
      },
    ],
    isDeprecated: false,
  },
  $tisundefined: {
    description: "Wrapper for `$isinstance(x, 'undefined')`",
    examples: [
      {
        input: {
          text: "$tisundefined($x)",
          context: {
            vars: {
              $x: "hello",
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$tisundefined($x)",
          context: {
            vars: {
              $x: 42,
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$tisundefined($x)",
          context: {
            vars: {
              $x: true,
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$tisundefined($x)",
          context: {
            vars: {
              $x: undefined,
            }
          }
        },
        output: "true",
      },
      {
        input: {
          text: "$tisundefined($x)",
          context: {
            vars: {
              $x: { hello: "42" },
            }
          }
        },
        output: "false",
      },
    ],
    isDeprecated: false,
  },
  $tisobject: {
    description: "Wrapper for `$isinstance(x, 'object')`",
    examples: [
      {
        input: {
          text: "$tisobject($x)",
          context: {
            vars: {
              $x: "hello",
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$tisobject($x)",
          context: {
            vars: {
              $x: 42,
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$tisobject($x)",
          context: {
            vars: {
              $x: true,
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$tisobject($x)",
          context: {
            vars: {
              $x: undefined,
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$tisobject($x)",
          context: {
            vars: {
              $x: { hello: "42" },
            }
          }
        },
        output: "true",
      },
    ],
    isDeprecated: false,
  },
  $tisboolean: {
    description: "Wrapper for `$isinstance(x, 'boolean')`",
    examples: [
      {
        input: {
          text: "$tisboolean($x)",
          context: {
            vars: {
              $x: "hello",
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$tisboolean($x)",
          context: {
            vars: {
              $x: 42,
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$tisboolean($x)",
          context: {
            vars: {
              $x: true,
            }
          }
        },
        output: "true",
      },
      {
        input: {
          text: "$tisboolean($x)",
          context: {
            vars: {
              $x: undefined,
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$tisboolean($x)",
          context: {
            vars: {
              $x: { hello: "42" },
            }
          }
        },
        output: "false",
      },
    ],
    isDeprecated: false,
  },
  $isnil: {
    description: "Returns `true` if `x` is `undefined` **or** `null`",
    examples: [
      {
        input: {
          text: "$isnil($x)",
          context: {
            vars: {
              $x: null,
            }
          }
        },
        output: "true",
      },
      {
        input: {
          text: "$isnil($x)",
          context: {
            vars: {
              $x: undefined,
            }
          }
        },
        output: "true",
      },
      {
        input: {
          text: "$isnil($x)",
          context: {
            vars: {
              $x: { hello: "42" },
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$isnil($x)",
          context: {
            vars: {
              $x: 0,
            }
          }
        },
        output: "false",
      },
      {
        input: {
          text: "$isnil($x)",
          context: {
            vars: {
              $x: "",
            }
          }
        },
        output: "false",
      },

    ],
    isDeprecated: false,
  },
};


(() => {
  const builtins = _eval.builtinFunctions();
  const keys = Object.keys(builtins) as BuiltInFunctionKey[];
  keys.forEach((key) => {
    docs[key].implementation = builtins[key].toString();

    if (!docs[key].examples) {
      console.warn(`WARN: ${key} in docs doesn't have any examples.`);
    }

    docs[key].examples.forEach((example, index) => {
      if (!example.input.text.includes(key)) {
        console.warn(`WARN: Example in ${key} doesn't contains itself (mssing ${key} in example #${index})`);
      }
    });

  });
})();


export default docs;