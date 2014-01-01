module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'app/lib/angular/angular.js',
            'app/lib/angular/angular-*.js',
            'app/js/*.js',
            'test/**/*.js'
        ],
        exclude: [
            'app/lib/angular/angular-loader.js',
            'app/lib/angular/*.min.js',
            'app/lib/angular/angular-scenario.js'
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'], // Firefox, ChromeCanary, Opera, IE
        captureTimeout: 60000,
        singleRun: false
    });
};
