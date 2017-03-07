'use strict';

import gulp from 'gulp';

// Connect to localhost
gulp.task('server', () => {
  const connect = require('gulp-connect');
  const livereload = require('gulp-livereload');

  connect.server({
    root: 'dist',
    livereload: true
  });
});
