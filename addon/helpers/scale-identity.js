import { scaleIdentity } from 'd3-scale';
import scaleHelperOptions from '../utils/scale-helper-options';
import Helper from '@ember/component/helper';

export function helper([domain, range], hash) {
  let scale = scaleIdentity();
  scaleHelperOptions(scale, domain, range, hash);
  return scale;
}

export default Helper.helper(helper);
