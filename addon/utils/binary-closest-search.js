const { abs } = Math;

/**
 * A simple binary search for the closest element by value. Assumes haystack is
 * sorted.
 * @param  {Number} needle
 * @param  {Array<Number>} haystack
 * @return {Number} The index of the closest match in haystack
 * @public
 */
export default function binaryClosestSearch(needle, haystack) {
  let haystackLength = haystack.length;
  let low = 0;
  let high = haystackLength - 1;
  let middle;
  while (low < high) {
    middle = low + high >>> 1;

    if (abs(haystack[middle] - needle) < abs(haystack[middle + 1] - needle)) {
      high = middle;
    } else {
      low = middle + 1;
    }
  }

  return low;
}
