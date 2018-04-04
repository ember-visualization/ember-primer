import closest from 'ember-primer/utils/binary-closest-search'
import { ascending } from 'd3-array'

export default function findClosestCursorPoints(
  [x, y],
  [xOffset, yOffset],
  xScale,
  yScale,
  values,
) {
  let valueAtX = xScale.invert(x - xOffset)
  let valueAtY = yScale.invert(y - yOffset)

  // 1. Find closest data point to current cursor X
  let index = closest(+valueAtX, values.map(([d]) => +d))

  // 2 Find the closest series on the Y axis in case we have more than one.
  let [xValue, ...yValues] = values[index] || [0, 0]
  let closestYIndex = closest(+valueAtY, yValues.sort(ascending))
  let yIndex = yValues.indexOf(yValues[closestYIndex])
  let yValue = yValues[yIndex]

  // 3. Scale values back to x,y
  let xPointer = xScale(xValue)
  let yPointer = yValue.length ? valueAtY : yScale(yValue)

  return [[xPointer, yPointer], values[index]]
}
