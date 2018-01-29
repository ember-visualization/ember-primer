import { typeOf } from '@ember/runtime/utils'
export const isFunction = (thing) => typeOf(thing) === 'function'

export default {
	evaluateProp(prop, data, active) {
		return isFunction(prop) ? prop(data, active) : prop
	},

	evaluateStyle(style, data, active) {
		if (!style || !Object.keys(style).some((value) => isFunction(style[value]))) {
			return style
		}
		return Object.keys(style).reduce((prev, curr) => {
			prev[curr] = this.evaluateProp(style[curr], data, active)
			return prev
		}, {})
	},
}
