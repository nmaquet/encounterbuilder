var FILE_ENCODING = 'utf-8';
var EOL = '\n';

var fs = require('fs');
var uglify_js = require("uglify-js");


var jsFiles = [
    // Dependencies
    "client/private/bower_components/angular/angular.js",
    "client/private/bower_components/angular-route/angular-route.js",
    "client/private/bower_components/angular-resource/angular-resource.js",
    "client/private/bower_components/jquery/jquery.js",
    "client/private/bower_components/jquery-ui/ui/jquery-ui.js",
    "client/private/bower_components/jquery-cookie/jquery.cookie.js",
    "client/private/bower_components/bootstrap/dist/js/bootstrap.js",
    "client/private/bower_components/async/lib/async.js",
    "client/private/bower_components/nouislider/jquery.nouislider.js",
    "client/private/angular-ui/ui-bootstrap-0.10.0.js",
    "client/private/angular-ui/ui-bootstrap-tpls-0.10.0.js",
    // App files
    "client/private/js/app.js", /* app.js MUST be the first app file ! */
    "client/private/js/extra/clone.js",
    "client/private/js/extra/idify.js",
    "client/private/js/controllers/encounter-controller.js",
    "client/private/js/controllers/search-monster-controller.js",
    "client/private/js/controllers/search-npc-controller.js",
    "client/private/js/controllers/encounter-list-controller.js",
    "client/private/js/controllers/logout-controller.js",
    "client/private/js/controllers/monster-detail-controller.js",
    "client/private/js/controllers/npc-detail-controller.js",
    "client/private/js/controllers/feedback-controller.js",
    "client/private/js/controllers/tab-controller.js",
    "client/private/js/controllers/search-item-controller.js",
    "client/private/js/controllers/item-details-controller.js",
    "client/private/js/controllers/printable-encounter-controller.js",
    "client/private/js/controllers/password-controller.js",
    "client/private/js/directives/click-to-edit.js",
    "client/private/js/directives/confirm-click.js",
    "client/private/js/directives/head.js",
    "client/private/js/directives/equals.js",
    "client/private/js/filters/abbreviate-monster-source.js",
    "client/private/js/filters/number-to-fraction-string.js",
    "client/private/js/services/monster-service.js",
    "client/private/js/services/npc-service.js",
    "client/private/js/services/selected-encounter-service.js",
    "client/private/js/services/selected-monster-service.js",
    "client/private/js/services/selected-item-service.js",
    "client/private/js/services/selected-npc-service.js",
    "client/private/js/services/encounter-service.js",
    "client/private/js/services/item-service.js",
    "client/private/js/services/cr-service.js",
    "client/private/js/services/loot-service.js",
    "client/private/js/services/http-interceptor-service.js",
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
    if (!process.env['DO_NOT_UGLIFY']) {
        var ast = uglify_js.parse(contents);
        var compressor = uglify_js.Compressor();
        ast.figure_out_scope();
        ast = ast.transform(compressor);
        ast.figure_out_scope();
        ast.compute_char_frequency();
        ast.mangle_names();
        fs.writeFileSync(distPath, ast.print_to_string(), FILE_ENCODING);
    } else {
        fs.writeFileSync(distPath, contents, FILE_ENCODING);
    }
    console.log(' ' + distPath + ' built.');
}

var tempfile = "scripts/temp";

concat(jsFiles, tempfile);
uglify(tempfile, 'client/public/js/encounterbuilder.min.js');

fs.unlinkSync(tempfile);

console.log("done");