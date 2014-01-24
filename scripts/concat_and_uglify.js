var FILE_ENCODING = 'utf-8';
var EOL = '\n';

var fs = require('fs');
var uglify_js = require("uglify-js");

var cssFiles = [
    // Dependencies
    "client/private/bower_components/bootstrap.css/css/bootstrap.css",
    "client/private/bower_components/jquery-ui/themes/base/jquery-ui.css",
    // App files
    "client/private/css/app.css"
];

var jsFiles = [
    // Dependencies
    "client/private/bower_components/angular/angular.js",
    "client/private/bower_components/angular-route/angular-route.js",
    "client/private/bower_components/angular-cookies/angular-cookies.js",
    "client/private/bower_components/angular-resource/angular-resource.js",
    "client/private/bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js",
    "client/private/bower_components/jquery/jquery.js",
    "client/private/bower_components/jquery-ui/ui/jquery-ui.js",
    "client/private/bower_components/jquery-cookie/jquery.cookie.js",
    "client/private/bower_components/bootstrap.css/js/bootstrap.js",
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
    var contents = fs.readFileSync(srcPath, FILE_ENCODING);
    var ast = uglify_js.parse(contents);
    var compressor = uglify_js.Compressor();
    ast.figure_out_scope();
    ast = ast.transform(compressor);
    ast.figure_out_scope();
    ast.compute_char_frequency();
    ast.mangle_names();
    fs.writeFileSync(distPath, /*ast.print_to_string()*/contents, FILE_ENCODING);
    console.log(' ' + distPath + ' built.');
}

var tempfile = "scripts/temp";

concat(jsFiles, tempfile);
uglify(tempfile, 'client/public/js/encounterbuilder.min.js');
concat(cssFiles, 'client/public/css/encounterbuilder.min.css');

fs.unlinkSync(tempfile);

console.log("done");