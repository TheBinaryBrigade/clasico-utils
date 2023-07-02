import * as sorted from "./sorted";
import {zip} from "./zip";
import {removeDuplicates, noDuplicates, walkBackString, findAllCommonPrefixes} from "./remove.duplicates";

export default {
  ...sorted,
  noDuplicates,
  walkBackString,
  findAllCommonPrefixes,
  removeDuplicates,
  zip,
};
