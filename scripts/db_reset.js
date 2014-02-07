var fs = require("fs");
var mongoose = require('mongoose');
var Monster = require('./monsterModel')(mongoose).Monster;
var MagicItem = require('./magicItemModel')(mongoose).MagicItem;

if (process.env.USE_TEST_DB) {
    var db = mongoose.connect(process.env['MONGODB_TEST_URL']);
} else {
    var db = mongoose.connect(process.env['MONGODB_URL']);
}

var monster_ids = [];
var magic_item_ids = [];

function generateId(name, ids) {
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

var monsterCount = 0;
var monsterDone = false;
var itemCount = 0;
var itemDone = false;

Monster.remove({}, function (error) {

    if (error) {
        throw error;
    }

    var monsterFile = __dirname + '/../data/monsters/monsters.json';

    fs.readFile(monsterFile, 'utf8', function (error, monsters) {
        if (error) {
            throw error;
        }
        monsters = JSON.parse(monsters);
        if (process.env.USE_TEST_DB) {
            monsters = monsters.splice(0, 300);
        }
        for (var monster in monsters) {
            monsters[monster].CR = Number(eval(monsters[monster].CR));
            monsters[monster].id = generateId(monsters[monster].Name, monster_ids);
            Monster.create(monsters[monster], function (error) {
                if (error) {
                    throw error;
                }
                monsterCount++;
                if (monsterCount == monsters.length) {
                    console.log("inserted " + monsterCount + " monsters");
                    console.log("monster insert done");
                    monsterDone = true;
                    if (itemDone) {
                        db.disconnect();
                    }
                }
            });
        }
    });
});

MagicItem.remove({}, function (error) {

    if (error) {
        throw error;
    }

    var magicItems = __dirname + '/../data/items/magic-items.json';

    fs.readFile(magicItems, 'utf8', function (error, items) {
        if (error) {
            throw error;
        }
        items = JSON.parse(items);
        if (process.env.USE_TEST_DB) {
            items = items.splice(0, 300);
        }
        for (var item in items) {
            items[item].id = generateId(items[item].Name, magic_item_ids);
            MagicItem.create(items[item], function (error) {
                if (error) {
                    throw error;
                }
                itemCount++;
                if (itemCount == items.length) {
                    console.log("inserted " + itemCount + " magic items");
                    console.log("magic items insert done");
                    itemDone = true;
                    if (monsterDone) {
                        db.disconnect();
                    }
                }
            });
        }
    });
});