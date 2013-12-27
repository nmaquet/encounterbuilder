var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017');

app.configure(function () {
    app.use(express.static(__dirname + '/app'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

var Monster = mongoose.model('Monster', {
    name: String,
    cr: Number
});

app.get('/api/monsters', function (request, response) {

    Monster.find(function (error, monsters) {
        if (error)
            response.send(error);

        response.json(monsters);
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

app.listen(8080);

console.log("App listening on port 8080");
