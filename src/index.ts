import check from "./check";
import parser from "./eval";
import inflection from "./inflection";
import date from "./date";
import array from "./array";
import fuzzy from "./fuzzy";
import utils from "./utils";

import * as types from "./@types";

export default {
  check,
  parser,
  inflection,
  utils,
  date,
  fuzzy,
  array,
  ...types,
};
