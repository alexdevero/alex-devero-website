'use strict'

import gulp from 'gulp'

// Deploy files to FTP
gulp.task('ftp', () => {
  const credentials = require('../alexdevero-ftp-credentials.json')
  const destFolder = 'www/public'
  const gulpUtil = require('gulp-util')
  const filesGlob = ['./dist/**/*.*']
  const vinylFtp = require('vinyl-ftp')

  var conn = vinylFtp.create({
    host: '40849.w49.wedos.net',
    user: credentials.username,
    password: credentials.password,
    parallel: 5,
    maxConnections: 10,
    secure: false,
    log: gulpUtil.log
  })

  // base set to './dist/' will copy content of dist folder
  // without the folder itself
  return gulp.src(filesGlob, {
    base: './dist/',
    buffer: false
  })
    .pipe(conn.newer(destFolder))
    .pipe(conn.dest(destFolder))
})
