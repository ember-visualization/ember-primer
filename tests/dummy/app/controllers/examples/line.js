import Controller from '@ember/controller';

export default Controller.extend({

  cursorPosition: [0, 0],

  actions: {
    updateToolTipPosition([x, y]) {
      this.setProperties({
        cursorPosition: [x, y]
      });
    }
  }

});
