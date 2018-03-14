import Component from '@ember/component'
// import ResizeableContainer from 'ember-primer/mixins/resizeable-container';
import WithContentRect from 'ember-measure/with-content-rect'
import layout from './template'
import { computed } from '@ember/object'

export default Component.extend(WithContentRect, {
  layout,
  tagName: 'div',

  classNames: ['Primer-Chart'],

  init() {
    this._super(...arguments)
    this.cursorPosition = [0, 0]
    this.rectTypes = ['client']
  },

  // attributeBindings: ['width', 'height', 'viewBox', 'ariaLabelledBy:aria-labelledby', 'role'],

  containerComponentName: 'primer-container',

  title: null,
  desc: null,
  ariaLabelledBy: 'title desc',
  role: 'img',

  // TODO: Rename types to rectTypes
  rectTypes: null,

  width: computed.reads('contentRect.client.width'),
  height: computed.reads('contentRect.client.height'),

  viewBox: computed('width', 'height', {
    get() {
      let { width, height } = this.getProperties('width', 'height')
      if (!width || !height) return undefined
      return [0, 0, width, height].join(' ')
    },
  }),

  actions: {
    updateCursorPosition([xValue, yValue], [xCursor, yCursor]) {
      let action = this.get('cursor-moved')
      if (action) action([xValue, yValue], [xCursor, yCursor])
    },
  },
})
