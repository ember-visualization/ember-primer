import Component from '@ember/component'
import layout from './template'
import { computed } from '@ember/object'
import box from 'ember-primer/utils/box-expression'
const { keys } = Object
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

  rect: computed('width', 'height', 'margin', {
    get() {
      let outerHeight = this.get('height') || 10
      let outerWidth = this.get('width') || 10
      let margin = box(this.get('margin'))
      // let padding = box(this.get('padding'));

      // let innerWidth = outerWidth - margin.left - margin.right;
      // let innerHeight = outerHeight - margin.top - margin.bottom;
      // let width = innerWidth - padding.left - padding.right;
      // let height = innerHeight - padding.top - padding.bottom;

      // let rect = {
      //   padding,
      //   margin,
      //   outerWidth, outerHeight,
      //   innerWidth, innerHeight,
      //   width, height,
      //   top: margin.top + padding.top,
      //   left: margin.left + padding.left
      //   // right: margin.left + padding.left,
      // };

      // // let height = this.get('height') || 10;
      // // let width = this.get('width') || 10;
      // // let margin = box(this.get('margin'));
      // // let padding = box(this.get('padding'));

      let innerWidth = outerWidth - margin.left - margin.right
      let innerHeight = outerHeight - margin.top - margin.bottom

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
        height: innerHeight,
        width: innerWidth,
      }

      keys(rect).forEach(key => {
        if (rect[key] < 0) {
          rect[key] = 0
        }
      })

      return rect
    },
  }),

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
