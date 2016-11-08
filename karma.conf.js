// Karma configuration
// Generated on Wed Aug 06 2014 12:20:01 GMT+0300 (IDT)

module.exports = function (config) {
  'use strict';
  config.set({

  // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


  // list of files / patterns to load in the browser
  // ADDED: test & src files path
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'spec/javascripts/support/spec_helper.js',
      'app/assets/javascripts/*.js',
      'app/assets/javascripts/*/*.js',
      'spec/javascripts/*_spec.js',
      'spec/javascripts/*/*_spec.js',
    ],


    // list of files to exclude
    exclude: [
      'app/assets/javascripts/directives/*.js',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // ADDED: path for covered files (i.e. tested files)
    preprocessors: {
      'app/assets/javascripts/*.js': ['coverage'],
      'app/assets/javascripts/*/*.js': ['coverage']
    },

    // optionally, configure the reporter
    // ADDED: covearge summary type and location
    coverageReporter: {
      reporters: [
        {type: 'html', dir: 'coverage/karma/'},
        {type: 'text-summary'}
      ],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
