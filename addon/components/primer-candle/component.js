import Component from '@ember/component'
import layout from './template'
import { computed } from '@ember/object'
const { assign } = Object
import computedStyle from 'ember-computed-style'

export default Component.extend({
	layout,
	tagName: 'g',

	classNames: [ 'Primer-Candle' ],

	x: 0,
	y: 0,
	y1: 1,
	y2: 1,
	candleWidth: 8,
	candleHeight: 20,
	style: {},
	datum: {},

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
