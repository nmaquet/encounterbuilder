var express = require('express');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');

const FIND_LIMIT = 50;

mongoose.connect('mongodb://heroku:fR98x8wJk2RN@mongo.onmodulus.net:27017/gu9gOmot');

app.configure(function () {
    app.use(express.static(__dirname + '/app'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

var Monster = mongoose.model('Monster', {
    name: String,
    cr: String
});

app.get('/api/monsters', function (request, response) {

    Monster.find({}).limit(FIND_LIMIT).execFind(function (error, monsters) {
        if (error)
            response.send(error);

        response.json(monsters);
    });

});

app.get('/api/monsters-reset', function (request, response) {

    Monster.remove({}, function (error) {
        console.log('collection removed');
        if (error)
            response.send(error);


        var file = __dirname + '/monsters/monsters_full.json';

        fs.readFile(file, 'utf8', function (error, monsters) {
            if (error) {
                console.log('Error: ' + error);
                return;
            }

            monsters = JSON.parse(monsters);
            for (monster in monsters) {
                console.log(monsters[monster].Name);
                Monster.create({name: monsters[monster].Name, cr: monsters[monster].CR}, function (error) {
                    if (error)
                        console.log('Error: ' + error);

                });
            }
            response.send('monsters regenerated');
        });
    });
});

app.get('/api/search-monsters', function (request, response) {
    console.log(request.query);
    var regex = new RegExp(request.query.nameSubstring, "i");
    if (request.query.order === "cr") {
        var sortOption = 'cr name';
    } else {
        var sortOption = 'name cr';
    }
    Monster.find({name: regex}).limit(FIND_LIMIT).sort(sortOption).execFind(function (error, monster) {
        if (error)
            response.send(error);

        response.json(monster);
    });
});

app.get('/api/monster/:monster_id', function (request, response) {
    Monster.findById(request.params.monster_id, function (error, monster) {
        if (error)
            response.send(error);

        response.json(monster);
    });
});

app.get('*', function (req, res) {
    res.sendfile('./app/index.html');
});

var port = process.env.PORT || 3000;

app.listen(port);

console.log("Encounter Builder Server listening on port " + port);
