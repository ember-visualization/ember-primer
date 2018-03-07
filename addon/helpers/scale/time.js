import Helper from '@ember/component/helper';
import { scaleTime as time } from 'd3-scale';
import scaleHelperOptions from 'ember-primer/utils/scale-helper-options';

export function scaleTime([domain, range], hash = {}) {
  let scale = time();
  scaleHelperOptions(scale, domain, range, hash);
  return scale;
}

export default Helper.helper(scaleTime);
