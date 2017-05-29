import { scaleLinear } from 'd3-scale';
import scaleHelperOptions from '../utils/scale-helper-options';
import Helper from 'ember-helper';

export function linearScale([domain, range], hash) {
  let scale = scaleLinear();
  scaleHelperOptions(scale, domain, range, hash);
  return scale;
}

export default Helper.helper(linearScale);
