import binaryClosestSearch from 'dummy/utils/binary-closest-search';
import { module, test } from 'qunit';

import { range } from 'd3-array';

module('Unit | Utility | binary closest search');

const items = range(0, 1010, 10);

test('it finds the closest item by value', function(assert) {
  assert.equal(items[binaryClosestSearch(123, items)], 120);
  assert.equal(items[binaryClosestSearch(125, items)], 130);
  assert.equal(items[binaryClosestSearch(0, items)], 0);
  assert.equal(items[binaryClosestSearch(1, items)], 0);
  assert.equal(items[binaryClosestSearch(9, items)], 10);
  assert.equal(items[binaryClosestSearch(99, items)], 100);
  assert.equal(items[binaryClosestSearch(222, items)], 220);
  assert.equal(items[binaryClosestSearch(953, items)], 950);
  assert.equal(items[binaryClosestSearch(987, items)], 990);
  assert.equal(items[binaryClosestSearch(1000, items)], 1000);
  assert.equal(items[binaryClosestSearch(1001, items)], 1000);
});
