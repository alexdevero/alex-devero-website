var gulp = require('gulp');
var concat = require('gulp-concat');
var gulpCopy = require('gulp-copy');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');

// Concatenate JavaScript files
gulp.task('concatJS', function() {
  return gulp.src('./src/js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('./dist/js/'));
});
// Minify HTML files
gulp.task('minifyHTML', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist'))
});
// Copy CSS files
gulp.task('copyCSS', function() {
  return gulp.src('src/css/*')
  .pipe(gulp.dest('dist/css'));
});
// Copy font files
gulp.task('copyFonts', function() {
  return gulp.src('src/fonts/*')
  .pipe(gulp.dest('dist/fonts'));
});
// Copy JS plugins files
gulp.task('copyJSPlug', function() {
  return gulp.src('src/js/plugins/*')
  .pipe(gulp.dest('dist/js/plugins/'));
});
// Copy JS vendor files
gulp.task('copyJSVen', function() {
  return gulp.src('src/js/vendor/*')
  .pipe(gulp.dest('dist/js/vendor/'));
});
// Copy other files
gulp.task('copyOther', function() {
  return gulp.src([
    'src/.htaccess',
    'src/crossdomain.xml',
    'src/humans.txt',
    'src/robots.txt'
  ])
  .pipe(gulp.dest('dist'));
});
// Automate copying
gulp.task('copyAll', ['copyCSS', 'copyFonts', 'copyJSPlug', 'copyJSVen', 'copyOther'], function() {});

// Compress images
gulp.task('images', function () {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/images'));
});
// Minify JavaScript files
gulp.task('minifyJS', function() {
  return gulp.src('src/js/main.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'));
});
// Automate tasks (cmd: gulp)
gulp.task('default', ['minifyHTML', 'copyAll', 'images', 'minifyJS'], function() {});
