import Component from 'ember-component';
import computed from 'ember-computed';
import layout from './template';
import transformString from 'ember-primer/utils/transform-string';

const Label = Component.extend({
  layout,

  tagName: 'text',

  classNames: ['Primer-Label'],

  /**
   * Title attribute for accessibility
   * @public
   * @type {String}
   */
  title: null,

  /**
   * Computed to indicate if title is present
   * @private
   * @type {Boolean}
   */
  hasTitle: computed.notEmpty('title'),

  /**
   * Desc value for accessibility
   * @public
   * @type {String}
   */
  desc: null,

  /**
   * Computed to indicate if desc is present
   * @private
   * @type {Boolean}
   */
  hasDesc: computed.notEmpty('desc'),

  /**
   * Label text
   * @public
   * @type {String}
   */
  text: ' ',

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
   * Data offset X
   * @public
   * @type {Number}
   */
  dx: 0,

  /**
   * Data offset Y, used for emulating line height.
   * @public
   * @type {Number}
   */
  dy: 0,

  /**
   * Applies rotation to the label
   *
   * @public
   * @type {Number}
   */
  angle: 0,

  /**
   * Specifies the font-size, which is also used for calculating line height.
   *
   * @public
   * @type {Number}
   */
  fontSize: 12,

  textLength: null,

  /**
   * Applies the text anchor. Can be one of start, middle, end.
   *
   * @public
   * @type {String}
   */
  textAnchor: 'start',

  /**
   * Applies the certical anchor, which is calculated from font-size, line-height, and cap-height.
   *
   * @public
   * @type {String}
   */
  verticalAnchor: 'start',

  capHeight: 0.71,

  lineHeight: 1,

  transform: null,

  _transform: computed('angle', 'x', 'y', 'transform', {
    get() {
      let { angle, x, y, transform } = this.getProperties('angle', 'x', 'y', 'transform');
      let rotatePart = angle && { rotate: [angle, x, y] };
      return transform || angle ? transformString(transform, rotatePart).trim() : undefined;
    }
  }),

  attributeBindings: [
    '_transform:transform',
    'textAnchor:text-anchor',
    'textLength:text-length',
    'fontSize:font-size'
  ],

  textSpans: computed('text', {
    get() {
      let text = this.get('text');
      if (Array.isArray(text)) {
        return text;
      } else {
        return text.split('\n');
      }
    }
  }),

  spanDy: computed('y', 'dy', 'capHeight', 'lineHeight', {
    get() {
      let lineHeight = this.get('lineHeight');
      let fontSize = this.get('fontSize');
      let dy = this.get('dy');
      let { length } = this.get('textSpans');
      let capHeight = this.get('capHeight');
      let anchor = this.get('verticalAnchor') || 'middle';
      switch (anchor) {
        case 'end':
          return dy + (capHeight / 2 + (0.5 - length) * lineHeight) * fontSize;
        case 'middle':
          return dy + (capHeight / 2 + (0.5 - length / 2) * lineHeight) * fontSize;
        default:
          return dy + (capHeight / 2 + lineHeight / 2) * fontSize;
      }
    }
  })
});

Label.reopenClass({
  positionalParams: ['text']
});

export default Label;
