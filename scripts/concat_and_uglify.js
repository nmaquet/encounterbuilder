var FILE_ENCODING = 'utf-8';
var EOL = '\n';

var fs = require('fs');
var uglify_js = require("uglify-js");

var cssFiles = [
    // Dependencies
    "client/private/bower_components/bootstrap.css/css/bootstrap.css",
    // App files
    "client/private/css/app.css"
];

var jsFiles = [
    // Dependencies
    "client/private/bower_components/angular/angular.js",
    "client/private/bower_components/angular-route/angular-route.js",
    "client/private/bower_components/angular-resource/angular-resource.js",
    // App files
    "client/private/js/app.js",
    "client/private/js/controllers.js",
    "client/private/js/directives.js",
    "client/private/js/filters.js",
    "client/private/js/services.js"
];

function concat(fileList, distPath) {
    var out = fileList.map(function (filePath) {
        return fs.readFileSync(filePath, FILE_ENCODING);
    });
    fs.writeFileSync(distPath, out.join(EOL), FILE_ENCODING);
    console.log(' ' + distPath + ' built.');
}

function uglify(srcPath, distPath) {
    var ast = uglify_js.parse(fs.readFileSync(srcPath, FILE_ENCODING));
    var compressor = uglify_js.Compressor();
    ast.figure_out_scope();
    ast = ast.transform(compressor);
    ast.figure_out_scope();
    ast.compute_char_frequency();
    ast.mangle_names();
    fs.writeFileSync(distPath, ast.print_to_string(), FILE_ENCODING);
    console.log(' ' + distPath + ' built.');
}

var tempfile = "scripts/temp.js";

concat(jsFiles, tempfile);
uglify(tempfile, 'client/public/js/encounterbuilder.min.js');
concat(cssFiles, 'client/public/css/encounterbuilder.min.css');

fs.unlinkSync(tempfile);

console.log("done");