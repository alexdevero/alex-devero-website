'use strict';

import gulp from 'gulp';

import requireDir from 'require-dir';
//const gulp = require('gulp');
//const requireDir = require('require-dir');
const sequence = require('gulp-sequence');

requireDir('./gulp/');

// Watch HTML, CSS and JavaScript files
gulp.task('watch', ['server'], () => {
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/*.php', ['copyOther']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/css/**/*.css', ['copyCSS']);
  gulp.watch('src/js/main.js', ['js']);
  gulp.watch(['src/images/**/*', '!src/images/**/*.rar'], ['images']);
});

// Automate copying
gulp.task('copy:all', ['copy:css', 'copy:fonts', 'copy:jsplugins', 'copy:jsvendor', 'copy:other']);

// Setup development environment
gulp.task('dev', sequence(['html', 'copy:all'], ['images', 'sass', 'js'], 'watch'));

// Automate tasks (cmd: gulp)
gulp.task('default', ['dev']);
