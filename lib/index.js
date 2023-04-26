"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("./check");
const eval_1 = require("./eval");
const inflection_1 = require("./inflection");
const date_1 = require("./date");
const array_1 = require("./array");
const fuzzy_1 = require("./fuzzy");
const utils_1 = require("./utils");
const types = require("./@types");
exports.default = Object.assign({ check: check_1.default,
    parser: eval_1.default,
    inflection: inflection_1.default,
    utils: utils_1.default,
    date: date_1.default,
    fuzzy: fuzzy_1.default,
    array: array_1.default }, types);
