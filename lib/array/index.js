"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sorted = require("./sorted");
const zip_1 = require("./zip");
exports.default = Object.assign(Object.assign({}, sorted), { zip: zip_1.zip });
