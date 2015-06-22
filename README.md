# assemble-reveal-builder [![NPM version](https://badge.fury.io/js/assemble-reveal-builder.png)](http://badge.fury.io/js/assemble-reveal-builder)
> Assemble.io plugin to add in the page.data object parsed data loaded froma config.yml file coming with reveal configuration options, and load the parsed html of separate slides markdown files, without generating a page for each slide.

## Getting Started
In the command line, run:

```bash
npm install assemble-reveal-builder --save
```

To register the plugin with Assemble, adjust your project’s Gruntfile.

```js
module.exports = function(grunt) {
  // Configuration.
  grunt.initConfig({
    assemble: {
      options: {
        plugins : [ 'assemble-reveal-builder', 'other/plugins/*.js' ]
      },
      pages: {
      options: {
        presentationPage: true
      },
      /* Add here only the index files you need for your presentation. Do not add the slides*/
        files: [ {
          cwd: 'src/',
          dest: 'dist',
          expand: true,
          filter: 'isFile',
          extDot: [ 'md', 'hbs' ],
          src: [ '**/master.hbs']
        }]
      }
    }
  });
};
```
