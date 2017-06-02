import Mixin from 'ember-metal/mixin';
import run from 'ember-runloop';

export default Mixin.create({

  minHeight: 50,

  minWidth: 50,

  width: null,

  height: null,

  didInsertElement() {
    this._super(...arguments);

    if (this.get('width') === null) {
      window.addEventListener(`resize.${ this.elementId }`, this.didResize.bind(this));
      run.scheduleOnce('render', this, this.measureDimensions);
    }
  },

  willRemoveElement() {
    window.removeEventListener(`resize.${ this.elementId }`, this.didResize);
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
