"use strict";

require('../scripts/concat_and_uglify');

var FIND_LIMIT = 50;

var fs = require('fs');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

if (process.env.USE_TEST_DB) {
    var MONGODB_URL = process.env['MONGODB_TEST_URL'];
}
else {
    var MONGODB_URL = process.env['MONGODB_URL'];
}

MongoClient.connect(MONGODB_URL, function (error, db) {
    if (error) {
        console.log(error);
    } else {
        main(db);
    }
});

function main(db) {

    mongoose.connect(MONGODB_URL);

    app.configure(function () {
        //app.use(express.compress());
        app.use("/css", express.static(__dirname + '/../client/public/css'));
        app.use("/img", express.static(__dirname + '/../client/public/img'));
        app.use("/js", express.static(__dirname + '/../client/public/js'));
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({secret: "THECATZHAZITZ" /* FIXME: use process.env */}));
    });

    var User = require('./userModel')(mongoose).User;

    var authentication = require('./authentication')();

    var searchMonstersRoute = require('./searchMonstersRoute')(db, FIND_LIMIT);
    var searchMagicItemsRoute = require('./searchMagicItemsRoute')(db, FIND_LIMIT);
    var monsterRoute = require('./monsterRoute')(db);
    var magicItemRoute = require('./magicItemRoute')(db);
    var loginRoute = require('./loginRoute')(User, authentication.authenticate);
    var logoutRoute = require('./logoutRoute')();
    var userDataRoute = require('./userDataRoute')(db);
    var clientRoutes = require('./clientRoutes')();
    var encounterRoute = require('./encounterRoutes')(db, ObjectID);

    app.get('/api/search-monsters', authentication.check, searchMonstersRoute);
    app.get('/api/search-magic-items', authentication.check, searchMagicItemsRoute);
    app.get('/api/monster/:id', authentication.check, monsterRoute);
    app.get('/api/magic-item/:id', authentication.check, magicItemRoute);
    app.get('/api/user-data', userDataRoute);
    app.get('/logout', logoutRoute);
    app.post("/login", loginRoute);
    app.post("/api/upsert-encounter", authentication.check, encounterRoute.upsert);
    app.post("/api/remove-encounter", authentication.check, encounterRoute.delete);

    app.get('/feedback-popover.html', clientRoutes.feedbackPopover);
    app.get('/login.html', clientRoutes.login);
    app.get('/encounter-builder.html', clientRoutes.encounterBuilder);
    app.get('*', clientRoutes.default);

    var port = process.env.PORT || 3000;

    app.listen(port);

    console.log("Encounter Builder Server listening on port " + port);

    fs.writeFileSync("server.pid", process.pid);

    process.on('SIGINT', function () {
        console.log('Exiting...');
        process.exit(0);
    });
}