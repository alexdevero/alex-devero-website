'use strict';

import gulp from 'gulp';
import plumber from 'gulp-plumber';

// Minify HTML files
gulp.task('html', () => {
  const browserSync = require('browser-sync');
  const changed = require('gulp-changed');
  const htmlPath = './dist';
  const htmlmin = require('gulp-htmlmin');
  const prune = require('gulp-prune');

  return gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(prune(htmlPath))
    .pipe(changed(htmlPath))
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true
    }))
    .pipe(gulp.dest(htmlPath))
    .pipe(browserSync.stream({
      match: '**/*.html'
    }));
});

// Hint HTML files
gulp.task('html:test', ['hb:prod'], () => {
  const htmlhint = require('gulp-htmlhint');

  console.log('Running HTML lint test');

  return gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(htmlhint.failReporter({
      suppress: false
    }));
});
