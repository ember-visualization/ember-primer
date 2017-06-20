/* eslint-env node */
'use strict';

let path = require('path');

module.exports = function(app) {
  let express = require('express');
  app.use('/data', express.static(path.join(__dirname, 'data')));
};
