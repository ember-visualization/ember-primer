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
  desc: null
});
