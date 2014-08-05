// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

var fs = require("fs");

var mongoose = require('mongoose');
var Monster = require('./monsterModel')(mongoose).Monster;
var MagicItem = require('./magicItemModel')(mongoose).MagicItem;
var Npc = require('./npcs/npcModel')(mongoose).Npc;
var Spell = require('./spells/spellModel')(mongoose).Spell;
var Feat = require('./feats/featModel')(mongoose).Feat;

var idify = require(__dirname + "/../server/utils.js")().idify;
var idifyFeat = require(__dirname + "/../server/utils.js")().idifyFeat;
var async = require('async');

if (process.argv[2]) {
    var MONGODB_URL = process.argv[2];
}
else if (process.env.USE_TEST_DB) {
    var MONGODB_URL = process.env['MONGODB_TEST_URL'];
}
else {
    var MONGODB_URL = process.env['MONGODB_URL'];
}

console.log("mongodb url : " + MONGODB_URL);
var db = mongoose.connect(MONGODB_URL);
var monster_ids = [];
var npc_ids = [];
var spell_ids = [];
var feat_ids = [];
var magic_item_ids = [];

function generateId(name, ids) {
    var prefix = idify(name);

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

function batchInsert(collection, array, batchSize, callback, array_length) {
    array_length = array_length || array.length;
    if (array.length === 0) {
        return callback(null);
    }
    var batch = array.splice(0, batchSize);
    collection.insert(batch, function (error) {
        if (error) {
            callback(error);
        } else {
            var percent = Math.floor(((array_length - array.length) / array_length).toFixed(2) * 100)
            process.stdout.write("(" + percent + "% : inserted " + (array_length - array.length) + " out of " + array_length + ")\r");
            batchInsert(collection, array, batchSize, callback, array_length);
        }
    });
}

function resetMonster(callback) {
    Monster.remove({}, function (error, count) {

        if (error) {
            callback(error, null);
        }

        console.log(count + " monsters removed");

        var monsterFile = __dirname + '/../data/monsters/monsters.json';

        fs.readFile(monsterFile, 'utf8', function (error, monsters) {
            if (error) {
                callback(error, null);
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
                callback(error, null);
            });
        });
    });
}


function resetNpcs(callback) {
    Npc.remove({}, function (error, count) {

        if (error) {
            callback(error, null);
        }

        console.log(count + " npcs removed");

        var npcsFile = __dirname + '/../data/npcs/npcs.json';

        fs.readFile(npcsFile, 'utf8', function (error, npcs) {
            if (error) {
                callback(error, null);
            }
            npcs = JSON.parse(npcs);
            if (process.env.USE_TEST_DB) {
                npcs = npcs.splice(0, 300);
            }
            for (var npc in npcs) {
                npcs[npc].CR = Number(eval(npcs[npc].CR));
                npcs[npc].id = generateId(npcs[npc].Name, npc_ids);
            }
            batchInsert(Npc.collection, npcs, 500, function (error) {
                callback(error, null);
            });
        });
    });
}

function resetSpells(callback) {
    Spell.remove({}, function (error, count) {

        if (error) {
            callback(error, null);
        }

        console.log(count + " spells removed");

        var spellsFile = __dirname + '/../data/spells/spells.json';

        fs.readFile(spellsFile, 'utf8', function (error, spells) {
            if (error) {
                callback(error, null);
            }
            spells = JSON.parse(spells);
            if (process.env.USE_TEST_DB) {
                spells = spells.splice(0, 300);
            }
            for (var spell in spells) {
                spells[spell].id = generateId(spells[spell].name, spell_ids);
            }
            batchInsert(Spell.collection, spells, 500, function (error) {
                callback(error, null);
            });
        });
    });
}

function resetFeats(callback) {
    Feat.remove({}, function (error, count) {

        if (error) {
            callback(error, null);
        }

        console.log(count + " feats removed");

        var featsFile = __dirname + '/../data/feats/feats.json';

        fs.readFile(featsFile, 'utf8', function (error, feats) {
            if (error) {
                callback(error, null);
            }
            feats = JSON.parse(feats);
            if (process.env.USE_TEST_DB) {
                feats = feats.splice(0, 300);
            }
            for (var feat in feats) {
                feats[feat].id = generateId(idifyFeat(feats[feat]), feat_ids);
            }
            batchInsert(Feat.collection, feats, 500, function (error) {
                callback(error, null);
            });
        });
    });
}

function resetMagicItems(callback) {
    MagicItem.remove({}, function (error, count) {

        if (error) {
            callback(error, null);
        }

        console.log(count + " magic items removed");

        var filenames = [
                __dirname + '/../data/items/merged-items.json',
                __dirname + '/../data/items/enchanted_weapons.json',
                __dirname + '/../data/items/enchanted_armors_and_shields.json',
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
                items[item].Enchanted = items[item].Enchanted || false;
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
            callback(error, null);
        });
    });
}
async.parallel([resetMonster, resetMagicItems, resetNpcs, resetSpells, resetFeats], function (error, results) {
    console.log("Error : " + error);
    console.log(results);
    db.disconnect();
//    console.log("done. WARNING MAGIC ITEMS NOT RESET");
});