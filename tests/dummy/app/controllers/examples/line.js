import Controller from '@ember/controller'

export default Controller.extend({
  init() {
    this._super(...arguments)
    this.cursorPosition = [0, 0]
  },

  actions: {
    updateToolTipPosition([x, y]) {
      this.setProperties({
        cursorPosition: [x, y],
      })
    },
  },
})
