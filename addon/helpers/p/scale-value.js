import Helper from 'ember-helper';

export function scaleValue([scale, valueToScale]) {
  return scale(valueToScale);
}

export default Helper.helper(scaleValue);
