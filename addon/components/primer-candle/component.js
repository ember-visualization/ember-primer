import Component from '@ember/component'
import layout from './template'
import { computed } from '@ember/object'
import computedStyle from 'ember-computed-style'

export default Component.extend({
  layout,
  tagName: 'g',

  classNames: ['Primer-Candle'],

  init() {
    this._super(...arguments)
    this.style = {}
    this.datum = {}
  },

  x: 0,
  y: 0,
  y1: 1,
  y2: 1,
  candleWidth: 8,
  candleHeight: 20,
  style: null,
  datum: null,

  _candleStyle: computedStyle('style'),

  /**
   * Specifies the shape-rendering to apply to the candle
   *
   * @public
   * @property
   */
  shapeRendering: 'auto',

  role: 'presentation',

  candle: computed('candleWidth', {
    get() {
      let { candleWidth } = this.getProperties('candleWidth')
      return {
        x: candleWidth / 2,
      }
    },
  }),

  wick: computed('candleWidth', {
    get() {
      let { candleWidth } = this.getProperties('candleWidth')
      return {
        x: candleWidth / 2,
      }
    },
  }),
})
