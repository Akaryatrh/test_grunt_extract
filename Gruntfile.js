var fs = require('fs');
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    dom_munger: {
      ifeelgoodsHeader: {
        options: {
          callback: function($,file){
            //var result = data.replace(/<!doctype [^>]*?>/gi, '');
            var header = $('.header-wrap');
            $('html').before(header).remove();
          }
        },
        src: 'temp/src/ifeelgoods_inline.html',
        dest: 'temp/dest/header.html'
      }
    },

    curl: {
      'temp/src/ifeelgoods.html': 'http://www.ifeelgoods.com/catalog/'
    },

    inlinecss: {
        main: {
            files: {
                'temp/src/ifeelgoods_inline.html': 'temp/src/ifeelgoods.html'
            }
        }
    },

    processhtml: {
      dist: {
        files: {
          'dist/header.html': ['temp/dest/header.html']
        }
      }
    }


  });

  // Load all plugins declared as dependencies in package.json file ------------------------------------
  var package = grunt.config.get('pkg');
  var depMatch = /^grunt-.*/;
  for(dep in package.dependencies){
    if(depMatch.test(dep)){
      grunt.loadNpmTasks(dep);
    }
  }
  for(dep in package.devDependencies){
    if(depMatch.test(dep)){
      grunt.loadNpmTasks(dep);
    }
  }

  // Main tasks ------------------------------------
  //grunt.registerTask('build', ['jshint', 'uglify', 'less', 'processhtml', 'sprite', 'imagemin']);
  //grunt.registerTask('server', ['build', 'connect', 'watch']);
  grunt.registerTask('extract', ['curl', 'inlinecss', 'dom_munger']);

};