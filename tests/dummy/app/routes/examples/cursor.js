import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    let length = 100;
    let i = -1;
    let width = 20;

    let values = [];

    while (++i < length) {
      let j = -1;
      while (++j < width) {
        values.push([j, Math.sin(2 * Math.PI * j)]);
      }
    }
    return values;
  },

  setupController(controller, waves) {
    controller.setProperties({ waves });
  }

});
