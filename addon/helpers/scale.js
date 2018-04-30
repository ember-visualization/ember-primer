import Helper from 'ember-helper'
import { assert } from '@ember/debug'

/**
 * Scale helper scales input data with the supplied scales for x and y.
 *
 * @param  {Array} data Pairs
 * @param  {Object} hash
 * @return {Array} Scaled pairs
 * @public
 */

export function scale([data], hash = {}) {
  let { xScale, yScale } = hash

  assert('You must provide xScale', xScale)
  assert('You must provide yScale', yScale)

  if (data[0]) {
    let [sample] = data
    assert(
      'You must provide data in the format of [[x,y], [x,y], ...]',
      (sample[0] || sample[0] === 0) && (sample[1] || sample[1] === 0),
    )
  }

  return data.map(([x, y]) => [xScale(x), yScale(y)])
}

export default Helper.helper(scale)
