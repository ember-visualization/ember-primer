import Component from 'ember-component'
import { axisTop, axisRight, axisBottom, axisLeft } from 'd3-axis'
import { select } from 'd3-selection'
import run from 'ember-runloop'

const AXIS_MAP = {
  top: axisTop,
  right: axisRight,
  bottom: axisBottom,
  left: axisLeft,
}

function translateByOrientation(orientation, rect, offsetX, offsetY) {
  let [x, y] = {
    bottom: [0, rect.height],
    top: [0, 0],
    left: [0, 0],
    right: [rect.width, 0],
  }[orientation]

  return `translate(${x + offsetX},${y + offsetY})`
}

const AxisComponent = Component.extend({
  tagName: 'g',

  classNames: ['Primer-Axis'],

  classNameBindings: ['orientation'],

  ticks: 10,

  /**
   * Represents the axis orientation. You should always declare this.
   *
   * @public
   * @type {String}
   */
  orientation: 'bottom',

  /**
   * A scaling function used for this axis.
   *
   * @public
   * @type {Function}
   */
  scale: null,

  /**
   * The format used for the ticks for this axis.
   * [See D3 docs for more details](https://github.com/d3/d3-axis#axis_tickFormat)
   *
   * @public
   * @type {Function}
   */
  tickFormat: null,

  /**
   * The inner tick size for the ticks for this axis.
   * [See D3 docs for more details](https://github.com/d3/d3-axis#axis_tickSizeInner)
   *
   * @public
   * @type {Number}
   */
  tickSizeInner: 4,

  /**
   * The outer tick size for the ticks for this axis.
   * [See D3 docs for more details](https://github.com/d3/d3-axis#axis_tickSizeOuter)
   *
   * @public
   * @type {Number}
   */
  tickSizeOuter: 8,

  /**
   * Explicit tick values for this axis.
   * [See D3 docs for more details](https://github.com/d3/d3-axis#axis_tickValues)
   *
   * @public
   * @type {Array}
   */
  tickValues: null,

  rect: null,

  offsetX: 0,

  offsetY: 0,

  didReceiveAttrs() {
    run.scheduleOnce('render', this, this.drawAxis)
  },

  drawAxis() {
    if (!this.element) {
      return
    }
    let selection = select(this.element)

    let rect = this.get('rect')

    let { offsetX, offsetY } = this.getProperties('offsetX', 'offsetY')
    let {
      scale,
      orientation,
      tickFormat,
      ticks,
      tickSizeInner,
      tickSizeOuter,
      tickValues,
    } = this.getProperties(
      'scale',
      'orientation',
      'tickFormat',
      'ticks',
      'tickSizeInner',
      'tickSizeOuter',
      'tickValues',
    )

    let axis = this.createAxis(orientation, scale)

    axis.tickFormat(tickFormat)
    axis.tickSize(tickSizeInner, tickSizeOuter)
    axis.tickValues(tickValues)
    axis.scale(scale)

    if (ticks) {
      axis.ticks(ticks)
    }

    selection.call(axis)
    selection.attr('transform', translateByOrientation(orientation, rect, offsetX, offsetY))
  },

  createAxis(orient, scale) {
    return AXIS_MAP[orient](scale)
  },
})

AxisComponent.reopenClass({
  positionalParams: ['orientation', 'scale'],
})

export default AxisComponent
