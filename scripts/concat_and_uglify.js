var FILE_ENCODING = 'utf-8';
var EOL = '\n';

var fs = require('fs');
var uglify_js = require("uglify-js");
var sass = require("node-sass");

var jsFiles = [
    // Dependencies
    "client/private/bower_components/jquery/jquery.js",
    "client/private/bower_components/jquery-ui/ui/jquery-ui.js",
    "client/private/bower_components/jquery-cookie/jquery.cookie.js",
    "client/private/bower_components/angular/angular.js",
    "client/private/bower_components/angular-route/angular-route.js",
    "client/private/bower_components/angular-resource/angular-resource.js",
    "client/private/bower_components/angular-animate/angular-animate.js",
    "client/private/bower_components/angular-touch/angular-touch.js",
    "client/private/bower_components/bootstrap/dist/js/bootstrap.js",
    "client/private/bower_components/async/lib/async.js",
    "client/private/bower_components/nouislider/jquery.nouislider.js",
    "client/private/bower_components/fancytree/dist/jquery.fancytree-all.js",
    "client/private/bower_components/tinymce/tinymce.min.js",
    "client/private/bower_components/tinymce/themes/modern/theme.min.js",
    "client/private/bower_components/tinymce/plugins/fullscreen/plugin.js",
    "client/private/bower_components/angular-ui-tinymce/src/tinymce.js",
    "client/private/angular-ui/ui-bootstrap-0.10.0.js",
    "client/private/angular-ui/ui-bootstrap-tpls-0.10.0.js",
    // App files
    "client/private/js/app.js", /* app.js MUST be the first app file ! */
    "client/private/js/services/exception-handling-service.js", /* leave this one second */
    "client/private/js/extra/utils.js",
    "client/private/js/extra/fancy-tree-touch.js",
    "client/private/js/controllers/main-controller.js",
    "client/private/js/controllers/encounter-controller.js",
    "client/private/js/controllers/search-monster-controller.js",
    "client/private/js/controllers/search-npc-controller.js",
    "client/private/js/controllers/sidebar-controller.js",
    "client/private/js/controllers/logout-controller.js",
    "client/private/js/controllers/content-controller.js",
    "client/private/js/controllers/monster-detail-controller.js",
    "client/private/js/controllers/npc-detail-controller.js",
    "client/private/js/controllers/feedback-controller.js",
    "client/private/js/controllers/left-sidebar-tab-controller.js",
    "client/private/js/controllers/tab-controller.js",
    "client/private/js/controllers/search-item-controller.js",
    "client/private/js/controllers/item-details-controller.js",
    "client/private/js/controllers/printable-encounter-controller.js",
    "client/private/js/controllers/profile-controller.js",
    "client/private/js/controllers/search-spell-controller.js",
    "client/private/js/controllers/search-feat-controller.js",
    "client/private/js/controllers/spell-details-controller.js",
    "client/private/js/controllers/feat-details-controller.js",
    "client/private/js/controllers/binder-controller.js",
    "client/private/js/controllers/user-monster-controller.js",
    "client/private/js/controllers/user-npc-controller.js",
    "client/private/js/controllers/user-text-controller.js",
    "client/private/js/controllers/loot-generator-controller.js",
    "client/private/js/directives/click-to-edit.js",
    "client/private/js/directives/confirm-click.js",
    "client/private/js/directives/head.js",
    "client/private/js/directives/equals.js",
    "client/private/js/directives/spell-list.js",
    "client/private/js/directives/linkify.js",
    "client/private/js/directives/pending.js",
    "client/private/js/directives/nouislider.js",
    "client/private/js/directives/content-tree.js",
    "client/private/js/directives/favourite-tree.js",
    "client/private/js/directives/fade-in-fade-out.js",
    "client/private/js/directives/slide-menu.js",
    "client/private/js/filters/abbreviate-source.js",
    "client/private/js/filters/number-to-fraction-string.js",
    "client/private/js/filters/classes-to-string.js",
    "client/private/js/services/content-tree-service.js",
    "client/private/js/services/monster-service.js",
    "client/private/js/services/npc-service.js",
    "client/private/js/services/spell-service.js",
    "client/private/js/services/feat-service.js",
    "client/private/js/services/encounter-editor-service.js",
    "client/private/js/services/encounter-service.js",
    "client/private/js/services/item-service.js",
    "client/private/js/services/sidebar-service.js",
    "client/private/js/services/cr-service.js",
    "client/private/js/services/loot-service.js",
    "client/private/js/services/http-interceptor-service.js",
    "client/private/js/services/viewport-service.js",
    "client/private/js/services/user-monster-service.js",
    "client/private/js/services/user-npc-service.js",
    "client/private/js/services/user-text-service.js",
    "client/private/js/services/favourite-service.js",
    "client/private/js/services/location-service.js"
];

var cssFiles = [
    "client/private/css/app.css",
    "client/private/css/animate.css",
    "client/private/bower_components/tinymce/skins/lightgray/content.min.css",
    "client/private/bower_components/tinymce/skins/lightgray/skin.min.css",
];

var sassRootFile = "client/private/scss/encounter-builder.scss";

function concat(fileList, distPath) {
    var out = fileList.map(function (filePath) {
        return fs.readFileSync(filePath, FILE_ENCODING);
    });
    fs.writeFileSync(distPath, out.join(EOL), FILE_ENCODING);
    console.log(' ' + distPath + ' built.');
}

function makeJS() {
    var relativeJsFiles = jsFiles.map(function (path) {
        return "../../../" + path;
    });
    var mangle;
    if (process.env['DO_NOT_UGLIFY']) {
        mangle = false;
    } else {
        mangle = true;
    }
    process.chdir("client/public/js/");
    var options = {
        outSourceMap: "encounterbuilder.min.js",
        compress: false, mangle: mangle,
        sourceRoot: "http://localhost:3000"
    };
    var result = uglify_js.minify(relativeJsFiles, options);
    if (fs.existsSync('encounterbuilder.min.js.map')) {
        fs.unlinkSync('encounterbuilder.min.js.map');
    }
    if (process.env['DO_NOT_UGLIFY']) {
        fs.writeFileSync('encounterbuilder.min.js.map', result.map, FILE_ENCODING);
        result.code += "\n//# sourceMappingURL=encounterbuilder.min.js.map";
    }
    fs.writeFileSync('encounterbuilder.min.js', result.code, FILE_ENCODING);
    process.chdir("../../../");
}

function makeCSS() {
    var tempfile = "scripts/temp";
    sass.renderFile({
        file: sassRootFile,
        outFile: tempfile,
        success: function () {
            cssFiles.push(tempfile);
            concat(cssFiles, "client/public/css/encounterbuilder.min.css");
            fs.unlinkSync(tempfile);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

makeJS();
makeCSS();

console.log("done");