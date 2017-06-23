'use strict';

import gulp from 'gulp';

import browserSync from 'browser-sync';
import changed from 'gulp-changed';
import handlebars from 'gulp-hb';
import htmlmin from 'gulp-htmlmin';
import plumber from 'gulp-plumber';
import prune from 'gulp-prune';
import rename from 'gulp-rename';

const hbPath = './dist';

// Compile handlebars to HTML
gulp.task('hb:dev', () => {
  return gulp.src('./src/templates/*.hbs')
    .pipe(plumber())
    .pipe(prune({ dest: hbPath, ext: ['.hbs' , '.html'] }))
    .pipe(changed(hbPath))
    .pipe(handlebars({
      data: './src/templates/data/**/*.json',
      helpers: './src/templates/helpers/**/*.js',
      partials: './src/templates/partials/**/*.hbs'
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest(hbPath))
    .pipe(browserSync.stream({
      match: '**/*.html'
    }));
});

// Compile handlebars to HTML, minify HTML
gulp.task('hb:prod', () => {
  return gulp.src('./src/templates/*.hbs')
    .pipe(plumber())
    .pipe(prune({ dest: hbPath, ext: ['.hbs' , '.html'] }))
    .pipe(changed(hbPath))
    .pipe(handlebars({
      data: './src/templates/data/**/*.json',
      helpers: './src/templates/helpers/**/*.js',
      partials: './src/templates/partials/**/*.hbs'
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true
    }))
    .pipe(gulp.dest(hbPath))
    .pipe(browserSync.stream({
      match: '**/*.html'
    }));
});
