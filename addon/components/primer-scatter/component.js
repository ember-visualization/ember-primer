import Ember from 'ember';
import layout from './template';
import computed from 'ember-computed';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { symbol,
  symbolWye,
  symbolTriangle,
  symbolStar,
  symbolSquare,
  symbolDiamond,
  symbolCross,
  symbolCircle

} from 'd3-shape';

const symbols = {
  wye: symbolWye,
  triangle: symbolTriangle,
  star: symbolStar,
  square: symbolSquare,
  diamond: symbolDiamond,
  cross: symbolCross,
  circle: symbolCircle
};

export default Ember.Component.extend({
  layout,
  tagName: 'g',

  values: [],

  newValues: [],

  didReceiveAttrs() {
    let values = this.get('values').filter((d) => d);
    let xData = values.map((d) => d.x);

    let xScale = scaleLinear()
        .domain(extent(xData))
        .rangeRound([0, 960]);

    let yData = values.map((d) => d.y);
    let yScale = scaleLinear()
        .domain(extent(yData))
        .rangeRound([500, 0]);

    let newValues = values.slice().map((d) => {
      let sym = symbol();
      sym.size(d.size * 4);
      sym.type(symbols[d.symbol]);

      return Object.assign({}, d, { symbol: sym(), x: xScale(d.x), y: yScale(d.y) });
    });

    // console.log(newValues);
    this.set('newValues', newValues);
  }
});
