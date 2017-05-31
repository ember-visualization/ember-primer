import Route from 'ember-route';
import RSVP from 'rsvp';
import service from 'ember-service/inject';
import { csvParse } from 'd3-dsv';

const { keys } = Object;
export default Route.extend({

  ajax: service(),

  model() {
    let ajax = this.get('ajax');

    let stocks = {
      'AAPL': null,
      'GOOG': null,
      'TSLA': null
    };

    keys(stocks).forEach((stock) => {
      let url = `https://storage.googleapis.com/nasdaq-history/${stock}.csv`;

      stocks[stock] = ajax.request(url, {
        contentType: 'text/csv',
        dataType: 'text'
      }).then((data) => csvParse(data, (row) => {
        return [
          Date.parse(row.Date),
          Number(row.Close)
        ];
      }));
    });

    return RSVP.hash(stocks);
  },

  setupController(controller, stockPrices) {
    controller.setProperties({ stockPrices, timeSeriesData: stockPrices.TSLA });
  }
});
