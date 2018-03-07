import Route from '@ember/routing/route'
import { range } from 'd3-array'
import { randomUniform } from 'd3-random'

export default Route.extend({
  signwaveGenerator() {
    let i = -1
    let points = 1000
    let data = []
    while (++i < points) {
      let y = Math.abs(Math.sin(2 * Math.PI * i))
      let x = i
      data.push({ timestamp: x, value: y })
    }
    return data
  },

  setupController(controller) {
    // let signwaveData = this.signwaveGenerator();
    // controller.setProperties({ timeSeriesData: signwaveData.slice(0, 10) });
    controller.setProperties({ timeSeriesData: this.getScatterData() })
    setInterval(() => {
      window.requestAnimationFrame(() => {
        controller.setProperties({ timeSeriesData: this.getScatterData() })
      })
    }, 2000)
  },

  getScatterData() {
    let random = (min, max = min) => {
      return randomUniform(min, max)()
    }

    let colors = [
      'violet',
      'cornflowerblue',
      'gold',
      'orange',
      'turquoise',
      'tomato',
      'greenyellow',
    ]

    // console.log(symbols);
    // let symbols = symbols.slice(1, 3);

    let symbols = ['circle', 'cross', 'star', 'diamond', 'square', 'triangle', 'wye']

    return range(25).map(index => {
      let scaledIndex = Math.floor(index % symbols.length)

      return {
        x: random(10, 50),
        y: random(2, 100),
        size: random(8) + 3,
        symbol: symbols[scaledIndex],
        fill: colors[Math.floor(random(0, 6) % 7)],
        opacity: 0.6,
      }
    })
  },

  // dataLoop(controller, signwaveData) {
  //   let i = 0;

  //   setTimeout(() => {
  //     i++;
  //     if (i > signwaveData - 10) {
  //       i = 0;
  //     }
  //     controller.setProperties({ timeSeriesData: signwaveData.slice(0 + i, 10 + i) });
  //   }, 2000);

  //   // run.later(this, function() {
  //   //   controller.setProperties({ timeSeriesData: this.signwaveGenerator() });
  //   //   this.dataLoop(controller);
  //   // }, 1000);
  // }
})
