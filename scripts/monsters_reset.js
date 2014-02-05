var fs = require("fs");
var mongoose = require('mongoose');
var Monster = require('../server/monsterModel')(mongoose).Monster;

if (process.env.USE_TEST_DB) {
    var db = mongoose.connect(process.env['MONGODB_TEST_URL']);
} else {
    var db = mongoose.connect(process.env['MONGODB_URL']);
}

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
    return id;
}

var count = 0;

Monster.remove({}, function (error) {

    if (error) {
        throw error;
    }

    var file = __dirname + '/../data/monsters/monsters.json';

    fs.readFile(file, 'utf8', function (error, monsters) {
        if (error) {
            throw error;
        }
        monsters = JSON.parse(monsters);
        if (process.env.USE_TEST_DB) {
            monsters = monsters.splice(0, 300);
        }
        for (var monster in monsters) {
            monsters[monster].CR = Number(eval(monsters[monster].CR));
            monsters[monster].id = generateId(monsters[monster].Name);
            Monster.create(monsters[monster], function (error) {
                if (error) {
                    throw error;
                }
                console.log(count + " / " + monsters.length);
                count++;
                if (count == monsters.length) {
                    console.log("inserted " + count + " monsters");
                    db.disconnect();
                    console.log("done");
                }
            });
        }
    });
});

