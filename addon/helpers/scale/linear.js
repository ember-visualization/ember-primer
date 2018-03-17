import Helper from 'ember-helper'
import { scaleLinear as linear } from 'd3-scale'
import scaleHelperOptions from 'ember-primer/utils/scale-helper-options'

export function scaleLinear([domain, range], hash = {}) {
  let scale = linear()
  scaleHelperOptions(scale, domain, range, hash)
  return scale
}

export default Helper.helper(scaleLinear)
