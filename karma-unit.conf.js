module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'app/lib/angular/angular.js',
            'app/lib/angular/angular-*.js',
            'app/js/*.js',
            'test/unit/*.js'
        ],
        exclude: [
            'app/lib/angular/angular-loader.js',
            'app/lib/angular/*.min.js',
            'app/lib/angular/angular-scenario.js'
        ],
        preprocessors: {
            'app/js/*.js': ['coverage']
        },
        autoWatch: false,
        browsers: ['Chrome'], // Firefox, ChromeCanary, Opera, IE
        reporters: ['progress', 'coverage'],
        singleRun: false,
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        captureTimeout: 60000,
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-coverage'
        ],
        urlRoot: "/karma"
    });
};
