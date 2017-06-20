'use strict';

import gulp from 'gulp';
import requireDir from 'require-dir';
import sequence from 'gulp-sequence';

requireDir('./gulp/');

const environment = process.env.NODE_ENV;
if (environment !== undefined) {
  console.log(`Environment: ${environment}`);
}

// Automate copying
gulp.task('copy:all', [
  'copy:css',
  'copy:fonts',
  'copy:jsplugins',
  'copy:jsvendor',
  'copy:other'
]);

// Builds the website
gulp.task('build:development', sequence(['handlebars:development', /*'html',*/ 'copy:all'], ['images', 'sass', 'js']));

gulp.task('build:production', sequence(['handlebars:production', /*'html',*/ 'copy:all'], ['images', 'sass', 'js']));

// Deploy web to ftp
gulp.task('deploy', sequence('build:production', 'ftp'));

// Setup development environment
gulp.task('dev', sequence('build:development', 'server'));

// Test task for testing HTML, Sass and JavaScript
gulp.task('test', sequence('html:test', 'sass:test', 'js:test'));

// Start server and watch HTML, CSS and JavaScript files for changes
gulp.task('server', ['browser-sync'], () => {
  const browserSync = require('browser-sync');
  const reload = browserSync.reload;

  gulp.watch('src/*.html', ['html'], reload);
  gulp.watch('src/templates/**/*.*', ['handlebars:development'], reload);
  gulp.watch(['src/*.php', 'src/*.txt'], ['copy:other'], reload);
  gulp.watch('src/scss/**/*.scss', ['sass'], reload);
  gulp.watch('src/css/**/*.css', ['copy:css'], reload);
  gulp.watch('src/js/**/*.js', ['js'], reload);
  gulp.watch(['src/images/**/*', '!src/images/**-/*.rar'], ['images'], reload);
});

// Create default task (cmd: gulp)
gulp.task('default', ['dev']);
