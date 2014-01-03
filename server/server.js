var express = require('express');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');

const FIND_LIMIT = 50;

mongoose.connect('mongodb://heroku:fR98x8wJk2RN@mongo.onmodulus.net:27017/gu9gOmot');

app.configure(function () {
    app.use(express.static(__dirname + '/../app'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

var Monster = mongoose.model('Monster', {
    name: String,
    id: String,
    cr: Number
});

var defaultRoute = require('./defaultRoute')();
var searchMonstersRoute = require('./searchMonstersRoute')(Monster, FIND_LIMIT);

app.get('/api/monsters-reset', function (request, response) {

    var ids = [];

    function generateId(name) {
        var prefix = name.toLowerCase().replace(/\s/g, "-");

        if (ids.indexOf(prefix) === -1) {
            ids.push(prefix);
            return prefix;
        }

        var suffix = 0;
        while (ids.indexOf(prefix + "-" + suffix) !== -1) {
            ++suffix;
        }

        var id = prefix + "-" + suffix;
        ids.push(id);
        console.log(id);
        return id;
    }

    Monster.remove({}, function (error) {
        console.log('collection removed');

        if (error)
            response.send(error);


        var file = __dirname + '/../monsters/monsters_full.json';

        fs.readFile(file, 'utf8', function (error, monsters) {
            if (error) {
                console.log('Error: ' + error);
                return;
            }

            monsters = JSON.parse(monsters);
            for (monster in monsters) {
                var monster = {
                    name: monsters[monster].Name,
                    id : generateId(monsters[monster].Name),
                    cr: Number(eval(monsters[monster].CR))
                };
                Monster.create(monster, function (error) {
                    if (error)
                        console.log('Error: ' + error);

                });
            }
            response.send('monsters regenerated');
        });
    });
});

app.get('/api/search-monsters', searchMonstersRoute);

app.get('/api/monster/:id', function (request, response) {
    Monster.find({id: request.params.id}, function (error, monster) {
        if (error)
            response.send(error);

        response.json(monster);
    });
});

app.get('*', defaultRoute);

var port = process.env.PORT || 3000;

app.listen(port);

console.log("Encounter Builder Server listening on port " + port);
