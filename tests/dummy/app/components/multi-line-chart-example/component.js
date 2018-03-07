import Component from '@ember/component'
import layout from './template'
import { computed } from '@ember/object'
const { keys, entries } = Object

import { extent, ascending } from 'd3-array'
import { interpolateWarm, scaleLinear } from 'd3-scale'

export default Component.extend({
  layout,

  tagName: 'chart',

  init() {
    this._super(...arguments)
    this.cursorPosition = [0, 0]
    this.stockPrices = []
  },

  /**
   * Input data
   * @public
   * @readOnly
   * @type {Array}
   */
  stockPrices: null,

  /**
   * Returns an array containing the values for each series and a base timestamp.
   * @protected
   * @return {Array[Array]}
   */
  stockPriceSeries: computed('stockPrices.[]', {
    get() {
      let stockPricesHash = entries(this.get('stockPrices'))
      let series = []

      for (let [, values] of stockPricesHash) {
        values.forEach(([timestamp, value], index) => {
          if (!series[index]) {
            series[index] = [timestamp]
          }

          series[index].push(value)
        })
      }

      return series
    },
  }),

  values: computed('stockPrices.[]', {
    get() {
      let stockPricesHash = entries(this.get('stockPrices'))
      let data = {
        timestamps: [],
        values: [],
      }

      for (let [, values] of stockPricesHash) {
        values.forEach(([timestamp, value], index) => {
          if (!data.timestamps[index]) {
            data.timestamps[index] = timestamp
            data.values[index] = []
          }
          data.values[index].push(value)
        })
      }

      return data
    },
  }),

  stockPriceExtent: computed('stockPrices.[]', {
    get() {
      let stockPrices = this.get('stockPrices')
      let prices = [0]
      keys(stockPrices).forEach(stock => {
        prices = prices.concat(stockPrices[stock].map(p => p[1]))
      })

      return extent(prices.sort(ascending))
    },
  }),

  stockPricePeriod: computed('stockPrices.[]', {
    get() {
      let stockPrices = this.get('stockPrices')
      let prices = []
      keys(stockPrices).forEach(stock => {
        prices = prices.concat(stockPrices[stock].map(p => p[0]))
      })

      return extent(prices.sort(ascending))
    },
  }),

  stocks: computed('stockPrices', {
    get() {
      let stockPrices = this.get('stockPrices')
      let colors = index => {
        let scale = scaleLinear()
          .domain([0, keys(stockPrices).length])
          .range([0, 1])
        return interpolateWarm(scale(index))
      }
      let stocks = []
      keys(stockPrices).forEach((stock, index) => {
        stocks.push({
          prices: stockPrices[stock],
          color: colors(index),
        })
      })

      return stocks
    },
  }),

  actions: {
    cursorPositionChanged(_ /*[xValue, yValue]*/, [xCursor, yCursor]) {
      let action = this.get('global-cursor-change')
      if (action) action([xCursor, yCursor])
    },
  },
})
