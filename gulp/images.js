'use strict';

import gulp from 'gulp';

// Compress images
gulp.task('images', () => {
  const changed = require('gulp-changed');
  const imagemin = require('gulp-imagemin');
  const pngquant = require('imagemin-pngquant');

  return gulp.src(['src/images/**/*', '!src/images/**/*.rar'])
    .pipe(changed('dist/images'))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/images'));
});
