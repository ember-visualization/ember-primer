import Helper from '@ember/component/helper';
import { scaleOrdinal as ordinal } from 'd3-scale';
import scaleHelperOptions from 'ember-primer/utils/scale-helper-options';

export function scaleOrdinal([domain, range], hash = {}) {
  let scale = ordinal();
  scaleHelperOptions(scale, domain, range, hash);
  return scale;
}

export default Helper.helper(scaleOrdinal);
