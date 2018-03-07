import Helper from '@ember/component/helper';

export function scaleValue([scale, valueToScale]) {
  return scale(valueToScale);
}

export default Helper.helper(scaleValue);
