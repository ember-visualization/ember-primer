import Component from 'ember-component'
import closestPoint from 'ember-primer/utils/find-closest-cursor-points'
import run from 'ember-runloop'
import layout from './template'

export default Component.extend({
	layout,
	tagName: 'g',

	classNames: [ 'Primer-Cursor' ],

	xScale: null,

	yScale: null,

	values: [],

	/**
   * Represents the cursor object, which is part of the public API.
   *
   * @public
   * @type {Object}
   */
	cursor: {
		x: 0,
		y: 0,
		xValues: 0,
		yValues: [ 0 ],
	},

	/**
   * Indicates whether the cursor is visible on the chart
   * @protected
   * @type {Boolean}
   */
	isActive: false,

	/**
   * Indicates if the mouse is within the bounds of the chart
   * @protected
   * @type {Boolean}
   */
	hasMouse: false,

	_lastPosition: [],

	/**
   * Public API for setting the current position
   * @public
   * @type {Array}
   */
	position: [],

	/**
   * Indicates whether to display the latest result when the mouse isn't in the
   * chart bounds.
   *
   * @public
   * @type {Boolean}
   */
	showLatestWhenInactive: true,

	didInsertElement() {
		let svg = this.element.closest('svg')
		svg.addEventListener('mousemove', this._handleMouseMove.bind(this))
		svg.addEventListener('mouseleave', this._handleMouseLeave.bind(this))
		svg.addEventListener('mouseenter', this._handleMouseEnter.bind(this))

		run.next(this, this._handleMouseLeave)
	},

	willDestroyElement() {
		let svg = this.element.closest('svg')
		svg.removeEventListener('mousemove', this._handleMouseMove)
		svg.removeEventListener('mouseleave', this._handleMouseLeave)
		svg.removeEventListener('mouseenter', this._handleMouseEnter)
	},

	didReceiveAttrs() {
		let hasMouse = this.get('hasMouse')
		let values = this.get('values')
		let [ xNew, yNew ] = this.get('position') || []
		let [ xLast, yLast ] = this._lastPosition || []
		let { xOffset, yOffset } = this.getProperties('xOffset', 'yOffset')

		if ((xLast !== xNew || yLast !== yNew) && !hasMouse && values.length > 2) {
			this._mouseMove({ offsetY: yNew + yOffset, offsetX: xNew + xOffset }, false)
		}
	},

	_handleMouseMove(event) {
		window.requestIdleCallback(() => this._mouseMove(event))

		// run.throttle(this, '_mouseMove', event, 16)
	},

	_handleMouseLeave() {
		let showLatestWhenInactive = this.get('showLatestWhenInactive')
		let { xOffset } = this.getProperties('xOffset')

		if (showLatestWhenInactive) {
			let xScale = this.get('xScale')
			let values = this.get('values')

			if (values.length > 2) {
				let [ x1 ] = values[values.length - 1] || []

				this.setProperties({ isActive: true, hasMouse: false })
				this._mouseMove({ offsetY: 0, offsetX: xScale(x1) + xOffset }, true)
			}
		} else {
			this.setProperties({ isActive: false, hasMouse: false })
		}
	},

	_handleMouseEnter() {
		this.setProperties({ isActive: true, hasMouse: true })
	},

	_mouseMove(event, trigger = true) {
		if (this.isDestroyed || this.isDestroying) return

		let { offsetY: y, offsetX: x } = event
		let { xScale, yScale, values } = this.getProperties('xScale', 'yScale', 'values')
		let { xOffset, yOffset } = this.getProperties('xOffset', 'yOffset')

		if (xScale) {
			let [
				[ xPointer, yPointer ] = [ 0, 0 ],
				[ xValue, ...yValues ] = [ 0, [ 0 ] ],
			] = closestPoint([ x, y ], [ xOffset, yOffset ], xScale, yScale, values)

			let [ xLast, yLast ] = this._lastPosition || [ 0, 0 ]
			if (xLast !== xPointer || yLast !== yPointer) {
				this.setProperties({
					isActive: true,
					cursor: {
						x: xPointer,
						y: yPointer,
						xValue,
						yValues,
					},
				})

				if (trigger) {
					this.sendAction('_change', [ xValue, yValues ], [ xPointer, yPointer ])
				}

				this._lastPosition = [ xPointer, yPointer ]
			}
		}
	},
})
