import Component from '@ember/component'
import layout from './template'
import { computed } from '@ember/object'
import { area } from 'd3-shape'
import curveLookup from 'ember-primer/utils/curve-lookup'

const LineComponent = Component.extend({
  tagName: 'g',
  layout,


  /**
   * Normalized values to render
   * @public
   * @type {Array<Array[2]>}
   */
  values: null,

  /**
   * Line interpolation
   * @public
   * @type {String}
   */
  interpolation: 'monotone-x',

  /**
   * Line stroke color
   * @public
   * @type {String}
   */
  stroke: '#81c784',

  /**
   * Line stroke width
   *
   * @public
   * @default 1
   * @type {Number}
   */
  strokeWidth: 1,

  /**
   * The width of the transparent event target following this line.
   *
   * @public
   * @default 10
   * @type {Number}
   */
  eventTargetWidth: 10,

  /**
   * Line cap endings
   * @public
   * @type {String}
   */
  strokeLineCap: 'round',

  /**
   * Fill color
   * @public
   * @type {String}
   */
  fill: '#81c784',

  /**
   * Fill opacity
   * @public
   * @type {Number}
   */
  fillOpacity: 0.24,

  /**
   * X Offset to position line from
   * @public
   * @type {Number}
   */
  x: 0,

  /**
   * Y Offset to position line from
   * @public
   * @type {Number}
   */
  y: 0,

  /**
   * Used to position the path with an offset if needed from left,top. It computes
   * a translate string for the transform attribute.
   *
   * @param  {Number} 'x' Offset X
   * @param  {Number} 'y' Offset Y
   * @return {String} Transform(Translate(x,y))
   * @protected
   */
  transform: computed('x', 'y', {
    get() {
      let { x, y } = this.getProperties('x', 'y')
      return `translate(${x},${y})`
    },
  }),

  /**
   * yScale for scaling y0
   *
   * @private
   * @type {D3Scale}
   */
  yScale: null,

  topLineStroke: '#81c784',

  topLineStrokeWidth: 1,

  /**
   * Returns the computed path data for the path element everytime the values change.
   *
   * @protected
   * @returns {String} SVG Path Data
   */
  areaFn: computed('interpolation', 'yScale', {
    get() {
      let { interpolation, yScale } = this.getProperties('interpolation', 'yScale')

      let [zero] = yScale.domain()

      let areaFn = area()
        .x(d => d[0])
        .y0(d => d[1])
        .y1(yScale(zero))

      if (interpolation) {
        areaFn.curve(curveLookup(interpolation))
      }

      return areaFn
    },
  }),

  pathData: computed('areaFn', 'values.[]', {
    get() {
      let areaFn = this.get('areaFn')
      let values = this.get('values')
      return areaFn(values)
    },
  }),

  lineXPathData: computed('areaFn', 'values.[]', {
    get() {
      let areaFn = this.get('areaFn')
      let values = this.get('values')
      return areaFn.lineX0()(values)
    },
  }),

  /**
   * Handles the mousemove event on the event target path. When this event fires,
   * we send an action called mouse-move with the x,y coordinates of the mouse
   * over the path.
   *
   * @public
   * @action
   */
  mouseMove(event) {
    let { offsetX, offsetY } = event
    let action = this.get('mouse-move')
    if (action) action([offsetX, offsetY])
  },
})

LineComponent.reopenClass({
  positionalParams: ['values'],
})

export default LineComponent
