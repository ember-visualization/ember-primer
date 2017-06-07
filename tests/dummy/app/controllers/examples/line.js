import Ember from 'ember';

export default Ember.Controller.extend({

  cursorPosition: [0, 0],

  actions: {
    updateToolTipPosition([x, y]) {
      this.setProperties({
        cursorPosition: [x, y]
      });
    }
  }

});
