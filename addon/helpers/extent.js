import Helper from 'ember-helper';
import { extent, ascending } from 'd3-array';

export function helper([array], hash = {}) {
  let finalArray = [];

  if (hash && hash.key) {
    let match = hash.key.match(/\$(\d+)/);
    if (match) {
      let [, index] = match;
      finalArray = array.map((d) => d[index]);
    } else {
      finalArray = array.map((d) => d[hash.key]);
    }
  } else {
    finalArray = array;
  }
  return extent(finalArray.sort(ascending));
}

export default Helper.helper(helper);
