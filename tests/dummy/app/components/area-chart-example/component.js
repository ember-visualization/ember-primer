import Component from '@ember/component'
import layout from './template'

export default Component.extend({
  layout,

  tagName: 'chart',

  init() {
    this._super(...arguments)
    this.cursorPosition = [0, 0]
  },

  actions: {
    cursorPositionChanged(_ /*[xValue, yValue]*/, [xCursor, yCursor]) {
      let action = this.get('global-cursor-change')
      if (action) action([xCursor, yCursor])
    },
  },
})
