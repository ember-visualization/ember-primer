import Component from 'ember-component';
import closestPoint from 'ember-primer/utils/find-closest-cursor-points';
import run from 'ember-runloop';
import layout from './template';
import { ascending } from 'd3-array';

export default Component.extend({
  layout,
  tagName: 'g',

  classNames: ['Primer-Cursor'],

  xScale: null,

  yScale: null,

  values: [],

  x: 0,

  y: 0,

  isActive: false,

  _lastPosition: [],

  didInsertElement() {
    let svg = this.element.closest('svg');
    svg.addEventListener('mousemove', this.handleMouseMove.bind(this));
    svg.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    svg.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
  },

  willRemoveElement() {
    let svg = this.element.closest('svg');
    svg.removeEventListener('mousemove', this.handleMouseMove);
    svg.removeEventListener('mouseleave', this.handleMouseLeave);
    svg.removeEventListener('mouseenter', this.handleMouseEnter);
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

  _convertCursorCoordinatesToDataCoordinates([x, y]) {
    return this.getAttr('convertCursorCoordinatesToDataCoordinates')([x, y]);
  },

  _mouseMove(event) {
    let { offsetY: y, offsetX: x } = event;
    let { xScale, yScale, values } = this.getProperties('xScale', 'yScale', 'values');
    let { xOffset, yOffset } = this.getProperties('xOffset', 'yOffset');

    if (!xScale) {
      this.setProperties({ isActive: true, x, y });
      this.sendAction('change', [x, y]);
    } else {
      let [[xPointer, yPointer], [xValue, ...yValues]] = closestPoint([x, y], [xOffset, yOffset], xScale, yScale, values);

      let [xLast, yLast] = this._lastPosition;
      if (xLast !== xPointer || yLast !== yPointer) {
        this.setProperties({ isActive: true, x: xPointer, y: yPointer });
        this.sendAction('change', [xValue, yValues], [xPointer, yPointer]);
        this.sendAction('_change', [xValue, yValues], [xPointer, yPointer]);

        this._lastPosition = [xPointer, yPointer];
      }

    }
  }
});
