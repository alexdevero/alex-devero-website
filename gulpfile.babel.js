'use strict';

import gulp from 'gulp';
import requireDir from 'require-dir';
import sequence from 'gulp-sequence';

requireDir('./gulp/');

// Automate copying
gulp.task('copy:all', [
  'copy:css',
  'copy:fonts',
  'copy:jsplugins',
  'copy:jsvendor',
  'copy:other'
]);

// Builds the website
gulp.task('build', sequence(['html', 'copy:all'], ['images', 'sass', 'js']));

// Deploy web to ftp
gulp.task('deploy', sequence('build', 'ftp'));

// Setup development environment
gulp.task('dev', sequence('build', 'watch'));

// Test task for testing HTML, Sass and JavaScript
gulp.task('test', sequence('html:test', 'sass:test', 'js:test'));

// Watch HTML, CSS and JavaScript files
gulp.task('watch', ['server'], () => {
  gulp.watch('src/*.html', ['html']);
  gulp.watch(['src/*.php', 'src/*.txt'], ['copy:other']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/css/**/*.css', ['copy:css']);
  gulp.watch('src/js/main.js', ['js']);
  gulp.watch(['src/images/**/*', '!src/images/**/*.rar'], ['images']);
});

// Create default task (cmd: gulp)
gulp.task('default', ['dev']);
