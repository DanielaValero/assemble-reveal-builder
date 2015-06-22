// Imports.
var fs = require( 'fs' );

// Test suite.
describe( 'assemble-reveal-builder', function() {
  // Set-up.
  before( function() {
    this.pages = fs.readFileSync( __dirname + '/actual/master.html', {
      encoding: 'utf-8'
    } );
  } );

  // Cleanup.
  after( function() {
    delete this.pages;
  } );

  it( 'Should add reveal object to the page data', function() {
    if ( -1 === this.pages.indexOf( 'multiplex url: http://localhost:1947' ) ) {
      throw new Error( 'The reveal object was not added to the page data' );
    }
  } );

  it( 'Should add the slides object to the page data', function() {
    if ( -1 === this.pages.indexOf( 'Some title' ) ) {
      throw new Error( 'The slides object was not added to the page data' );
    }
  } );
} );
