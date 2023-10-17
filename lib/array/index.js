"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sorted = require("./sorted");
const zip_1 = require("./zip");
const remove_duplicates_1 = require("./remove.duplicates");
exports.default = Object.assign(Object.assign({}, sorted), { chunkArray: zip_1.chunkArray,
    noDuplicates: remove_duplicates_1.noDuplicates,
    walkBackString: remove_duplicates_1.walkBackString,
    findAllCommonPrefixes: remove_duplicates_1.findAllCommonPrefixes,
    removeDuplicates: remove_duplicates_1.removeDuplicates,
    zip: zip_1.zip });
