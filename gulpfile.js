var gulp = require('gulp');
// load all gulp modules in a 'plugin' object
var plugins = require('gulp-load-plugins')({lazy: true});
// command line options
var args = require('yargs').argv;
// gulp config file
var config = require('./gulp.config')();

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

function log(msg) {
  plugins.util.log(msg);
}