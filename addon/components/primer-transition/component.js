import Component from '@ember/component'
import { run } from '@ember/runloop'
import layout from './template'
import Timer from 'ember-primer/utils/timer'
import { easePolyOut } from 'd3-ease'
import { victoryInterpolator } from 'ember-primer/utils/interpolation'

export default Component.extend({
  layout,
  tagName: '',

  init() {
    this._super(...arguments)
    this.values = []
    this.newValues = []
    this.queue = []
  },

  /**
   * @public
   * Input values to be animated
   * @type {Array}
   */
  values: null,

  newValues: null,

  duration: 1550,

  ease: easePolyOut,

  interpolator: null,

  didReceiveAttrs() {
    this._super(...arguments)

    if (!this.timer) {
      this.timer = new Timer()
    }
    let data = this.get('values').slice()
    let { previousData } = this

    // console.debug('didUpdate');

    if (!previousData) {
      this.previousData = data.slice()
      this.set('newValues', this.previousData)
      return
    }

    // if (this.previousData[0].x === data[0].x) {
    //   console.log('nothing changed');
    //   return;
    // }

    // cancel existing loop if it exists
    if (this.loopID) {
      this.timer.unsubscribe(this.loopID)
      this.loopID = null
    }

    // Data is an array of values
    this.queue.push(data)

    // run.next(this, ()=>{
    //   this.previousData = data;
    // });

    /* Start traversing the tween queue */
    this.traverseQueue()
  },

  didInsertElement() {
    this._super(...arguments)

    // run.next(this, () => {
    //   let data = this.get('values').slice();
    //   let { previousData } = this;
    //   console.debug('didInsertElement');

    //   if (!previousData) {
    //     this.previousData = data.slice();
    //     this.set('newValues', this.previousData);
    //     return;
    //   }
    // });
  },

  willDestroyElement() {
    if (this.loopID) {
      this.timer.unsubscribe(this.loopID)
    }
  },

  traverseQueue() {
    let { timer } = this
    let duration = this.get('duration')

    if (this.queue.length && this.previousData) {
      let prevData = this.previousData

      /* Get the next index */
      let [data] = this.queue
      /* compare cached version to next props */
      // console.log('traverseQueue', prevData[0], data[0]);

      this.interpolator = victoryInterpolator(prevData.slice(), data.slice())
      this.loopID = timer.subscribe(this.nextFrame.bind(this), duration)
    } else {
      // console.log('Stop timer');
      // timer.stop();
    }
  },

  nextFrame(elapsed, duration) {
    let { timer, interpolator } = this

    let step = duration ? elapsed / duration : 1
    // console.log(duration, elapsed);

    // Animation is finished
    if (step >= 1) {
      run(this, () => this.set('newValues', interpolator(1)))
      // this.set('newValues', interpolator(1));

      let { loopID } = this
      if (loopID) {
        timer.unsubscribe(loopID)
        this.loopID = null
      }

      this.previousData = this.queue.shift()
      // this.queue.shift();
      this.traverseQueue()

      return
    }

    let { ease } = this
    let result = interpolator(ease(step))

    run(this, () => this.set('newValues', result.slice()))
  },
})
