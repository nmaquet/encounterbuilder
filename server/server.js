"use strict";

require('../scripts/concat_and_uglify');

var FIND_LIMIT = 50;

var fs = require('fs');
var express = require('express');
var app = express();
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
    var collections = require('./collections')(db);
    app.configure(function () {
        //app.use(express.compress());
        app.use("/css", express.static(__dirname + '/../client/public/css'));
        app.use("/img", express.static(__dirname + '/../client/public/img'));
        app.use("/js", express.static(__dirname + '/../client/public/js'));
        app.use("/", express.static(__dirname + '/../website/'));
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({secret: process.env['SESSION_SECRET']}));
    });

    var authentication = require('./authentication')();
    var diceService = require('./diceService')();
    var knapsackService = require('./knapsackService')();
    var lootService = require('./loot/lootService')(diceService, knapsackService);

    var searchMonstersRoute = require('./searchMonstersRoute')(collections.monsters, FIND_LIMIT);
    var searchMagicItemsRoute = require('./searchMagicItemsRoute')(collections.magicitems, FIND_LIMIT);
    var monsterRoute = require('./monsterRoute')(collections.monsters);
    var magicItemRoute = require('./magicItemRoute')(collections.magicitems);
    var loginRoute = require('./loginRoute')(collections.users, authentication.authenticate);
    var logoutRoute = require('./logoutRoute')();
    var userDataRoute = require('./userDataRoute')(collections.encounters);
    var clientRoutes = require('./clientRoutes')();
    var encounterRoute = require('./encounterRoutes')(collections.encounters, ObjectID, lootService);

    app.get('/api/search-monsters', authentication.check, searchMonstersRoute);
    app.get('/api/search-magic-items', authentication.check, searchMagicItemsRoute);
    app.get('/api/monster/:id', authentication.check, monsterRoute);
    app.get('/api/magic-item/:id', authentication.check, magicItemRoute);
    app.get('/api/user-data', userDataRoute);
    app.get('/logout', logoutRoute);
    app.post("/login", loginRoute);
    app.post("/api/upsert-encounter", authentication.check, encounterRoute.upsert);
    app.post("/api/remove-encounter", authentication.check, encounterRoute.delete);
    app.post("/api/generate-encounter-loot", authentication.check, encounterRoute.generateLoot);

    app.get('/feedback-popover.html', authentication.check, clientRoutes.feedbackPopover);
    app.get('/login.html', clientRoutes.login);
    app.get('/encounter-builder.html', authentication.check, clientRoutes.encounterBuilder);
    app.get('/printable-encounter.html', authentication.check, clientRoutes.printableEncounter);
    app.get('/app', clientRoutes.app);
    app.get('/blog', clientRoutes.blog);
    app.get('/', clientRoutes.default);

    var port = process.env.PORT || 3000;

    app.listen(port);

    console.log("Encounter Builder Server listening on port " + port);

    fs.writeFileSync("server.pid", process.pid);

    process.on('SIGINT', function () {
        console.log('Exiting...');
        process.exit(0);
    });
}