/* jshint node:true */
'use strict';

module.exports = function() {
  var config = {
    alljs: [
      './src/**/*.js',
      './test/**/*.js',
      './*.js'
    ],
    testjs: [
      './test/**/*.js'
    ],
    ficsHost: 'freechess.org',
    ficsPort: 5000,
    serverPort: 3030
  };

  return config;
};