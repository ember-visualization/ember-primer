import Component from '@ember/component'
import { scaleUtc, scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'
import { computed } from '@ember/object'
import layout from '../templates/components/resource-usage-timeline'

const { max, min } = Math

export default Component.extend({
  layout,
  classNames: ['ResourceUsageChart'],

  init() {
    this._super(...arguments)

    this.values = []
    this.cursorPosition = [0, 0]
  },

  metric: null,

  startedAt: null,

  stoppedAt: null,

  x: d => d[0],
  y: d => d[1],

  title: computed('metric', {
    get() {
      let metric = this.get('metric')
      if (/system\.cpu/.test(metric)) {
        return 'CPU'
      } else if (/system\.mem/.test(metric)) {
        return 'Memory'
      } else if (/system\.io/.test(metric)) {
        return 'IO Utilization'
      }
    },
  }),

  isPercentageMetric: computed('metric', {
    get() {
      let metric = this.get('metric')
      if (/system\.cpu/.test(metric)) {
        return true
      } else if (/system\.mem/.test(metric)) {
        return true
      } else if (/system\.io/.test(metric)) {
        return true
      }
    },
  }),

  xScale: computed('values.[]', 'startedAt', 'stoppedAt', {
    get() {
      let { startedAt, stoppedAt } = this.getProperties('startedAt', 'stoppedAt')

      if (!stoppedAt) {
        stoppedAt = new Date()
      }

      return scaleUtc().domain([Number(startedAt), Number(stoppedAt)])
    },
  }),

  activeFloods: computed('floods.[]', 'startedAt', 'stoppedAt', {
    get() {
      let floods = this.get('floods')
      let startedAt = this.get('startedAt')
      let stoppedAt = this.get('stoppedAt')
      // let store = this.get('store');
      return floods.map(([, start, stop]) => {
        return {
          // flood: store.peekRecord('flood', id),
          startedAt: max(startedAt, Number(start * 1e3)),
          stoppedAt: min(stoppedAt, Number(stop * 1e3)),
        }
      })
    },
  }),

  yScale: computed('values.[]', 'isPercentageMetric', {
    get() {
      let values = this.get('values')
      let yDomain
      if (this.get('isPercentageMetric')) {
        yDomain = [0, 100]
      } else {
        yDomain = extent(values.map(d => d[1]))
      }

      return scaleLinear().domain(yDomain)
    },
  }),

  actions: {
    updateCursorPosition(_, [xCursor, yCursor]) {
      this.set('cursorPosition', [xCursor, yCursor])
      let action = this.get('cursor-moved')
      if (action) action([xCursor, yCursor])
    },
  },
})
