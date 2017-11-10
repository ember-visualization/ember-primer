import transformString from 'dummy/utils/transform-string'
import { module, test } from 'qunit'

module('Unit | Utility | transform string')

test('it returns a transform string from objects', function(assert) {
  let result = transformString({ rotate: 12 }, { translate: [10, 10] })
  assert.deepEqual(result, 'rotate(12) translate(10,10)', 'transform string')
})

test('it returns a transform string from an object', function(assert) {
  let result = transformString({ rotate: 12, translate: [10, 10] })
  assert.deepEqual(result, 'rotate(12) translate(10,10)', 'transform string')
})
