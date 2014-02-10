module.exports = function (config) {
    config.set({
        basePath: '../../',
        frameworks: ['ng-scenario'],
        files: [
            'client/private/bower_components/angular/angular.js',
            'client/private/bower_components/angular-resource/angular-resource.js',
            'client/private/bower_components/angular-route/angular-route.js',
            'client/private/bower_components/angular-mocks/angular-mocks.js',
            "client/private/bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js",
            "client/private/bower_components/jquery/jquery.js",
            "client/private/bower_components/jquery-ui/ui/jquery-ui.js",
            'client/private/js/**/*.js',
            'client/private/js/app.js',
            'test/e2e/Encounter.js' /*CHANGE THIS TO EXECUTE ONLY ONE TEST*/
        ],
        exclude: [
        ],
        preprocessors: {
            'app/js/*.js': ['coverage']
        },
        autoWatch: false,
        browsers: ['Chrome'], // Firefox, ChromeCanary, Opera, IE
        reporters: ['junit', 'progress'],
        junitReporter: {
            outputFile: 'e2e-test-results.xml',
            suite: ''
        },
        singleRun: false,
        port: 9877,
        colors: true,
        logLevel: config.LOG_INFO,
        captureTimeout: 60000,
        plugins: [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-ng-scenario',
            'karma-coverage',
            'karma-junit-reporter'
        ],
        urlRoot: "/karma",
        proxies: {
            '/': 'http://localhost:3000/'
        }
    });
};
