import Ember from 'ember';
import { range } from 'd3-array';
import { randomUniform } from 'd3-random';
const { abs } = Math;

export default Ember.Route.extend({

  setupController(controller) {
    controller.setProperties({ scatterData: this.getScatterData() });
    this._interval = setInterval(() => {
      window.requestAnimationFrame(() => {
        controller.setProperties({ scatterData: this.getScatterData() });
      });
    }, 2000);
  },

  deactivate() {
    clearInterval(this._interval);
  },

  getScatterData() {
    let random = (min, max = min) => {
      return randomUniform(min, max)();
    };

    let colors = [
      'violet', 'cornflowerblue', 'gold', 'orange',
      'turquoise', 'tomato', 'greenyellow'
    ];

    let symbols = [
      'circle', 'cross', 'star', 'diamond', 'square', 'triangle', 'wye'
    ];

    return range(25).map((index) => {
      let scaledIndex = Math.floor(index % symbols.length);

      return {
        x: abs(random(10, 50)),
        y: abs(random(2, 100)),
        size: random(8) + 3,
        symbol: symbols[scaledIndex],
        fill: colors[Math.floor(random(0, 6) % 7)],
        opacity: 0.6
      };
    });
  }
});
