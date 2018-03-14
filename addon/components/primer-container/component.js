import Component from '@ember/component'
import layout from './template'
import { computed } from '@ember/object'
import box from 'ember-primer/utils/box-expression'
const { keys } = Object
import { run } from '@ember/runloop'

const absAllValues = rect => {
  let newRect = { ...rect }
  keys(newRect).forEach(key => {
    if (newRect[key] < 0) newRect[key] = 0
  })

  return newRect
}

const Container = Component.extend({
  tagName: '',

  layout,

  init() {
    this._super(...arguments)
    this.cursorPosition = [0, 0]
  },

  xScale: null,

  yScale: null,

  width: null,

  height: null,

  margin: '0',
  padding: '0',

  cursorPosition: null,

  xCursor: -1,
  yCursor: -1,

  localizedXScale: computed('xScale', 'rect', {
    get() {
      let { xScale, rect } = this.getProperties('xScale', 'rect')
      return xScale.copy().range([0, rect.width])
    },
  }),

  localizedYScale: computed('yScale', 'rect', {
    get() {
      let { yScale, rect } = this.getProperties('yScale', 'rect')
      return yScale.copy().range([rect.height, 0])
    },
  }),

  didReceiveAttrs() {
    let outerHeight = this.get('height') || 10
    let outerWidth = this.get('width') || 10
    let margin = box(this.get('margin'))

    let { height: newHeight, width: newWidth } = this.getProperties('width', 'height')

    let innerWidth = outerWidth - margin.left - margin.right
    let innerHeight = outerHeight - margin.top - margin.bottom

    console.log(newHeight)

    let rect = {
      margin,
      top: margin.top,
      left: margin.left,
      bottom: innerHeight - margin.top,
      right: innerWidth - margin.right,
      outerWidth,
      outerHeight,
      innerWidth,
      innerHeight,

      // Dupes

      height: 50,
      width: 50,

      // height: innerHeight,
      // width: innerWidth,
    }

    rect = absAllValues(rect)
    // this.setProperties({ rect })

    // console.log('didReceive', rect)

    run.next(() => {
      // this.setProperties({ rect: { height: innerHeight } })
    })
  },

  // rect: computed('margin', {
  //   get() {
  //     let outerHeight = this.get('height') || 10
  //     let outerWidth = this.get('width') || 10
  //     let margin = box(this.get('margin'))
  //     // let padding = box(this.get('padding'));

  //     // let innerWidth = outerWidth - margin.left - margin.right;
  //     // let innerHeight = outerHeight - margin.top - margin.bottom;
  //     // let width = innerWidth - padding.left - padding.right;
  //     // let height = innerHeight - padding.top - padding.bottom;

  //     // let rect = {
  //     //   padding,
  //     //   margin,
  //     //   outerWidth, outerHeight,
  //     //   innerWidth, innerHeight,
  //     //   width, height,
  //     //   top: margin.top + padding.top,
  //     //   left: margin.left + padding.left
  //     //   // right: margin.left + padding.left,
  //     // };

  //     // // let height = this.get('height') || 10;
  //     // // let width = this.get('width') || 10;
  //     // // let margin = box(this.get('margin'));
  //     // // let padding = box(this.get('padding'));

  //     let innerWidth = outerWidth - margin.left - margin.right
  //     let innerHeight = outerHeight - margin.top - margin.bottom

  //     let rect = {
  //       margin,
  //       top: margin.top,
  //       left: margin.left,
  //       bottom: innerHeight - margin.top,
  //       right: innerWidth - margin.right,
  //       outerWidth,
  //       outerHeight,
  //       innerWidth,
  //       innerHeight,

  //       // Dupes
  //       height: innerHeight,
  //       width: innerWidth,
  //     }

  //     keys(rect).forEach(key => {
  //       if (rect[key] < 0) rect[key] = 0
  //     })

  //     console.log(rect)

  //     return rect
  //   },
  // }),

  actions: {
    updateCursorPosition([xValue, yValue], [xCursor, yCursor]) {
      let action = this.get('update-cursor-position')
      if (action) action([xValue, yValue], [xCursor, yCursor])
    },
  },
})

Container.reopenClass({
  positionalParams: ['xScale', 'yScale'],
})

export default Container
