'use strict';

import gulp from 'gulp';
import changed from 'gulp-changed';

// Copy CSS files
gulp.task('copy:css', () => {
  return gulp.src('src/css/*')
    .pipe(changed('dist/css'))
    .pipe(gulp.dest('dist/css'));
});

// Copy font files
gulp.task('copy:fonts', () => {
  return gulp.src('src/fonts/*')
    .pipe(changed('dist/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

// Copy JS plugins files
gulp.task('copy:jsplugins', () => {
  return gulp.src([
      'src/js/plugins/*',
      '!src/js/plugins/*.rar',
      'node_modules/waypoints/lib/noframework.waypoints.min.js'
    ])
    .pipe(changed('dist/js/plugins/'))
    .pipe(gulp.dest('dist/js/plugins/'));
});

// Copy JS vendor files
gulp.task('copy:jsvendor', () => {
  return gulp.src([
      'src/js/vendor/*',
      '!src/js/vendor/*.rar',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/jquery/dist/jquery.min.map'
    ])
    .pipe(changed('dist/js/vendor/'))
    .pipe(gulp.dest('dist/js/vendor/'));
});

// Copy other files
gulp.task('copy:other', () => {
  return gulp.src([
    'src/.htaccess',
    'src/crossdomain.xml',
    'src/humans.txt',
    'src/robots.txt',
    'src/contact.php'
  ])
    .pipe(changed('dist'))
    .pipe(gulp.dest('dist'));
});
