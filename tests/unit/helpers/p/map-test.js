
import { pMap } from 'dummy/helpers/p/map';
import { pAccessor } from 'dummy/helpers/p/accessor';
import { pTransformDate } from 'dummy/helpers/p/transform-date';

import { module, test } from 'qunit';

module('Unit | Helper | p/map');

const values = [
  [1497021135000, 1],
  [1497021136000, 2]
];

test('it returns mapped values', function(assert) {
  let xValues = pMap([values, pAccessor(['$0', pTransformDate()])]);
  let isoString = (d) => d.toISOString();
  assert.deepEqual(xValues.map(isoString), ['2017-06-09T15:12:15.000Z', '2017-06-09T15:12:16.000Z']);
});
