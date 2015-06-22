var path = require( 'path' );
var matter = require( 'gray-matter' );
var _ = require( 'lodash' );


module.exports = function( params, callback ) {
  'use strict';

  var assemble = params.assemble,
    grunt = params.grunt,
    pages = assemble.options.pages,
    slides = {},
    config,
    presentationPath,
    slidesFilePaths = [],
    pageIndex;

  if ( assemble.options.presentationPage ) {
    grunt.verbose.writeln( 'Running reveal-builder plugin in assemble:post:pages' );

    var generateSlidesData = function( slidePath ) {
      var slide = grunt.file.read( slidePath ),
        parsedSlide = matter( slide ),
        slideFileName = path.basename( slidePath ),
        slideObj = {
          page: parsedSlide.content,
          data: parsedSlide.data
        };
      slides[ slideFileName ] = _.extend( {}, slides[ slideFileName ], slideObj );
    };

    var isPageTheCurrentOne = function( page ) {
      return page.dest === pages[ i ].dest;
    };

    for ( var i = pages.length - 1; i >= 0; i-- ) {
      slides = {};
      presentationPath = path.dirname( pages[ i ].src );
      config = grunt.file.readYAML( path.join( presentationPath, 'config.yml' ) );
      pageIndex = _.findKey( assemble.options.collections.pages.items[ 0 ].pages, isPageTheCurrentOne );
      slidesFilePaths = grunt.file.expand( path.join( presentationPath, '/slides/**.md' ) );

      _.forEach( slidesFilePaths, generateSlidesData );

      grunt.verbose.writeln( 'Writting reveal config data and slides content in: ' + presentationPath + '/' + pages[ i ].filename );
      assemble.options.collections.pages.items[ 0 ].pages[ pageIndex ].data = _.extend( assemble.options.collections.pages.items[ 0 ].pages[ pageIndex ].data, {
        'slides': slides
      }, config );
    }

    grunt.log.ok();
  }
  // Continue.
  callback();
};

// Hook into render:post:pages.
module.exports.options = {
  stage: 'assemble:post:pages'
};
