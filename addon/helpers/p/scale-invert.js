import Helper from '@ember/component/helper';

export function pScaleInvert([scale, valueToInvert]) {
  return scale.invert(valueToInvert);
}

export default Helper.helper(pScaleInvert);
