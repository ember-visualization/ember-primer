import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import { line } from 'd3-shape';
import curveLookup from 'ember-primer/utils/curve-lookup';

const LineComponent = Component.extend({
  tagName: '',
  layout,

  /**
   * Normalized values to render
   * @public
   * @type {Array<Array[2]>}
   */
  values: [],

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
  stroke: '#4285f4',

  /**
   * Line stroke width
   * @public
   * @type {Number}
   */
  strokeWidth: 1,

  /**
   * Line cap endings
   * @public
   * @type {String}
   */
  strokeLineCap: 'rounded',

  /**
   * Fill color
   * @public
   * @type {String}
   */
  fill: 'none',

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

  xScale: null,

  yScale: null,

  transform: computed('x', 'y', {
    get() {
      let { x, y } = this.getProperties('x', 'y');
      return `translate(${x},${y})`;
    }
  }),

  pathData: computed('values.[]', 'xScale', 'yScale', 'interpolation', {
    get() {
      let { values, interpolation }
        = this.getProperties('values', 'interpolation');

      let lineFn = line()
        .x((d) => d[0])
        .y((d) => d[1]);

      if (interpolation) {
        lineFn.curve(curveLookup(interpolation));
      }

      return lineFn(values);
    }
  })
});

LineComponent.reopenClass({
  positionalParams: ['values']
});

export default LineComponent;
