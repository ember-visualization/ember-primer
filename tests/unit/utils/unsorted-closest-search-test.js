import unsortedClosestSearch from 'dummy/utils/unsorted-closest-search'
import { module, test } from 'qunit'

module('Unit | Utility | unsorted closest search')

const items = [-5, 29, 30, -20, 0, 1, 0.5, 100]

test('it finds the closest item by value', function(assert) {
  assert.equal(unsortedClosestSearch(123, items)[0], 100)
  assert.equal(unsortedClosestSearch(0.1, items)[0], 0)
  assert.equal(unsortedClosestSearch(0.4, items)[0], 0.5)
  assert.equal(unsortedClosestSearch(-10, items)[0], -5)
  assert.equal(unsortedClosestSearch(-1, items)[0], 0)
  assert.equal(unsortedClosestSearch(29, items)[0], 29)
  assert.equal(unsortedClosestSearch(28, items)[0], 29)
  assert.equal(unsortedClosestSearch(31, items)[0], 30)
})
