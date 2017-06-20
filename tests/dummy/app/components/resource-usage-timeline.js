import Component from 'ember-component';
import { scaleUtc, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import computed from 'ember-computed';
import layout from '../templates/components/resource-usage-timeline';

const { max, min } = Math;

export default Component.extend({
  layout,
  classNames: ['ResourceUsageChart'],

  values: [],

  metric: null,

  startedAt: null,

  stoppedAt: null,

  cursorPosition: [0, 0],

  x: (d) => d[0],
  y: (d) => d[1],

  title: computed('metric', {
    get() {
      let metric = this.get('metric');
      if (/system\.cpu/.test(metric)) {
        return 'CPU';
      } else if (/system\.mem/.test(metric)) {
        return 'Memory';
      } else if (/system\.io/.test(metric)) {
        return 'IO Utilization';
      }
    }
  }),

  isPercentageMetric: computed('metric', {
    get() {
      let metric = this.get('metric');
      if (/system\.cpu/.test(metric)) {
        return true;
      } else if (/system\.mem/.test(metric)) {
        return true;
      } else if (/system\.io/.test(metric)) {
        return true;
      }
    }
  }),

  xScale: computed('values.[]', 'startedAt', 'stoppedAt', {
    get() {
      let { startedAt, stoppedAt } = this.getProperties('startedAt', 'stoppedAt');

      if (!stoppedAt) {
        console.log('Settting to stopped at to now');
        stoppedAt = new Date();
      }

      return scaleUtc().domain([Number(startedAt), Number(stoppedAt)]);
    }
  }),

  activeFloods: computed('floods.[]', 'startedAt', 'stoppedAt', {
    get() {
      let floods = this.get('floods');
      let startedAt = this.get('startedAt');
      let stoppedAt = this.get('stoppedAt');
      // let store = this.get('store');
      return floods.map(([, start, stop]) => {
        return {
          // flood: store.peekRecord('flood', id),
          startedAt: max(startedAt, Number(start * 1e3)),
          stoppedAt: min(stoppedAt, Number(stop * 1e3))
        };
      });
    }
  }),

  yScale: computed('values.[]', 'isPercentageMetric', {
    get() {
      let values = this.get('values');
      let yDomain;
      if (this.get('isPercentageMetric')) {
        yDomain = [0, 100];
      } else {
        yDomain = extent(values.map((d) => d[1]));
      }

      return scaleLinear().domain(yDomain);
    }
  }),

  actions: {
    updateCursorPosition([x, y], [xCursor, yCursor]) {
      this.set('cursorPosition', [xCursor, yCursor]);
      this.sendAction('cursor-moved', [xCursor, yCursor]);

      // if (this.get('isPercentageMetric')) {
      // this.set('cursorValue', { x, y: y / 100 });
      // } else {
      //   this.set('cursorValue', { x, y });
      // }
    }

  }

});
