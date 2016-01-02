module.exports = function() {
  var config = {
    alljs: [
      './src/**/*.js',
      './*.js'
    ],
    testjs: [
      './src/test/*.js'
    ],
    ficsHost: 'freechess.org',
    ficsPort: 5000,
    serverPort: 3030
  };

  return config;
};