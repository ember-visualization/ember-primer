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

  _lastPosition: [],

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
    let { xOffset, yOffset } = this.getProperties('xOffset', 'yOffset');

    if (!xScale) {
      this.setProperties({ isActive: true, x, y });
      this.sendAction('change', [x, y]);
    } else {
      let valueAtX = xScale.invert(x - xOffset);
      // let valueAtY = yScale.invert(y);

      // 1. Find closest data point to current cursor X
      let index = closest(Number(valueAtX), values.map((d) => Number(d[0])));

      // 2. Find actual data point for x,y based on index of 1.
      let [xValue, yValue] = values[index] || [0, 0];

      // 3. Scale values back to x,y
      let xPointer = xScale(xValue);
      let yPointer = yScale(yValue);

      // 4. Only update and action if position has actually changed
      let [xLast, yLast] = this._lastPosition;
      if (xLast !== xPointer || yLast !== yPointer) {
        this.setProperties({ isActive: true, x: xPointer, y: yPointer });
        this.sendAction('change', [xValue, yValue], [xPointer, yPointer]);
        this.sendAction('_change', [xValue, yValue], [xPointer, yPointer]);

        this._lastPosition = [xPointer, yPointer];
      }

    }
  }
});
