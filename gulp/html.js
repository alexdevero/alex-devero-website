'use strict';

import gulp from 'gulp';
import plumber from 'gulp-plumber';

// Minify HTML files
gulp.task('html', () => {
  const changed = require('gulp-changed');
  const connect = require('gulp-connect');
  const html5Lint = require('gulp-html5-lint');
  const htmlmin = require('gulp-htmlmin');

  return gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(changed('dist'))
    //.pipe(html5Lint())
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

// Hint HTML files
gulp.task('html:test', () => {
  const htmlhint = require('gulp-htmlhint');

  return gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(htmlhint.failReporter({
      suppress: false
    }));
});
