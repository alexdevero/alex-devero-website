'use strict';

const gulp = require('gulp');

const babel = require('gulp-babel');

const changed = require('gulp-changed');

const clean = require('gulp-clean');

const concat = require('gulp-concat');

const connect = require('gulp-connect');

const csscomb = require('gulp-csscomb');

const csslint = require('gulp-csslint');

const cssnano = require('cssnano');

const gulpCopy = require('gulp-copy');

const html5Lint = require('gulp-html5-lint');

const htmlmin = require('gulp-htmlmin');

const imagemin = require('gulp-imagemin');

const livereload = require('gulp-livereload');

const postcss = require('gulp-postcss');

const rename = require('gulp-rename');

const sass = require('gulp-sass');

const sequence = require('gulp-sequence');

const sourcemaps = require('gulp-sourcemaps');

const uglify = require('gulp-uglify');

const gulpUtil = require('gulp-util');

const pngquant = require('imagemin-pngquant');

const cssnext = require('postcss-cssnext');

const vinylFtp = require('vinyl-ftp');

// Concatenate JavaScript files
/*gulp.task('concatJS', function() {
  return gulp.src('./src/js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('./dist/js/'));
});*/

// Clean dist
gulp.task('clean', () => {
  console.log('Clean \'dist\' folder');

  return gulp.src('dist', {
    read: false
  })
    .pipe(clean());
});

// Connect to localhost
gulp.task('server', () => {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

// Deploy files to FTP
gulp.task('deploy', () => {
  const credentials = require('./alexdevero-ftp-credentials.json');

  const destFolder = 'www/public';

  const filesGlob = ['./dist/**/*.*'];

  var conn = vinylFtp.create({
    host: '40849.w49.wedos.net',
    user: credentials.username,
    password: credentials.password,
    parallel: 5,
    maxConnections: 10,
    secure: false,
    log: gulpUtil.log
  });

  // base set to './dist/' will copy content of dist folder
  // without the folder itself
  return gulp.src(filesGlob, {
    base: './dist/',
    buffer: false
  })
    .pipe(conn.newer(destFolder))
    .pipe(conn.dest(destFolder));
});

// Minify HTML files
gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(changed('dist'))
    //.pipe(html5Lint())
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

// Copy CSS files
gulp.task('copyCSS', () => {
  return gulp.src('src/css/*')
    .pipe(changed('dist/css'))
    .pipe(gulp.dest('dist/css'));
});

// Copy font files
gulp.task('copyFonts', () => {
  return gulp.src('src/fonts/*')
    .pipe(changed('dist/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

// Copy JS plugins files
gulp.task('copyJSPlug', () => {
  return gulp.src(['src/js/plugins/*', '!src/js/plugins/*.rar'])
    .pipe(changed('dist/js/plugins/'))
    .pipe(gulp.dest('dist/js/plugins/'));
});

// Copy JS vendor files
gulp.task('copyJSVen', () => {
  return gulp.src(['src/js/vendor/*', '!src/js/vendor/*.rar'])
    .pipe(changed('dist/js/vendor/'))
    .pipe(gulp.dest('dist/js/vendor/'));
});

// Copy other files
gulp.task('copyOther', () => {
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

// Automate copying
gulp.task('copyAll', ['copyCSS', 'copyFonts', 'copyJSPlug', 'copyJSVen', 'copyOther']);

// Compress images
gulp.task('images', () => {
  return gulp.src(['src/images/**/*', '!src/images/**/*.rar'])
    .pipe(changed('dist/images'))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/images'));
});

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

// Minify JavaScript files
gulp.task('js', () => {
  return gulp.src('src/js/main.js')
    .pipe(changed('dist/js'))
    .pipe(babel({
      presets: ['latest']
    }))
    .pipe(uglify().on('error', (e) => {
      console.log(e + '\r\n There\'s something wrong with the JavaScript file(s).')
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

// Watch HTML, CSS and JavaScript files
gulp.task('watch', ['server'], () => {
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/*.php', ['copyOther']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/css/**/*.css', ['copyCSS']);
  gulp.watch('src/js/main.js', ['js']);
  gulp.watch(['src/images/**/*', '!src/images/**/*.rar'], ['images']);
});

// Automate tasks (cmd: gulp)
gulp.task('default', sequence(['html', 'copyAll'], ['images', 'sass', 'js']));
