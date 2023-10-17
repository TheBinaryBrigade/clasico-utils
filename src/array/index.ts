import * as sorted from "./sorted";
import {zip, chunkArray} from "./zip";
import {removeDuplicates, noDuplicates, walkBackString, findAllCommonPrefixes} from "./remove.duplicates";

export default {
  ...sorted,
  chunkArray,
  noDuplicates,
  walkBackString,
  findAllCommonPrefixes,
  removeDuplicates,
  zip,
};
