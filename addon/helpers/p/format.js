import Helper from '@ember/component/helper';
import { format as d3Format } from 'd3-format';

export function format([value], hash) {
  let result;
  if (!hash.format) {
    hash.format = ',';
  }

  if (value < 1 && hash.ignoreSmallValues) {
    result = '< 1';
  } else {
    result = d3Format(hash.format)(value);
  }

  if (hash.suffix) {
    result = `${result} ${hash.suffix}`;
  }

  return result;
}

export default Helper.helper(format);
