var express = require('express');
var app = express();
var mongoose = require('mongoose');

const FIND_LIMIT = 50;

mongoose.connect('mongodb://heroku:fR98x8wJk2RN@mongo.onmodulus.net:27017/gu9gOmot');

app.configure(function () {
    app.use(express.static(__dirname + '/../client'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

var Monster = mongoose.model('Monster', {
    name: String,
    id: String,
    cr: Number
});

var searchMonstersRoute = require('./searchMonstersRoute')(Monster, FIND_LIMIT);
var monsterRoute = require('./monsterRoute')(Monster);
var monstersResetRoute = require('./monstersResetRoute')(Monster);
var defaultRoute = require('./defaultRoute')();

app.get('/api/search-monsters', searchMonstersRoute);
app.get('/api/monster/:id', monsterRoute);
app.get('/api/monsters-reset', monstersResetRoute);
app.get('*', defaultRoute);

var port = process.env.PORT || 3000;

app.listen(port);

console.log("Encounter Builder Server listening on port " + port);