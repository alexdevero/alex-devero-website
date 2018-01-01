'use strict'

import gulp from 'gulp'

import assets from 'postcss-assets'
import browserSync from 'browser-sync'
import csscomb from 'gulp-csscomb'
import cssnano from 'cssnano'
import cssnext from 'postcss-cssnext'
import plumber from 'gulp-plumber'
import postcss from 'gulp-postcss'
import pxtorem from 'postcss-pxtorem'
import rename from 'gulp-rename'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'

// Sass to CSS
gulp.task('sass', () => {
  const sassPath = './dist/styles'

  const assetsConfig = {
    basePath: './src/',
    loadPaths: ['./images/']
  }

  const cssnanoConfig = {
    autoprefixer: false
  }

  const cssnextConfig = {
    browsers: [
      'Firefox >= 52',
      'Chrome >= 55',
      'ie >= 8',
      'last 4 versions',
      'Safari >= 9'
    ]
  }

  const pxtoremConfig = {
    rootValue: 16,
    unitPrecision: 5,
    propList: ['*'],
    selectorBlackList: ['html', 'body'],
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
  }

  const processors = [
    assets(assetsConfig),
    cssnano(cssnanoConfig),
    cssnext(cssnextConfig),
    pxtorem(pxtoremConfig)
  ]

  return gulp.src('src/styles/main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', (e) => {
      console.log(e + '\r\n There\'s something wrong with the Sass file(s).')
    }))
    .pipe(csscomb())
    .pipe(postcss(processors))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(sassPath))
    .pipe(browserSync.stream({
      match: '**/*.css'
    }))
})

gulp.task('sass:test', () => {
  const sassLint = require('gulp-sass-lint')

  console.log('Running Sass lint test')

  return gulp.src('./src/styles/**/*.scss')
    .pipe(plumber())
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
})
