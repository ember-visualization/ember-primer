import Ember from 'ember';

export default Ember.Controller.extend({

  tooltipPositionX: 0,
  tooltipPositionY: 0,

  actions: {
    updateToolTipPosition([x, y]) {
      this.setProperties({
        tooltipPositionX: x,
        tooltipPositionY: y
      });
    }
  }

});
