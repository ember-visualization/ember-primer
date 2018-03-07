import Helper from '@ember/component/helper';

export function pAccessor([key, transform]) {
  let match = key.match(/\$(\d+)/);

  if (match) {
    let [, index] = match;
    return transform ? (d) => transform(d[index]) : (d)=> d[index];
  } else {
    return transform ? (d) => transform(d[key]) : (d)=> d[key];
  }
}

export default Helper.helper(pAccessor);
