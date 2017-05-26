import Component from 'ember-component';
import Ember from 'ember';
import layout from './template';
import computed from 'ember-computed';

const { run } = Ember;

import { line, curveMonotoneX } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';

export default Component.extend({
  tagName: '',
  layout,

  values: [],

  timeSeriesData: [],

  interpolation: 'curveMonotoneX',

  scale: null,

  xScale: computed('values.[]', {
    get() {
      let values = this.get('values');
      let xData = values.map((d) => d.x);
      return scaleLinear()
        .domain(extent(xData))
        .rangeRound([0, 960]);
    }
  }),

  yScale: computed('values.[]', {
    get() {
      let values = this.get('values');
      let xData = values.map((d) => d.y);
      return scaleLinear()
        .domain(extent(xData))
        .rangeRound([500, 0]);
    }
  }),

  pathData: computed('values.[]', 'xScale', 'yScale', 'interpolation', {
    get() {
      let { values, xScale, yScale, interpolation }
        = this.getProperties('values', 'xScale', 'yScale', 'interpolation');

      let lineFn = line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y));

      if (interpolation) {
        lineFn.curve(curveMonotoneX);
      }

      // console.log(values);

      return lineFn(values);
    }
  })
});
