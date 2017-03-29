'use strict';

import gulp from 'gulp';

const csscomb = require('gulp-csscomb');
const connect = require('gulp-connect');
const csslint = require('gulp-csslint');
const cssnano = require('cssnano');
const cssnext = require('postcss-cssnext');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

// Sass to CSS
gulp.task('sass', () => {
  const processors = [
    cssnext({
      browsers: 'last 3 versions'
    }),
    cssnano({
      autoprefixer: false
    })
  ];

  return gulp.src('src/scss/main.scss')
    .pipe(plumber())
    //.pipe(changed('dist/css', {extension: '.css'}))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', (e) => {
      console.log(e + '\r\n There\'s something wrong with the Sass file(s).')
    }))
    .pipe(csscomb())
    .pipe(postcss(processors))
    .pipe(csslint())
    .pipe(csslint.formatter())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

gulp.task('sass:test', () => {
  const sassLint = require('gulp-sass-lint');

  return gulp.src('./src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});
