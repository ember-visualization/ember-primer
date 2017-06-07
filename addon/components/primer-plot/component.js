import Component from 'ember-component';
import ResizeableContainer from 'ember-primer/mixins/resizeable-container';
import layout from './template';

export default Component.extend(ResizeableContainer, {
  layout,

  tagName: 'svg',

  classNames: ['Primer-Plot'],

  attributeBindings: ['width', 'height'],

  containerComponentName: 'primer-container',

  title: null,
  desc: null,

  cursorPosition: [0, 0],

  actions: {
    cursorChangedPosition([xValue, yValue], [xCursor, yCursor]) {
      this.sendAction('cursor-moved', [xValue, yValue], [xCursor, yCursor]);
    }
  }
});
