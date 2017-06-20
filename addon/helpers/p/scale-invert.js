import Helper from 'ember-helper';

export function pScaleInvert([scale, valueToInvert]) {
  return scale.invert(valueToInvert);
}

export default Helper.helper(pScaleInvert);
