
import { pAccessor } from 'dummy/helpers/p/accessor';
import { module, test } from 'qunit';

module('Unit | Helper | p/accessor');

const tuples = [
  [1, 10],
  [2, 11],
  [3, 12],
  [4, 13]
];

const objects = [
  { date: '2017-1-1', value: 100 },
  { date: '2017-1-2', value: 101 },
  { date: '2017-1-3', value: 102 },
  { date: '2017-1-4', value: 103 }
];

test('it returns an access function for index keys', function(assert) {
  let accessFn = pAccessor(['$1']);
  assert.deepEqual(tuples.map(accessFn), [10, 11, 12, 13]);
  accessFn = pAccessor(['$0']);
  assert.deepEqual(tuples.map(accessFn), [1, 2, 3, 4]);
});

test('it returns an access function for object keys', function(assert) {
  let accessFn = pAccessor(['date']);
  assert.deepEqual(objects.map(accessFn), ['2017-1-1', '2017-1-2', '2017-1-3', '2017-1-4']);
});

test('it returns a transformed value when given a tranform', function(assert) {
  let accessFn = pAccessor(['date', (d) => new Date(d)]);
  let isoDate = (d) => d.toISOString();
  assert.deepEqual(objects.map(accessFn).map(isoDate), [
    '2016-12-31T23:00:00.000Z',
    '2017-01-01T23:00:00.000Z',
    '2017-01-02T23:00:00.000Z',
    '2017-01-03T23:00:00.000Z'
  ]);
});

