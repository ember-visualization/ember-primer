import { extent } from 'dummy/helpers/extent'
import { module, test } from 'qunit'

module('Unit | Helper | extent')

test('returns extent using key from object', function(assert) {
  let data = [{ x: 1, y: 1 }, { x: 3, y: 3 }, { x: 2, y: 2 }]

  let result = extent([data], { key: 'x' })
  assert.deepEqual(result, [1, 3])
})

test('returns extent using key from array index', function(assert) {
  let data = [[1, 1], [3, 3], [2, 2]]

  let result = extent([data], { key: '$0' })
  assert.deepEqual(result, [1, 3])
})

test('returns extent of flat array', function(assert) {
  let data = [1, 2, 5, 6, 3, 4, 5, 6, 7]

  let result = extent([data])
  assert.deepEqual(result, [1, 7])
})

test('returns inclusive values for ordinal scales', function(assert) {
  let data = ['Jan', 'Feb', 'Mar']

  let result = extent([data], { inclusive: true })
  assert.deepEqual(result, ['Jan', 'Feb', 'Mar'])
})
