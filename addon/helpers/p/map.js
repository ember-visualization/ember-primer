import Helper from 'ember-helper';

export function pMap([values, accessor]) {
  return values.map(accessor);
}

export default Helper.helper(pMap);
