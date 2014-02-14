var fs = require("fs");

//FIXME remove mongoose
var mongoose = require('mongoose');
var Monster = require('./monsterModel')(mongoose).Monster;
var MagicItem = require('./magicItemModel')(mongoose).MagicItem;

var DerivedMagicItem = mongoose.model('DerivedMagicItem', {
    "CL": Number,
    "HighChance": Number,
    "LowChance": Number,
    "MagicType": String,
    "Name": String,
    "Price": Number,
    "PriceUnit": String,
    "Rarity": String,
    "SpellId": String,
    "SpellLevel": Number,
    "SpellName": String,
    "Type": String,
    "id": String
});

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
var derivedItemsDone = false;

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
                    if (itemDone && derivedItemsDone) {
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
                    if (monsterDone && derivedItemsDone) {
                        db.disconnect();
                    }
                }
            });
        }
    });
});

DerivedMagicItem.remove({}, function (error) {

    if (error) {
        throw error;
    }

    var filenames = [ __dirname + '/../data/items/scrolls.json', __dirname + '/../data/items/potions_and_oils.json', __dirname + '/../data/items/wands.json'];

    var fileDone = 0;
    for (var i in filenames) {
        fs.readFile(filenames[i], 'utf8', function (error, items) {
            if (error) {
                throw error;
            }
            items = JSON.parse(items);
            if (process.env.USE_TEST_DB) {
                items = items.splice(0, 300);
            }
            var derivedItemCount = 0;
            for (var item in items) {
                items[item].id = generateId(items[item].Name, magic_item_ids);
                DerivedMagicItem.create(items[item], function (error) {
                    if (error) {
                        throw error;
                    }
                    derivedItemCount++;
                    if (derivedItemCount == items.length) {
                        console.log("inserted " + derivedItemCount + " derived items");
                        console.log("derived items file insert done");
                        fileDone += 1;
                        if (fileDone === filenames.length ){
                            derivedItemsDone = true;
                        }
                        if (monsterDone && itemDone && derivedItemsDone ) {
                            db.disconnect();
                        }
                    }
                });
            }
        })
    }
    ;
});