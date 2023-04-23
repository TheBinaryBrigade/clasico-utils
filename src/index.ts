import check from "./check";
import parser from "./eval";
import inflection from "./inlfection";
import utils from "./utils";
import * as types from "./@types";

export default {
  check,
  parser,
  inflection,
  utils,

  ...types,
};
