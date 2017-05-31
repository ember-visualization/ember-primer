import largestTriangleThreeBucketSample from '../../../utils/largest-triangle-three-bucket-sample';
import { module, test } from 'qunit';

module('Unit | Utility | largest triangle three bucket sample');

const dummyDataSeries = [[1, 2], [2, 2], [3, 3], [4, 3], [5, 6], [6, 3], [7, 3], [8, 5], [9, 4], [10, 4], [11, 1], [12, 2]];

test('downsamples an array of values', function(assert) {
  let result = largestTriangleThreeBucketSample(dummyDataSeries, 3);
  assert.deepEqual(result, [[1, 2], [5, 6], [12, 2]]);
});

test('asserts valid data', function(assert) {
  assert.throws(function() {
    largestTriangleThreeBucketSample([1, 2, 3], 1);
  }, 'Assertion Failed: data should be an array of arrays representing [x,y] points in series');
});
