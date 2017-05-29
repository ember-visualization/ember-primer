import { scaleLinear as linear } from 'd3-scale';
import scaleHelperOptions from '../utils/scale-helper-options';
import Helper from 'ember-helper';

export function scaleLinear([domain, range], hash) {
  let scale = linear();
  scaleHelperOptions(scale, domain, range, hash);
  return scale;
}

export default Helper.helper(scaleLinear);
