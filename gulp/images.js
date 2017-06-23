'use strict';

import gulp from 'gulp';

// Compress images
gulp.task('images', () => {
  const changed = require('gulp-changed');
  const imagesPath = './dist/images';
  const imagemin = require('gulp-imagemin');
  const plumber = require('gulp-plumber');
  const pngquant = require('imagemin-pngquant');
  const prune = require('gulp-prune');

  return gulp.src(['src/images/**/*', '!src/images/**/*.rar', '!src/images/**/*.7z', '!src/images/**/*.zip', '!src/images/case-studies/**/*'])
    .pipe(plumber())
    .pipe(prune(imagesPath))
    .pipe(changed(imagesPath, {
      hasChanged: changed.compareLastModifiedTime
    })) // compareContents or compareLastModifiedTime
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(imagesPath));
});
