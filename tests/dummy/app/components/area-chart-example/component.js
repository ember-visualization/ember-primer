import Component from '@ember/component'
import layout from './template'

export default Component.extend({
  layout,

  tagName: 'chart',

  cursorPosition: [0, 0],

  actions: {
    cursorPositionChanged([xValue, yValue], [xCursor, yCursor]) {
      this.sendAction('global-cursor-change', [xCursor, yCursor])
    },
  },
})
