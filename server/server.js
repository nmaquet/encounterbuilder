"use strict";

require('../scripts/concat_and_uglify');

var fs = require('fs');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

var FIND_LIMIT = 50;

mongoose.connect(process.env['MONGODB_URL']);

app.configure(function () {
    //app.use(express.compress());
    app.use("/css", express.static(__dirname + '/../client/public/css'));
    app.use("/img", express.static(__dirname + '/../client/public/img'));
    app.use("/js", express.static(__dirname + '/../client/public/js'));
    app.use("/partials", express.static(__dirname + '/../client/public/partials'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({secret: "THECATZHAZITZ" /* FIXME: use process.env */}));
});

var Monster = require('./monsterModel')(mongoose).Monster;
var User = require('./userModel')(mongoose).User;

var authentication = require('./authentication')();

var searchMonstersRoute = require('./searchMonstersRoute')(Monster, FIND_LIMIT);
var monsterRoute = require('./monsterRoute')(Monster);
var monstersResetRoute = require('./monstersResetRoute')(Monster, fs);
var loginRoute = require('./loginRoute')(User, authentication.authenticate);
var connectedUserRoute = require('./connectedUserRoute')();
var defaultRoute = require('./defaultRoute')();

app.get('/api/search-monsters', authentication.check, searchMonstersRoute);
app.get('/api/monster/:id', authentication.check, monsterRoute);
app.get('/api/monsters-reset', authentication.check, monstersResetRoute);
app.get('/api/connected-user', connectedUserRoute);
app.get('*', defaultRoute);

app.post("/login", loginRoute);

var port = process.env.PORT || 3000;

app.listen(port);

console.log("Encounter Builder Server listening on port " + port);

fs.writeFileSync("server.pid", process.pid);

process.on('SIGINT', function () {
    console.log('Exiting...');
    process.exit(0);
});
