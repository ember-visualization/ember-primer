import Helper from '@ember/component/helper';

export function pMap([values, accessor]) {
  return values.map(accessor);
}

export default Helper.helper(pMap);
