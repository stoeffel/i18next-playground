'use strict';

module.exports = function(karma) {
  karma.set({

    frameworks: [ 'mocha', 'chai', 'browserify' ],

    files: [
      //'vendor/external.js',
      'test/**/*.spec.js'
    ],

    reporters: [ 'spec' ],

    preprocessors: {
      'test/**/*.spec.js': [ 'browserify' ]
    },

    browsers: [ 'PhantomJS' ],

    //logLevel: 'LOG_DEBUG',

    //singleRun: true,
    //autoWatch: false,
    //
    // client: {
    //   mocha: {
    //     reporter: 'spec', // change Karma's debug.html to the mocha web reporter
    //     ui: 'tdd'
    //   }
    // },

    // browserify configuration
    browserify: {
      debug: true,
      transform: [ 'babelify', 'brfs' ]
    }
  });
};
