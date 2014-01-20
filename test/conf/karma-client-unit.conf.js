module.exports = function (config) {
    config.set({
        basePath: '../../',
        frameworks: ['mocha', 'chai'],
        files: [
            'client/private/bower_components/angular/angular.js',
            'client/private/bower_components/angular-resource/angular-resource.js',
            'client/private/bower_components/angular-route/angular-route.js',
            'client/private/bower_components/angular-mocks/angular-mocks.js',
            'client/private/js/*.js',
            'test/client-unit/*.js'
        ],
        exclude: [
        ],
        preprocessors: {
            'app/js/*.js': ['coverage']
        },
        autoWatch: false,
        browsers: ['PhantomJS'], // Firefox, ChromeCanary, Opera, IE
        reporters: ['junit', 'progress'],
        junitReporter: {
            outputFile: 'client-unit-test-results.xml',
            suite: ''
        },
        singleRun: false,
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        captureTimeout: 60000,
        plugins: [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-mocha',
            'karma-chai',
            'karma-coverage',
            'karma-junit-reporter'
        ],
        urlRoot: "/karma"
    });
};
