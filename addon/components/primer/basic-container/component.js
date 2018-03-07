import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import transformString from 'ember-primer/utils/transform-string';

/**
 * primer/basic-container renders a positioned <g> tag and exposes the public
 * APIs of Primer for rendering visualizations within the container.
 *
 * @public
 * @interface
 * @class PrimerBasicContainer
 */
export default Component.extend({
  layout,
  tagName: 'g',

  /**
   * Offset x
   * @public
   * @type {Number}
   */
  x: 0,

  /**
   * Offset Y
   * @public
   * @type {Number}
   */
  y: 0,

  /**
   * Additional transform to apply to the container tag
   *
   * @public
   * @type {String}
   */
  transform: null,

  _transform: computed('x', 'y', 'transform', {
    get() {
      let { x, y, transform } = this.getProperties('x', 'y', 'transform');
      return transformString(transform, { translate: [x, y] }).trim();
    }
  }),

  attributeBindings: ['_transform:transform']
});
