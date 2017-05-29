import Ember from 'ember';

export default Ember.Route.extend({

  setupController(controller) {
    let data = [
      { month: new Date(2016, 0, 1, 12), profit: 35000, loss: 2000 },
      { month: new Date(2016, 1, 1, 12), profit: 42000, loss: 8000 },
      { month: new Date(2016, 2, 1, 12), profit: 55000, loss: 5000 }
    ];

    let timeSeriesData = data.map((d) => [d.month, d.profit - d.loss]);

    controller.setProperties({ timeSeriesData });
  }
});
