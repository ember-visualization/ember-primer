import Helper from 'ember-helper';
import largestTriangeThreeBucketsSample from 'ember-primer/utils/largest-triangle-three-bucket-sample';

export function pSample([data], hash) {
  try {
    return largestTriangeThreeBucketsSample(data, hash.threshold || 500);
  } catch(err) {
    return data;
  }
}

export default Helper.helper(pSample);
