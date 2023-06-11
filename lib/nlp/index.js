"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stopWords_1 = require("./stopWords");
const stemmer_1 = require("./stemmer");
exports.default = Object.assign(Object.assign({}, stopWords_1.default), { stemmer: stemmer_1.default });
