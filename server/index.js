/* eslint-env node */
'use strict';

module.exports = function(app) {
  let globSync   = require('glob').sync;
  let mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  let proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);

  // Log proxy requests
  let morgan = require('morgan');
  app.use(morgan('dev'));

  mocks.forEach((route) => route(app));
  proxies.forEach((route) => route(app));
};
