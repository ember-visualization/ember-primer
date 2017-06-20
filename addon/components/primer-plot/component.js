import Component from 'ember-component';
// import ResizeableContainer from 'ember-primer/mixins/resizeable-container';
import WithContentRect from 'ember-measure/with-content-rect';
import layout from './template';
import computed from 'ember-computed';

export default Component.extend(WithContentRect, {
  layout,
  tagName: 'svg',

  classNames: ['Primer-Plot', 'Primer-Chart'],

  attributeBindings: ['width', 'height', 'viewBox', 'ariaLabelledBy:aria-labelledby', 'role'],

  containerComponentName: 'primer-container',

  title: null,
  desc: null,
  ariaLabelledBy: 'title desc',
  role: 'img',

  cursorPosition: [0, 0],

  // TODO: Rename types to rectTypes
  types: ['client'],

  width: computed.reads('contentRect.client.width'),
  height: computed.reads('contentRect.client.height'),

  viewBox: computed('width', 'height', {
    get() {
      let { width, height } = this.getProperties('width', 'height');

      if (!width || !height) {
        return undefined;
      }

      return [0, 0, width, height].join(' ');
    }
  }),

  actions: {
    updateCursorPosition([xValue, yValue], [xCursor, yCursor]) {
      this.sendAction('cursor-moved', [xValue, yValue], [xCursor, yCursor]);
    }
  }
});
