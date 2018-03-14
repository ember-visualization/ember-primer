/* eslint-env node */
'use strict'

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon')
const autoprefixer = require('autoprefixer')
const systemUIFont = require('postcss-font-family-system-ui')

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    postcssOptions: {
      compile: {
        enabled: false,
      },
      plugins: [systemUIFont],
      filter: {
        enabled: true,
        plugins: [
          {
            module: autoprefixer,
            options: {
              browsers: ['last 5 version', 'ie 9'],
            },
          },
        ],
      },
    },

    vendorFiles: {
      'jquery.js': null,
    },
  })

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree()
}
