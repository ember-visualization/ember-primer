import Route from 'ember-route'
import RSVP from 'rsvp'
import { csvParse } from 'd3-dsv'
import fetch from 'fetch'

const { keys } = Object
export default Route.extend({
  model() {
    let stocks = {
      AAPL: null,
      GOOG: null,
      TSLA: null,
    }

    keys(stocks).forEach(stock => {
      // let url = `https://storage.googleapis.com/nasdaq-history/${stock}.csv`;
      let url = `/data/${stock}.csv`

      stocks[stock] = fetch(url, {
        contentType: 'text/csv',
        dataType: 'text',
      }).then(data => {
        return data
          .text()
          .then(text => csvParse(text, row => [Date.parse(row.Date), Number(row.Close)]))
      })
    })

    return RSVP.hash(stocks)
  },

  setupController(controller, stockPrices) {
    controller.setProperties({ stockPrices, timeSeriesData: stockPrices.TSLA })
  },
})
