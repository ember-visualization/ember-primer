import Component from 'ember-component';
import DOM from 'ember-lifeline/mixins/dom';
import closest from 'ember-primer/utils/binary-closest-search';
import run from 'ember-runloop';
import layout from './template';

export default Component.extend(DOM, {
  layout,
  tagName: 'g',

  xScale: null,

  yScale: null,

  values: [],

  x: 0,

  y: 0,

  isActive: false,

  didInsertElement() {
    let svg = this.element.closest('svg');
    this.addEventListener(svg, 'mousemove', this.handleMouseMove);
    this.addEventListener(svg, 'mouseleave', this.handleMouseLeave);
    this.addEventListener(svg, 'mouseenter', this.handleMouseEnter);
  },

  handleMouseMove(event) {
    run.throttle(this, '_mouseMove', event, 16);
  },

  handleMouseLeave() {
    this.set('isActive', false);
  },

  handleMouseEnter() {
    this.set('isActive', true);
  },

  _mouseMove(event) {
    let { offsetY: y, offsetX: x } = event;
    let { xScale, yScale, values } = this.getProperties('xScale', 'yScale', 'values');

    if (!xScale) {
      this.setProperties({ isActive: true, x, y });
      this.sendAction('change', [x, y]);
    } else {
      let valueAtX = xScale.invert(x);
      // let valueAtY = yScale.invert(y);

      let index = closest(valueAtX, values);

      let [xValue, yValue] = values[index] || [0, 0];

      this.setProperties({ isActive: true, x: xScale(xValue), y: yScale(yValue) });
      this.sendAction('change', [xValue, yValue]);
    }
  }
});
