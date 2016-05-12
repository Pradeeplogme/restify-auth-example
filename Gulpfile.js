'use strict';

// Gulp and dependencies
var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var notify   = require('gulp-notify');
var nodemon = require('gulp-nodemon');

// Lint JS Files
gulp.task('lint', function () {
  return gulp.src('*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


// Watch Files For Changes
gulp.task('watch', function () {
  gulp.watch('*.js', ['lint']);
});

gulp.task('demon', function () {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('start', ['watch'])
    .on('change', ['watch'])
    .on('restart', () => console.log('restarted!'));
});

// Default Task
gulp.task('default', ['demon']);
