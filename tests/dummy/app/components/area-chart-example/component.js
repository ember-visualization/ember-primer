import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,

  tooltipPositionX: 0,
  tooltipPositionY: 0,
  tooltipValue: 0,

  actions: {
    cursorPositionChanged(item, [x, y]) {
      this.set('tooltipValue', item[1]);
      this.set('tooltipPositionX', x);
      this.set('tooltipPositionY', y);
    }
  }
});
