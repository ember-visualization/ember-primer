
import { pTransformDate } from 'dummy/helpers/p/transform-date';
import { module, test } from 'qunit';

module('Unit | Helper | p/transform date');

test('it transforms from timestamp to date', function(assert) {
  let control = (new Date()).valueOf();
  let transform = pTransformDate();
  let [result] = [control].map(transform);

  assert.equal(result.constructor.name, 'Date');
  assert.equal(result.valueOf(), control);
});
