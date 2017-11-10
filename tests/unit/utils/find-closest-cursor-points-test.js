import findClosestCursorPoints from 'dummy/utils/find-closest-cursor-points'
import { module, test } from 'qunit'
import { scaleLinear } from 'd3-scale'

import { range, extent, max, ascending } from 'd3-array'

module('Unit | Utility | find closest cursor points')

/*
 * This tests a multi-series data set, where the first value on each point is the
 * timestamp, which is the X axis, and all subsequent values are renders on the Y
 * axis.
 *
 * The result of this function should be all values on the Y axis in original order.
 */

test('it finds the closest points from the cursor', function(assert) {
  let xValues = range(0, 1000, 10)

  let values = xValues.map(x => {
    return [x, 10, 20, 30, 40]
  })

  let maxY = max(
    values.map(d => {
      let [, ...yValues] = d
      return max(yValues.sort(ascending))
    }),
  )

  let xScale = scaleLinear()
    .domain(extent(values, d => d[0]))
    .range([0, 1000])
  let yScale = scaleLinear()
    .domain([0, maxY])
    .range([500, 0])

  let xActual = xScale(20)
  let yActuals = [10, 20, 30, 40].map(yScale)

  let result = findClosestCursorPoints(
    [xActual + 3, yActuals[1] + 9],
    [0, 0],
    xScale,
    yScale,
    values,
  )
  assert.deepEqual(result, [[xActual, yActuals[1]], [20, 10, 20, 30, 40]])
})
