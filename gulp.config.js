module.exports = function() {
  var config = {
    alljs: [
      './src/**/*.js',
      './*.js'
    ],
    testjs: [
      './src/test/*.js'
    ]
  };

  return config;
};