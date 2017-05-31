/*
 * The MIT License
Copyright (c) 2013 by Sveinn Steinarsson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

import { assert } from '@ember/debug';
const { floor, abs } = Math;

/**
 * Downsamples a dataset to threshold while maintaining the visual characteristics
 *
 * @param  {Array}  data      Array of number pairs [[x,y],[x,y]]
 * @param  {Number} threshold Downsample rate, typically a range between 0 and `data.length`.
 *                            A value of 0 disables sampling.
 *
 * @return {Array}            Array of downsampled values.
 * @public
 */
function largestTriangleThreeBuckets(data, threshold) {
  let dataLength = data.length;
  if (threshold >= dataLength || threshold === 0) {
    return data; // Nothing to do
  }

  assert('data should be an array of arrays representing [x,y] points in series', dataLength > 0 && data[0][0] && data[0][1]);

  let sampled = [];
  let sampledIndex = 0;

  // Bucket size. Leave room for start and end data points
  let every = (dataLength - 2) / (threshold - 2);

  let a,  // Initially a is the first point in the triangle
    maxAreaPoint,
    maxArea,
    area,
    nextA;

  a = 0;

  sampled[sampledIndex++] = data[a]; // Always add the first point

  for (let i = 0; i < threshold - 2; i++) {

    // Calculate point average for next bucket (containing c)
    let avgX = 0;
    let avgY = 0;
    let avgRangeStart  = floor((i + 1) * every) + 1;
    let avgRangeEnd    = floor((i + 2) * every) + 1;
    avgRangeEnd = avgRangeEnd < dataLength ? avgRangeEnd : dataLength;

    let avgRangeLength = avgRangeEnd - avgRangeStart;

    for (; avgRangeStart < avgRangeEnd; avgRangeStart++) {
      avgX += data[avgRangeStart][0] * 1; // * 1 enforces Number (value may be Date)
      avgY += data[avgRangeStart][1] * 1;
    }

    avgX /= avgRangeLength;
    avgY /= avgRangeLength;

    // Get the range for this bucket
    let rangeOffs = floor((i + 0) * every) + 1;
    let rangeTo   = floor((i + 1) * every) + 1;

    // Point a
    let pointAX = data[a][0] * 1; // enforce Number (value may be Date)
    let  pointAY = data[a][1] * 1;

    maxArea = area = -1;

    for (; rangeOffs < rangeTo; rangeOffs++) {
      // Calculate triangle area over three buckets
      area = abs((pointAX - avgX) * (data[rangeOffs][1] - pointAY)
                  - (pointAX - data[rangeOffs][0]) * (avgY - pointAY)
                ) * 0.5;
      if (area > maxArea) {
        maxArea = area;
        maxAreaPoint = data[rangeOffs];
        nextA = rangeOffs; // Next a is this b
      }
    }

    sampled[sampledIndex++] = maxAreaPoint; // Pick this point from the bucket
    a = nextA; // This a is the next a (chosen b)
  }

  sampled[sampledIndex++] = data[dataLength - 1]; // Always add last

  return sampled;
}

export default largestTriangleThreeBuckets;
