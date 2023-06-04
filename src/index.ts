import * as types from "./@types";
import array from "./array";
import check from "./check";
import date from "./date";
import diff from "./diff";
import template from "./template";
import fuzzy from "./fuzzy";
import inflection from "./inflection";
import utils from "./utils";
import nlp from "./nlp";

export default {
  check,
  /**
   * @deprecated change `parser` to `template`
   */
  parser: template,
  template,
  inflection,
  utils,
  date,
  fuzzy,
  array,
  diff,
  nlp,
  ...types,
};
