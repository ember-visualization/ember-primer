import Route from '@ember/routing/route';
import fetch from 'fetch'
import { extent } from 'd3-array'

const toDate = d => new Date(d)

export default Route.extend({
  async model() {
    let url = '/data/usage.json'
    try {
      let payload = await fetch(url).then(data => data.json())
      let { series, floods } = payload

      series = series.map(data => {
        let { pointlist, metric, interval } = data
        return { pointlist, metric, interval, floods }
      })

      return series
    } catch (err) {
      window.console.error(err)
      return []
    }
  },

  setupController(controller, resourceUsageData) {
    let [{ pointlist }] = resourceUsageData
    let [startedAt, stoppedAt] = extent(pointlist, d => d[0]).map(toDate)

    controller.setProperties({ resourceUsageData, startedAt, stoppedAt })
  },
})
