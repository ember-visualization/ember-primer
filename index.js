/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-primer',

  isDevelopingAddon() {
    return true;
  },

  included() {
    this._super.included.apply(this, arguments);
  }
};
