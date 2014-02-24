var fs = require("fs");

//FIXME remove mongoose
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
var magicItemsDone = false;

function batchInsert(collection, array, batchSize, callback, array_length) {
    array_length = array_length || array.length;
    if (array.length === 0) {
        return callback(null);
    }
    var batch = array.splice(0, batchSize);
    collection.insert(batch, function(error) {
        if (error) {
            callback(error);
        } else {
            var percent = Math.floor(((array_length - array.length) / array_length).toFixed(2) * 100)
            process.stdout.write("(" + percent + "% : inserted " + (array_length - array.length) + " out of " + array_length + ")\r");
            batchInsert(collection, array, batchSize, callback, array_length);
        }
    });
}

Monster.remove({}, function (error, count) {

    if (error) {
        throw error;
    }

    console.log(count + " monsters removed");

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
        }
        batchInsert(Monster.collection, monsters, 500, function (error) {
            if (error) {
                throw error;
            }
            monsterDone = true;
            if (magicItemsDone) {
                db.disconnect();
            }
        });
    });
});

MagicItem.remove({}, function (error, count) {

    if (error) {
        throw error;
    }

    console.log(count + " magic items removed");

    var filenames = [
        __dirname + '/../data/items/magic-items.json',
        __dirname + '/../data/items/scrolls.json',
        __dirname + '/../data/items/potions_and_oils.json',
        __dirname + '/../data/items/wands.json',
        __dirname + '/../data/items/weapons.json',
        __dirname + '/../data/items/enchanted_weapons.json',
        __dirname + '/../data/items/armors_and_shields.json',
        __dirname + '/../data/items/enchanted_armors_and_shields.json'
    ];

    var itemsToInsert = [];

    for (var i in filenames) {
        var items = fs.readFileSync(filenames[i], 'utf8');
        items = JSON.parse(items);
        if (process.env.USE_TEST_DB) {
            items = items.splice(0, 300);
        }
        for (var item in items) {
            items[item].id = items[item].id || generateId(items[item].Name, magic_item_ids);
            items[item].Enchanted  = items[item].Enchanted || false;
            /* "spell items" : potions, scrolls, etc. */
            if (items[item].LowChance) {
                items[item].Derived = true;
                items[item].Source = "PFRPG Core";
            } else {
                items[item].Derived = false;
            }
            itemsToInsert.push(items[item]);
        }
    }

    batchInsert(MagicItem.collection, itemsToInsert, 3000, function (error) {
        if (error) {
            throw error;
        }
        magicItemsDone = true;
        if (monsterDone) {
            db.disconnect();
        }
    });
});