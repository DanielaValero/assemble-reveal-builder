// Exports.
module.exports = function( grunt ) {
  'use strict';


  grunt.initConfig( {
    jshint: {
      options: {
        jshintrc: true
      },
      all: [ '*.js', 'test/*.js' ]
    },

    assemble: {
      options: {
        plugins: [ './index.js' ],
        context: {
          dest: '.tmp/'
        }
      },
      slides: {
        options: {
          layout: 'test/fixtures/layout-test.hbs'
        },
        files: [ {
          cwd: 'test/fixtures/pages-test',
          dest: 'test/actual',
          expand: true,
          filter: 'isFile',
          extDot: [ 'md', 'hbs' ],
          src: [ '**/master.hbs']
        } ]
      }
    },
    cafemocha: {
      src: 'test/*.js'
    },
    clean: {
      all: [ '.tmp', 'test/actual/*' ]
    }
  } );

  // Load tasks.
  [
    'assemble',
    'grunt-cafe-mocha',
    'grunt-contrib-clean',
    'grunt-contrib-jshint'
  ].forEach( grunt.loadNpmTasks );

  // Tasks.
  grunt.registerTask( 'default', [ 'jshint', 'assemble', 'cafemocha', 'clean' ] );
};
