import Component from '@ember/component'
import layout from './template'
import {
  symbol,
  symbolWye,
  symbolTriangle,
  symbolStar,
  symbolSquare,
  symbolDiamond,
  symbolCross,
  symbolCircle,
} from 'd3-shape'

const symbols = {
  wye: symbolWye,
  triangle: symbolTriangle,
  star: symbolStar,
  square: symbolSquare,
  diamond: symbolDiamond,
  cross: symbolCross,
  circle: symbolCircle,
}

export default Component.extend({
  layout,
  tagName: 'g',

  init() {
    this._super(...arguments)
    this.newValues = []
  },

  values: null,

  newValues: null,

  xScale: null,

  yScale: null,

  didReceiveAttrs() {
    let values = this.get('values').filter(d => d)
    let { xScale, yScale } = this.getProperties('xScale', 'yScale')

    let newValues = values.slice().map(d => {
      let sym = symbol()
      sym.size(d.size * 4)
      sym.type(symbols[d.symbol])

      return Object.assign({}, d, { symbol: sym(), x: xScale(d.x), y: yScale(d.y) })
    })

    this.set('newValues', newValues)
  },
})
