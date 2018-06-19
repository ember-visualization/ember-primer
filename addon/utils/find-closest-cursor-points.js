import closest from 'ember-primer/utils/binary-closest-search'
import closestUnsorted from 'ember-primer/utils/unsorted-closest-search'

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

  debugger
  // 2 Find the closest series on the Y axis in case we have more than one.
  let [xValue, yValues] = values[index]
  let [yValue, closestYIndex] = closestUnsorted(+valueAtY, yValues)

  // 3. Scale values back to x,y
  let xPointer = xScale(xValue)
  let yPointer = yScale(yValue)

  return [[xPointer, yPointer], values[index], closestYIndex]
}
