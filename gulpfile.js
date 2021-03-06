/*jshint node:true*/
'use strict';

var gulp = require('gulp');
// load all gulp modules in a 'plugin' object
var plugins = require('gulp-load-plugins')({lazy: true});
// command line options
var args = require('yargs').argv;
// gulp config file
var config = require('./gulp.config')();

var ficsHost = process.env.FICS_HOST || config.ficsHost;
var ficsPort = process.env.FICS_PORT || config.ficsPort;
var serverPort = process.env.SERVER_PORT || config.serverPort;

gulp.task('default', ['help']);

// print available gulp tasks
gulp.task('help', plugins.taskListing);

// analyze code for potential issues
gulp.task('vet', function() {
  log('Performing code analysis using JSHint');
  return gulp
    // analyze all js files
    .src(config.alljs)
    // print processed files if verbose
    .pipe(plugins.if(args.verbose, plugins.print()))
    // analyze
    .pipe(plugins.jshint())
    // report
    .pipe(plugins.jshint.reporter('jshint-stylish', {verbose: true}))
    // fail task if code violations were found
    .pipe(plugins.jshint.reporter('fail'));
});

// run mocha tests
gulp.task('test', ['vet'], function() {
  return gulp
    .src(config.testjs)
    .pipe(plugins.mocha());
});

// git pre-commit hook
gulp.task('pre-commit', ['test']);

gulp.task('serve', ['test'], function() {
  var options = {
    script: config.nodeApp,
    env: {
      'FICS_HOST': ficsHost,
      'FICS_PORT': ficsPort,
      'SERVER_PORT': serverPort
    },
    watch: [config.server]
  };
  return plugins.nodemon(options)
    .on('restart', ['test'], function(evt) {
      log('nodemon restarted');
      log('files changed:\n' + evt);
    })
    .on('start', function() {
      log('nodemon started');
    })
    .on('crash', function() {
      log('nodemon crashed');
    })
    .on('exit', function() {
      log('nodemon exited');
    });
});

function log(msg) {
  plugins.util.log(msg);
}