import Mixin from 'ember-metal/mixin';
import run from 'ember-runloop';

const MutObserver = self.window.MutationObserver || self.window.WebKitMutationObserver;

export default Mixin.create({

  minHeight: 50,

  minWidth: 50,

  width: null,

  height: null,

  init() {
    this._super();

    this.runloopAwareResize = () => {
      run.join(this, this.didResize);
    };
  },

  addGlobalEvents() {
    window.addEventListener('resize', this.runloopAwareResize, { passive: true });
    window.addEventListener('orientationchange', this.runloopAwareResize, { passive: true });
  },

  removeGlobalEvents() {
    window.removeEventListener('resize', this.runloopAwareResize);
    window.removeEventListener('orientationchange', this.runloopAwareResize);
  },

  startObservingDomMutations() {
    if (MutObserver) {
      this.mutationObserver = new MutObserver((mutations) => {
        if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
          this.runloopAwareResize();
        }
      });
      this.mutationObserver.observe(this.element, { childList: true, subtree: true });
    } else {
      this.element.addEventListener('DOMNodeInserted', this.runloopAwareResize, false);
      this.element.addEventListener('DOMNodeRemoved', this.runloopAwareResize, false);
    }
  },

  stopObservingDomMutations() {
    if (MutObserver) {
      if (this.mutationObserver) {
        this.mutationObserver.disconnect();
        this.mutationObserver = null;
      }
    } else {
      if (this.element) {
        this.element.removeEventListener('DOMNodeInserted', this.runloopAwareReposition);
        this.element.removeEventListener('DOMNodeRemoved', this.runloopAwareReposition);
      }
    }
  },

  didInsertElement() {
    this._super(...arguments);

    if (this.get('width') === null) {
      this.addGlobalEvents();
      // this.startObservingDomMutations();

      // window.addEventListener(`resize.${ this.elementId }`, this.didResize.bind(this));
      run.scheduleOnce('render', this, this.measureDimensions);
    }
  },

  willDestroyElement() {
    this.removeGlobalEvents();
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

    let { minWidth, minHeight } = this.getProperties('minWidth', 'minHeight');

    let rect = this.element.getBoundingClientRect();
    this.setProperties({
      width: Math.max(rect.width, minWidth),
      height: Math.max(rect.height, minHeight)
    });
  }

});
