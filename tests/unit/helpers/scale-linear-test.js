
import { scaleLinear } from 'dummy/helpers/scale-linear';
import { module, test } from 'qunit';

module('Unit | Helper | scale linear');

test('creates a linear scale', function(assert) {
  let domain = [0, 10];
  let range = [0, 100];

  let scale = scaleLinear([domain, range]);
  assert.deepEqual(scale(5), 50);
  assert.deepEqual(scale.domain(), [0, 10]);
  assert.deepEqual(scale.range(), [0, 100]);
});
