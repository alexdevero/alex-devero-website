'use strict'

import gulp from 'gulp'
import changed from 'gulp-changed'
import plumber from 'gulp-plumber'
import prune from 'gulp-prune'

// Copy CSS files
gulp.task('copy:css', () => {
  const cssPath = './dist/styles'

  return gulp.src('./src/styles/_vendor/*')
    .pipe(plumber())
    .pipe(prune(cssPath))
    .pipe(changed(cssPath))
    .pipe(gulp.dest(cssPath))
})

// Copy font files
gulp.task('copy:fonts', () => {
  const fontsPath = './dist/fonts'

  return gulp.src('./src/fonts/*')
    .pipe(plumber())
    .pipe(prune(fontsPath))
    .pipe(changed(fontsPath))
    .pipe(gulp.dest(fontsPath))
})

// Copy JS plugins files
gulp.task('copy:jsplugins', () => {
  const jspluginsPath = './dist/js/plugins/'

  return gulp.src([
    './src/js/plugins/*.js',
    './node_modules/html5shiv/dist/html5shiv.min.js',
    './node_modules/emergence.js/dist/emergence.min.js',
    './node_modules/vanilla-lazyload/dist/lazyload.min.js',
    './node_modules/particlesjs/dist/particles.min.js'
    // './node_modules/three/build/three.min.js',
    // 'node_modules/typed.js/dist/typed.min.js',
    // 'node_modules/waypoints/lib/noframework.waypoints.min.js'
  ])
    .pipe(plumber())
    .pipe(prune({ dest: jspluginsPath, ext: ['.js'] }))
    .pipe(changed(jspluginsPath))
    .pipe(gulp.dest(jspluginsPath))
})

// Copy JS vendor files
gulp.task('copy:jsvendor', () => {
  const jsvendorPath = './dist/js/vendor/'

  return gulp.src([
    './src/js/vendor/*',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/jquery/dist/jquery.min.map'
  ])
    .pipe(plumber())
    .pipe(prune(jsvendorPath))
    .pipe(changed(jsvendorPath))
    .pipe(gulp.dest(jsvendorPath))
})

// Copy other files
gulp.task('copy:other', () => {
  const otherPath = './dist/'

  return gulp.src([
    './src/.htaccess',
    './src/contact.php',
    './src/crossdomain.xml',
    './src/humans.txt',
    './src/robots.txt'
  ])
    .pipe(plumber())
    .pipe(prune({ dest: otherPath, ext: ['.htaccess', '.php', '.txt', '.xml'] }))
    .pipe(changed(otherPath))
    .pipe(gulp.dest(otherPath))
})

// gulp.task('copy:renders', () => {
//   const renderPath = './dist/renders'
//
//   return gulp.src('./src/renders/*')
//     .pipe(plumber())
//     .pipe(changed(renderPath))
//     .pipe(gulp.dest(renderPath))
// })

// gulp.task('copy:videos', () => {
//   const renderPath = './dist/videos'
//
//   return gulp.src('./src/videos/*')
//     .pipe(plumber())
//     .pipe(changed(renderPath))
//     .pipe(gulp.dest(renderPath))
// })
