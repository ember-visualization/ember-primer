import Helper from 'ember-helper';
import { assert } from '@ember/debug';

/**
 * Scale helper scales input data with the supplied scales for x and y.
 *
 * @param  {Array} data Pairs
 * @param  {Object} hash
 * @return {Array} Scaled pairs
 * @public
 */
export function scale([data], hash = {}) {
  let { xScale, yScale } = hash;

  assert('You must provide xScale', xScale);
  assert('You must provide yScale', yScale);

  if (data[0]) {
    assert('You must provide data in the format of [[x,y], [x,y], ...]', data[0][0] && data[0][1]);
  }

  return data.map(([x, y]) => [xScale(x), yScale(y)]);
}

export default Helper.helper(scale);
