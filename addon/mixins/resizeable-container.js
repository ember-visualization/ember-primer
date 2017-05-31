import DOM from 'ember-lifeline/mixins/dom';
import Mixin from 'ember-metal/mixin';
import run from 'ember-runloop';

export default Mixin.create(DOM, {

  minHeight: 50,

  minWidth: 50,

  width: null,

  height: null,

  didInsertElement() {
    this._super(...arguments);

    if (this.get('width') === null) {
      this.addEventListener(window, `resize.${ this.elementId }`, this.didResize);
      run.scheduleOnce('afterRender', this, this.measureDimensions);
    }
  },

  didResize() {
    run.throttle(this, this.measureDimensions, 16);
  },

  /**
   * Calculates dimensions of this container. This forces the browser to calculate
   * styles, which is slow, so don't do this too often or you'll create jank.
   *
   * @public
   */
  measureDimensions() {
    if (!this.element) {
      return;
    }

    run.scheduleOnce('afterRender', this, () => {
      let { minWidth, minHeight } = this.getProperties('minWidth', 'minHeight');

      let rect = this.element.getBoundingClientRect();
      this.setProperties({
        width: Math.max(rect.width, minWidth),
        height: Math.max(rect.height, minHeight)
      });
    });
  }

});
