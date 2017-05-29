import Ember from 'ember';

export default Ember.Route.extend({

  setupController(controller) {
    let data = [
      { month: 'September', profit: 35000, loss: 2000 },
      { month: 'October', profit: 42000, loss: 8000 },
      { month: 'November', profit: 55000, loss: 5000 }
    ];

    let timeSeriesData = data.map((d) => [d.month, d.profit - d.loss]);

    controller.setProperties({ timeSeriesData });
  }
});
