"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types = require("./@types");
const array_1 = require("./array");
const check_1 = require("./check");
const date_1 = require("./date");
const diff_1 = require("./diff");
const template_1 = require("./template");
const fuzzy_1 = require("./fuzzy");
const inflection_1 = require("./inflection");
const utils_1 = require("./utils");
const nlp_1 = require("./nlp");
exports.default = Object.assign({ check: check_1.default, 
    /**
     * @deprecated change `parser` to `template`
     */
    parser: template_1.default, template: template_1.default,
    inflection: inflection_1.default,
    utils: utils_1.default,
    date: date_1.default,
    fuzzy: fuzzy_1.default,
    array: array_1.default,
    diff: diff_1.default,
    nlp: nlp_1.default }, types);
