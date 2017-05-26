import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,

  tagName: 'svg',

  classNames: ['Primer-Plot'],

  attributeBindings: ['width', 'height'],

  width: 960,
  height: 500
});
