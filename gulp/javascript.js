'use strict'

import gulp from 'gulp'
import plumber from 'gulp-plumber'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'

// Minify JavaScript files
gulp.task('js', () => {
  // const babel = require('gulp-babel')
  const browserSync = require('browser-sync')
  const changed = require('gulp-changed')
  const jsPath = './dist/js'
  const moduleConfig = {
    entry: './src/js/main.js',
    output: {
      filename: 'main.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        }
      ]
    }
  }
  const rename = require('gulp-rename')
  const uglify = require('gulp-uglify')
  const uglifyDropConsole = (process.env.NODE_ENV.trim() !== 'development')

  return gulp.src(['src/js/main.js'])
    .pipe(plumber())
    .pipe(changed(jsPath))
    // .pipe(babel())
    .pipe(webpackStream(moduleConfig, webpack))
    .pipe(uglify({
      compress: {
        drop_console: uglifyDropConsole
      }
    }).on('error', (e) => {
      console.log(e + '\r\n There\'s something wrong with the JavaScript file(s).')
    }))
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(jsPath))
    .pipe(browserSync.stream({
      match: '**/*.js'
    }))
})

gulp.task('js:test', () => {
  const eslint = require('gulp-eslint')

  console.log('Running JavaScript lint test')

  return gulp.src('./src/js/main.js')
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})
