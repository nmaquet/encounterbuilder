module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['ng-scenario'],
        files: [
            'app/lib/angular/angular.js',
            'app/lib/angular/angular-*.js',
            'app/js/*.js',
            'test/e2e/*.js'
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
        port: 9877,
        colors: true,
        logLevel: config.LOG_INFO,
        captureTimeout: 60000,
        plugins: [
            'karma-chrome-launcher',
            'karma-ng-scenario',
            'karma-coverage'
        ],
        urlRoot: "/karma",
        proxies: {
            '/': 'http://localhost:3000/'
        }
    });
};
