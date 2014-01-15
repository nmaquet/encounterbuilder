"use strict";

var window = null;
var cheerio = require("cheerio");
var srd_monsters = require("../data/contrib/monsters_partial.json");
var kyle_monsters = require("../data/contrib/monsters_kyle.json");
var expect = require('chai').expect;
var levenshtein = require("fast-levenshtein");
var fs = require("fs");

var KYLE_MONSTER_BY_ID = {};

(function () {
    var array = kyle_monsters.ArrayOfMonster.Monster;
    for (var i in array) {
        KYLE_MONSTER_BY_ID[array[i].id] = array[i];
    }
})();

function getKyleMonsterByID(id) {
    return KYLE_MONSTER_BY_ID[id];
}

function getSRDMonsterVisualDescription(monster) {
    var $ = cheerio.load(monster.FullText);
    var element = $("div > h3 > i");
    return element.text();
}

function getSRDMonsterDescriptionInDivX(monster, div) {
    var $ = cheerio.load(monster.FullText);
    var element = $("div").eq(div).children().first();
    return element.html();
}

function getDistance(object1, object2) {
    var string1 = "" + object1;
    var string2 = "" + object2;
    var max_length = Math.max(string1.length, string2.length);
    return levenshtein.get(string1, string2) / max_length;
}

function getLengthRatio(object1, object2) {
    var string1 = "" + object1;
    var string2 = "" + object2;
    return string1.length / string2.length;
}

function getSRDMonsterDescription(monster) {
    var kyleDescription = getKyleMonsterByID(monster.id).Description;
    if (kyleDescription == undefined) {
        console.log("[WARNING] no Kyle Monster '" + monster.Name + "' => guessing description at div 14 !");
        return getSRDMonsterDescriptionInDivX(monster, 14);
    }
    var div = [14, 12, 16];
    var minDistance = Number.MAX_VALUE;
    var bestDescription = null;
    var ACCEPTABLE_DISTANCE = 0.20;
    for (var i in div) {
        var description = getSRDMonsterDescriptionInDivX(monster, div[i]);
        var distance = getDistance(description, kyleDescription);
        if (distance < minDistance) {
            minDistance = distance;
            bestDescription = description;
        }
        if (minDistance <= ACCEPTABLE_DISTANCE) {
            break;
        }
    }
    return bestDescription;
}

var MONSTER_ATTRIBUTES = [
    "Name",
    "XP",
    "Description",
    "Description_Visual",
    "CR"
]

var ATTRIBUTE_FILTERS = {
    Description: function (srdMonster) {
        return getSRDMonsterDescription(srdMonster);
    },
    Description_Visual: function (srdMonster) {
        return getSRDMonsterVisualDescription(srdMonster);
    }
}

function compareMonsters(srdMonster, kyleMonster) {
    var WORST_DISTANCE_ALLOWED = 0.35;
    var MIN_LENGTH_RATIO_ALLOWED = 0.5;
    var MAX_LENGTH_RATIO_ALLOWED = 2.0;
    for (var i in MONSTER_ATTRIBUTES) {
        var attribute = MONSTER_ATTRIBUTES[i];
        var distance = getDistance(srdMonster[attribute], kyleMonster[attribute]);
        var lengthRatio = getLengthRatio(srdMonster[attribute], kyleMonster[attribute]);
        if (distance > WORST_DISTANCE_ALLOWED) {
            console.log("[ERROR] : " + srdMonster.Name + " / " + kyleMonster.Name + " has a distance : " + distance);
        }
        if (lengthRatio < MIN_LENGTH_RATIO_ALLOWED || lengthRatio > MAX_LENGTH_RATIO_ALLOWED) {
            console.log("[ERROR] : " + srdMonster.Name + " / " + kyleMonster.Name + " has a length ratio : " + lengthRatio);
        }
    }
}

function cleanupSRDMonster(srdMonster) {
    var monster = {};
    for (var i in MONSTER_ATTRIBUTES) {
        var attribute = MONSTER_ATTRIBUTES[i];
        var attributeFilter = ATTRIBUTE_FILTERS[attribute];
        if (attributeFilter) {
            monster[attribute] = attributeFilter(srdMonster);
        } else {
            monster[attribute] = srdMonster[attribute].trim();
        }
    }
    return monster;
}

var monsters = [];

for (var i in srd_monsters) {
    console.log("WTF ? monster " + i + " / " + srd_monsters.length)
    var kyleMonster = getKyleMonsterByID(srd_monsters[i].id)
    if (kyleMonster == undefined) {
        continue;
    }
    /*
     try {
     compareMonsters(cleanupSRDMonster(srd_monsters[i]), kyleMonster);
     } catch (e) {
     console.log(e.stack);
     continue;
     } */
    monsters.push(cleanupSRDMonster(srd_monsters[i]));
    if (i > 100) {
        break;
    }
}

fs.writeFileSync('../data/monsters/monsters_new.json', JSON.stringify(monsters));

console.log("done");