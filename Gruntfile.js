module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


    curl: {
      'temp/ifeelgoods.html': 'http://ifeelgoods.com/',
    },

    dom_munger: {
      ifeelgoodsHeader: {
        options: {
          read: {selector:'.header-wrap', attribute: '', writeto:'headerIFG', isPath: true}
        },
        src: 'temp/ifeelgoods.html'
      }
    },

    inlinecss: {
        main: {
            options: {
            },
            files: {
                'temp/ifeelgoods_inline.html': 'temp/ifeelgoods.html'
            }
        }
    },

    processhtml: {
      dist: {
        files: {
          'dist/header.html': ['<%= dom_munger.data.headerIFG %>']
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
  grunt.registerTask('extract', ['dom_munger', 'inlinecss']);

};