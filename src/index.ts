import * as types from "./@types";
import array from "./array";
import check from "./check";
import date from "./date";
import diff from "./diff";
import parser from "./template";
import fuzzy from "./fuzzy";
import inflection from "./inflection";
import utils from "./utils";

export default {
  check,
  /**
   * @deprecated change `parser` to `template`
   */
  parser,
  template: parser,
  inflection,
  utils,
  date,
  fuzzy,
  array,
  diff,
  ...types,
};
