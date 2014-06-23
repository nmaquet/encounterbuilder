"use strict";

require('../scripts/concat_and_uglify');

var FIND_LIMIT = 50;

var fs = require('fs');
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var MongoStore = require('connect-mongo')(express);
var ObjectID = require('mongodb').ObjectID;

if (process.env['USE_TEST_DB']) {
    var MONGODB_URL = process.env['MONGODB_TEST_URL'];
}
else {
    var MONGODB_URL = process.env['MONGODB_URL'];
    var SESSION_STORE = new MongoStore({
        url: process.env['SESSION_MONGODB_URL']
    });
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
        if (process.env['DO_NOT_UGLIFY']) {
            app.use("/client", express.static(__dirname + '/../client'));
        }
        app.use("/css", express.static(__dirname + '/../client/public/css'));
        app.use("/img", express.static(__dirname + '/../client/public/img'));
        app.use("/js", express.static(__dirname + '/../client/public/js'));
        app.use("/", express.static(__dirname + '/../website/'));
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({
            store: SESSION_STORE,
            secret: process.env['SESSION_SECRET']
        }));
    });

    var authentication = require('./authentication')();
    var metrics = require('./usageMetrics')(collections.metrics);
    var diceService = require('./diceService')();
    var knapsackService = require('./knapsackService')();
    var lootService = require('./loot/lootService')(diceService, knapsackService);

    var searchMonstersRoute = require('./searchMonstersRoute')(collections.monsters,collections.userMonsters, FIND_LIMIT);
    var searchNpcsRoute = require('./searchNpcsRoute')(collections.npcs, FIND_LIMIT);
    var searchMagicItemsRoute = require('./searchMagicItemsRoute')(collections.magicitems, FIND_LIMIT);
    var searchSpellsRoute = require('./searchSpellsRoute')(collections.spells, FIND_LIMIT);
    var searchFeatsRoute = require('./searchFeatsRoute')(collections.feats, FIND_LIMIT);
    var monsterRoute = require('./monsterRoute')(collections.monsters);
    var userMonsterRoute = require('./userMonsterRoute')(collections.userMonsters, collections.monsters, ObjectID);
    var userNpcRoute = require('./userNpcRoute')(collections.userNpcs, collections.npcs, ObjectID);
    var magicItemRoute = require('./magicItemRoute')(collections.magicitems);
    var npcRoute = require('./npcRoute')(collections.npcs);
    var spellRoute = require('./spellRoute')(collections.spells);
    var featRoute = require('./featRoute')(collections.feats);
    var loginRoute = require('./loginRoute')(collections.users, authentication.authenticate);
    var changePasswordRoute = require('./changePasswordRoute')(collections.users, authentication);
    var changeUserDataRoute = require('./changeUserDataRoute')(collections.users, collections.encounters, authentication);
    var logoutRoute = require('./logoutRoute')();
    var userDataRoute = require('./userDataRoute')(collections.contentTrees, collections.users);
    var encounterRoute = require('./encounterRoutes')(collections.encounters, ObjectID, lootService);
    var contentTreeRoute = require('./contentTreeRoute')(collections.contentTrees);
    var favouritesRoute = require('./favouritesRoute')(collections.favourites);

    app.get('/api/search-monsters', authentication.check, metrics.logSearchMonster, searchMonstersRoute);
    app.get('/api/search-npcs', authentication.check, metrics.logSearchNpc, searchNpcsRoute);
    app.get('/api/search-spells', authentication.check, metrics.logSearchSpell, searchSpellsRoute);
    app.get('/api/search-feats', authentication.check, metrics.logSearchFeat, searchFeatsRoute);
    app.get('/api/search-magic-items', authentication.check, metrics.logSearchItem, searchMagicItemsRoute);
    app.get('/api/monster/:id', authentication.check, metrics.logSelectMonster, monsterRoute);
    app.get('/api/magic-item/:id', authentication.check, metrics.logSelectItem, magicItemRoute);
    app.get('/api/npc/:id', authentication.check, metrics.logSelectNpc, npcRoute);
    app.get('/api/spell/:id', authentication.check, metrics.logSelectSpell, spellRoute);
    app.get('/api/feat/:id', authentication.check, metrics.logSelectFeat, featRoute);
    app.get('/api/encounter/:id', authentication.check, metrics.logSelectEncounter, encounterRoute.findOne);
    app.get('/api/user-monster/:id', authentication.check, /* TODO METRICS */ userMonsterRoute.findOne);
    app.get('/api/user-npc/:id', authentication.check, /* TODO METRICS */ userNpcRoute.findOne);
    app.get("/api/favourites", authentication.check, favouritesRoute.fetch);

    app.post('/api/user-data', userDataRoute);
    app.post('/logout', metrics.logLogout, logoutRoute);
    app.post("/login", metrics.logLogin, loginRoute);
    app.post("/api/update-encounter", authentication.check, metrics.logUpdateEncounter, encounterRoute.update);
    app.post("/api/create-encounter", authentication.check, metrics.logCreateEncounter, encounterRoute.create);
    app.post("/api/remove-encounter", authentication.check, metrics.logRemoveEncounter, encounterRoute.delete);
    app.post("/api/generate-encounter-loot", authentication.check, metrics.logGenerateEncounterLoot, encounterRoute.generateLoot);
    app.post("/api/change-password", authentication.check, changePasswordRoute);
    app.post("/api/change-user-data", authentication.check, changeUserDataRoute);
    app.post("/api/save-content-tree", authentication.check, contentTreeRoute.updateContentTree);
    app.post("/api/save-favourites", authentication.check, favouritesRoute.update);

    app.post("/api/create-user-monster", authentication.check, /* TODO METRICS */ userMonsterRoute.create);
    app.post("/api/copy-monster", authentication.check, /* TODO METRICS */ userMonsterRoute.copy);
    app.post("/api/update-user-monster", authentication.check, /* TODO METRICS */ userMonsterRoute.update);
    app.post("/api/delete-user-monster", authentication.check, /* TODO METRICS */ userMonsterRoute.delete);

    app.post("/api/create-user-npc", authentication.check, /* TODO METRICS */ userNpcRoute.create);
    app.post("/api/copy-npc", authentication.check, /* TODO METRICS */ userNpcRoute.copy);
    app.post("/api/update-user-npc", authentication.check, /* TODO METRICS */ userNpcRoute.update);
    app.post("/api/delete-user-npc", authentication.check, /* TODO METRICS */ userNpcRoute.delete);

    var APP_JADE_FILES = [
        'feedback-popover',
        'login',
        'home',
        'binder',
        'encounter',
        'monster',
        'user-monster',
        'edit-user-monster',
        'user-npc',
        'edit-user-npc',
        'npc',
        'item',
        'spell',
        'feat',
        'printable-encounter'
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

    var port = process.env.PORT || 3000;

    app.listen(port);

    console.log("Encounter Builder Server listening on port " + port);

    fs.writeFileSync("server.pid", process.pid);

    process.on('SIGINT', function () {
        console.log('Exiting...');
        process.exit(0);
    });
}