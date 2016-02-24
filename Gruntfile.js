'use strict';

module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    copy: {
      main: {
        files: [{
          src: ['fonts/'],
          dest: 'dist/fonts/'
        }]
      }
    },
    cssmin: {
      build: {
        src: ['css/*.css'], 
        dest: 'build/css/*.min.css'
      }
    },
    jshint: {
      build: ['js/**/*.js'],
      options: {
        'globals': null,
        'jshintrc': null,
        'extensions': '',
        'ignores': null,
        'force': false,
        'reporter': null,
        'reporterOutput': null
      }
    },
    uglify: {
      build: {
        src: ['js/**/*.js'], 
        dest: 'build/js/main.min.js'
      },
      options: {
        'mangle': {},
        'compress': {},
        'beautify': false,
        'expression': false,
        'report': 'min',
        'sourceMap': false,
        'sourceMapName': undefined,
        'sourceMapIn': undefined,
        'sourceMapIncludeSources': false,
        'enclose': undefined,
        'wrap': undefined,
        'exportAll': false,
        'preserveComments': undefined,
        'banner': '',
        'footer': ''
      }
    }
  });

  // Load the plugin that provides tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s)
  grunt.registerTask('default', ['concat', 'copy', 'cssmin', 'htmlmin', 'imagemin', 'js-hint', 'uglify']);
};
