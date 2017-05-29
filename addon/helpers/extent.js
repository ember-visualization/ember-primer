import Helper from 'ember-helper';
import { extent } from 'd3-array';

export function helper(array, hash = {}) {
  if (hash.key) {
    let match = hash.key.match(/\$(\d+)/);
    if (match) {
      let [, index] = match;
      return extent(array, (d) => d[index]);
    } else {
      return extent(array, (d) => d[hash.key]);
    }
  } else {
    return extent(array);
  }
}

export default Helper.helper(helper);
