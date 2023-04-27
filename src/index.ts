import * as types from "./@types";
import array from "./array";
import check from "./check";
import date from "./date";
import diff from "./diff";
import parser from "./eval";
import fuzzy from "./fuzzy";
import inflection from "./inflection";
import * as std from "./std";
import utils from "./utils";

export default {
  check,
  parser,
  inflection,
  utils,
  date,
  fuzzy,
  array,
  diff,
  std,
  ...types,
};
