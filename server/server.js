// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

require('../scripts/concat_and_uglify');

var FIND_LIMIT = 50;

var fs = require('fs');
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var MongoStore = require('connect-mongo')(express);
var ObjectID = require('mongodb').ObjectID;
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

if (process.env['USE_TEST_DB']) {
    var MONGODB_URL = process.env['MONGODB_TEST_URL'];
}
else {
    var MONGODB_URL = process.env['MONGODB_URL'];
}

var MONGO_CONNECT_OPTIONS = {
    server: {
        auto_reconnect: true
    },
    db: {
        numberOfRetries: 60 * 60 * 24, retryMiliSeconds: 1000
    }
};

MongoClient.connect(MONGODB_URL, MONGO_CONNECT_OPTIONS, function (error, db) {
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
        if (process.env['DO_NOT_UGLIFY']) {
            app.use("/client", express.static(__dirname + '/../client'));
        }
        app.use("/css", express.static(__dirname + '/../client/public/css'));
        app.use("/img", express.static(__dirname + '/../client/public/img'));
        app.use("/js", express.static(__dirname + '/../client/public/js'));
        app.use("//skins/lightgray", express.static(__dirname + '/../client/public/skins/lightgray'));
        app.use("//skins/lightgray/fonts", express.static(__dirname + '/../client/public/skins/lightgray/fonts'));
        app.use("/skins/lightgray", express.static(__dirname + '/../client/public/skins/lightgray'));
        app.use("/skins/lightgray/fonts", express.static(__dirname + '/../client/public/skins/lightgray/fonts'));
        app.use("/", express.static(__dirname + '/../website/'));
        app.use(express.logger('dev'));
        app.use('/api', expressJwt({secret: process.env['SESSION_SECRET']}));
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
    });

    function disableCaching(request, response, next) {
        response.setHeader("Cache-control", "no-cache, no-store, max-age=0");
        response.setHeader("Expires", "Sat, 1 Jan 2000 00:00:00 GMT");
        next();
    }

    function enableCaching(request, response, next) {
        var minutes = 10;
        var seconds = minutes * 60;
        response.setHeader("Cache-Control", "public, max-age=" + seconds);
        response.setHeader("Expires", new Date(Date.now() + (seconds * 1000)).toUTCString());
        next();
    }

    function enableCORS(request, response, next) {
        var HOST_TO_ALLOWED_ORIGIN = {
            "192.168.0.5:3000": "http://168.168.0.5:3000",
            "localhost:3000": "http://localhost:3000",
            "localhost.encounterbuilder.com": "http://localhost.encounterbuilder.com",
            "encounterbuilder-staging.herokuapp.com": "http://staging.chronicleforge.com",
            "encounterbuilder-live.herokuapp.com": "http://www.chronicleforge.com"
        };
        response.setHeader('Access-Control-Allow-Origin', HOST_TO_ALLOWED_ORIGIN[request.headers.host]);
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    }

    app.options('*', enableCORS, function (request, response) {
        response.send(200);
    });

    var metrics = require('./usageMetrics')(collections.metrics);
    var diceService = require('./diceService')();
    var knapsackService = require('./knapsackService')();
    var lootService = require('./loot/lootService')(diceService, knapsackService);
    var sesService = require('./sesService')();
    var userService = require('./userService')(db, sesService);

    var searchMonstersRoute = require('./searchMonstersRoute')(collections.monsters, collections.userMonsters, FIND_LIMIT);
    var searchNpcsRoute = require('./searchNpcsRoute')(collections.npcs, collections.userNpcs, FIND_LIMIT);
    var searchMagicItemsRoute = require('./searchMagicItemsRoute')(collections.magicitems, FIND_LIMIT);
    var searchSpellsRoute = require('./searchSpellsRoute')(collections.spells, FIND_LIMIT);
    var searchFeatsRoute = require('./searchFeatsRoute')(collections.feats, FIND_LIMIT);
    var monsterRoute = require('./monsterRoute')(collections.monsters);
    var userNpcRoute = require('./userResourceRoute')(collections.userNpcs, collections.npcs, ObjectID);
    var userTextRoute = require('./userResourceRoute')(collections.userTexts, collections.userTexts, ObjectID);
    var magicItemRoute = require('./magicItemRoute')(collections.magicitems);
    var npcRoute = require('./npcRoute')(collections.npcs);
    var spellRoute = require('./spellRoute')(collections.spells);
    var featRoute = require('./featRoute')(collections.feats);
    var loginRoute = require('./loginRoute')(jwt, userService);
    var changePasswordRoute = require('./changePasswordRoute')(userService);
    var changeUserDataRoute = require('./changeUserDataRoute')(userService);
    var registerRoute = require('./registerRoute')(userService);
    var validateEmailRoute = require('./validateEmailRoute')(userService);
    var userDataRoute = require('./userDataRoute')(collections.contentTrees, userService);
    var encounterRoute = require('./userResourceRoute')(collections.encounters, null, ObjectID);
    var generateLootRoute = require('./generateLootRoute')(lootService);
    var contentTreeRoute = require('./contentTreeRoute')(collections.contentTrees);
    var favouritesRoute = require('./favouritesRoute')(collections.favourites);
    var userFeatRoute = require('./userResourceRoute')(collections.userFeats, collections.feats, ObjectID);
    var userSpellRoute = require('./userResourceRoute')(collections.userSpells, collections.spells, ObjectID);
    var userItemRoute = require('./userResourceRoute')(collections.userItems, collections.magicitems, ObjectID);
    var userIllustrationRoute = require('./userImageResourceRoute')(collections.userIllustrations, ObjectID);
    var userMonsterRoute = require('./userResourceRoute')(collections.userMonsters, collections.monsters, ObjectID);
    var userMapRoute = require('./userImageResourceRoute')(collections.userMaps, ObjectID);
    var chronicleRoute = require('./chronicleRoute')(collections, ObjectID);

    app.get('/api/search-monsters', metrics.logSearchMonster, searchMonstersRoute);
    app.get('/api/search-npcs', metrics.logSearchNpc, searchNpcsRoute);
    app.get('/api/search-spells', metrics.logSearchSpell, searchSpellsRoute);
    app.get('/api/search-feats', metrics.logSearchFeat, searchFeatsRoute);
    app.get('/api/search-magic-items', metrics.logSearchItem, searchMagicItemsRoute);
    app.get('/api/monster/:id', enableCaching, metrics.logSelectMonster, monsterRoute);
    app.get('/api/magic-item/:id', enableCaching, metrics.logSelectItem, magicItemRoute);
    app.get('/api/npc/:id', enableCaching, metrics.logSelectNpc, npcRoute);
    app.get('/api/spell/:id', enableCaching, metrics.logSelectSpell, spellRoute);
    app.get('/api/feat/:id', enableCaching, metrics.logSelectFeat, featRoute);
    app.get("/api/favourites", disableCaching, favouritesRoute.fetch);

    app.post('/api/user-data', userDataRoute);
    /* FIXME: should be a GET with no caching ! */
    app.post("/login", metrics.logLogin, enableCORS, loginRoute.post);
    app.post("/register", /* TODO METRICS */ enableCORS, registerRoute);
    app.get("/validate-email", disableCaching, /* TODO METRICS */ validateEmailRoute);
    app.post("/api/generate-encounter-loot", metrics.logGenerateEncounterLoot, generateLootRoute.generateLoot);
    app.post("/api/change-password", enableCORS, changePasswordRoute);
    app.post("/api/change-user-data", enableCORS, changeUserDataRoute);
    app.post("/api/save-content-tree", contentTreeRoute.updateContentTree);
    app.post("/api/save-favourites", favouritesRoute.update);


    /* User Text */
    app.get("/api/user-text/:id", enableCaching, userTextRoute.getResource);
    app.post("/api/user-text", userTextRoute.createResource);
    app.post("/api/user-text/:id", userTextRoute.updateResource);
    app.delete("/api/user-text/:id", userTextRoute.deleteResource);

    /* User Monster */
    app.get("/api/user-monster/:id", enableCaching, userMonsterRoute.getResource);
    app.post("/api/user-monster", userMonsterRoute.createResource);
    app.post("/api/user-monster/:id", userMonsterRoute.updateResource);
    app.delete("/api/user-monster/:id", userMonsterRoute.deleteResource);

    /* User Npc */
    app.get("/api/user-npc/:id", enableCaching, userNpcRoute.getResource);
    app.post("/api/user-npc", userNpcRoute.createResource);
    app.post("/api/user-npc/:id", userNpcRoute.updateResource);
    app.delete("/api/user-npc/:id", userNpcRoute.deleteResource);

    /* User Item */
    app.get("/api/user-feat/:id", enableCaching, userFeatRoute.getResource);
    app.post("/api/user-feat", userFeatRoute.createResource);
    app.post("/api/user-feat/:id", userFeatRoute.updateResource);
    app.delete("/api/user-feat/:id", userFeatRoute.deleteResource);

    /* User Spell */
    app.get("/api/user-spell/:id", enableCaching, userSpellRoute.getResource);
    app.post("/api/user-spell", userSpellRoute.createResource);
    app.post("/api/user-spell/:id", userSpellRoute.updateResource);
    app.delete("/api/user-spell/:id", userSpellRoute.deleteResource);

    /* User Item */
    app.get("/api/user-item/:id", enableCaching, userItemRoute.getResource);
    app.post("/api/user-item", userItemRoute.createResource);
    app.post("/api/user-item/:id", userItemRoute.updateResource);
    app.delete("/api/user-item/:id", userItemRoute.deleteResource);

    /* User illustration */
    app.get("/api/user-illustration/:id", enableCaching, userIllustrationRoute.getResource);
    app.post("/api/user-illustration", userIllustrationRoute.createResource);
    app.post("/api/user-illustration/:id", userIllustrationRoute.updateResource);
    app.delete("/api/user-illustration/:id", userIllustrationRoute.deleteResource);

    /* User map */
    app.get("/api/user-map/:id", enableCaching, userMapRoute.getResource);
    app.post("/api/user-map", userMapRoute.createResource);
    app.post("/api/user-map/:id", userMapRoute.updateResource);
    app.delete("/api/user-map/:id", userMapRoute.deleteResource);

    /*Chronicles*/
    app.get("/api/chronicle", disableCaching, chronicleRoute.query);
    app.get("/api/chronicle/:id", enableCaching, chronicleRoute.getResource);
    app.post("/api/chronicle/:id", chronicleRoute.updateResource);
    app.post("/api/chronicle", chronicleRoute.createResource);
    app.delete("/api/chronicle/:id", chronicleRoute.deleteResource);
    app.get("/api/chronicle-full/:id", disableCaching, chronicleRoute.exportResource);

    /*Encounters*/
    app.get("/api/encounter", disableCaching, encounterRoute.query);
    app.get("/api/encounter/:id", enableCaching, encounterRoute.getResource);
    app.post("/api/encounter/:id", encounterRoute.updateResource);
    app.post("/api/encounter", encounterRoute.createResource);
    app.delete("/api/encounter/:id", encounterRoute.deleteResource);

    var APP_JADE_FILES = [
        'feedback-popover',
        'login',
        'home',
        'tutorial',
        'binder',
        'encounter',
        'monster',
        'user-monster',
        'edit-user-monster',
        'user-npc',
        'edit-user-npc',
        'user-text',
        'edit-user-text',
        'user-feat',
        'edit-user-feat',
        'user-item',
        'edit-user-item',
        'user-spell',
        'edit-user-spell',
        'npc',
        'item',
        'spell',
        'feat',
        'printable-encounter',
        'user-image-resource',
        'edit-user-image-resource',
        'chronicle',
        'chronicle-full',
        'chronicles'
    ];

    for (var i in APP_JADE_FILES) {
        (function (appJadeFile) {
            app.get('/' + appJadeFile + '.html', function (request, response) {
                response.render('../client/private/jade/' + appJadeFile + '.jade');
            });
        })(APP_JADE_FILES[i]);
    }

    app.get('/app', function (request, response) {
        response.render('../client/private/jade/app.jade');
    });

    app.get('/blog', function (request, response) {
        response.render('../website/blog.jade');
    });

    app.get('/', function (request, response) {
        response.render('../website/index.jade');
    });

    app.get('/terms-of-service', function (request, response) {
        response.render('../website/terms-of-service.jade');
    });

    var port = process.env.PORT || 3000;

    app.listen(port);

    console.log("Chronicle Forge Server listening on port " + port);

    fs.writeFileSync("server.pid", process.pid);

    process.on('SIGINT', function () {
        console.log('Exiting...');
        process.exit(0);
    });
}