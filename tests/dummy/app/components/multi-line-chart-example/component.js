import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
const { keys } = Object;

import { extent, ascending } from 'd3-array';
import { interpolateWarm, scaleLinear } from 'd3-scale';

export default Component.extend({
  layout,

  tagName: 'chart',

  stockPrices: [],

  stockPriceExtent: computed('stockPrices.[]', {
    get() {
      let stockPrices = this.get('stockPrices');
      let prices = [0];
      keys(stockPrices).forEach((stock) => {
        prices = prices.concat(stockPrices[stock].map((p) => p[1]));
      });

      return extent(prices.sort(ascending));
    }
  }),

  stockPricePeriod: computed('stockPrices.[]', {
    get() {
      let stockPrices = this.get('stockPrices');
      let prices = [];
      keys(stockPrices).forEach((stock) => {
        prices = prices.concat(stockPrices[stock].map((p) => p[0]));
      });

      return extent(prices.sort(ascending));
    }
  }),

  stocks: computed('stockPrices', {
    get() {
      let stockPrices = this.get('stockPrices');
      let colors = (index) => {
        let scale = scaleLinear().domain([0, keys(stockPrices).length]).range([0, 1]);
        console.log(scale(index), index);
        return interpolateWarm(scale(index));
      };
      let stocks = [];
      keys(stockPrices).forEach((stock, index) => {
        stocks.push({
          prices: stockPrices[stock],
          color: colors(index)
        });
      });

      return stocks;
    }
  }),

  actions: {
    cursorPositionChanged() {

    }
  }
});
