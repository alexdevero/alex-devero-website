'use strict'

import gulp from 'gulp'

// Clean dist
gulp.task('clean', () => {
  const rimraf = require('gulp-rimraf')

  console.log('Clean \'dist\' folder')

  return gulp.src('./dist', {
    read: false
  })
    .pipe(rimraf())
})
