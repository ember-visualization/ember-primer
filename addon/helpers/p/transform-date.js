import Helper from '@ember/component/helper';

export function pTransformDate(/* params , hash*/) {
  return (d) => new Date(d);
}

export default Helper.helper(pTransformDate);
