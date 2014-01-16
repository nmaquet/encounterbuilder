"use strict";

var fs = require("fs");
var cheerio = require("cheerio");
var levenshtein = require("fast-levenshtein");

var fakeMongoose = {model: function () {
}};
var srd_monsters = require("../data/contrib/monsters_partial.json");
var kyle_monsters = require("../data/contrib/monsters_kyle.json");
var MONSTER_ATTRIBUTES = require('../server/monsterModel')(fakeMongoose).MONSTER_ATTRIBUTES;

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

function getDistance(object1, object2) {
    var string1 = "" + object1;
    var string2 = "" + object2;
    var max_length = Math.max(string1.length, string2.length);
    return levenshtein.get(string1, string2) / max_length;
}

function getLengthRatio(object1, object2) {
    var string1 = "" + object1;
    var string2 = "" + object2;
    if (string1.length == 0 && string2.length == 0) {
        return 1;
    }
    return string1.length / string2.length;
}

var ATTRIBUTE_FILTERS = {
    Description: function (srdMonster, $) {
        return getSRDMonsterDescription(srdMonster, $);
    },
    Description_Visual: function (srdMonster, $) {
        return getSRDMonsterVisualDescription(srdMonster, $);
    },
    Init: function (srdMonster, $) {
        return parseAttributeFromSrdMonster($("b:contains(Init)"),/Init\s*([-,\+]\d*);/);
    },
    Senses: function (srdMonster, $) {
        return parseAttributeFromSrdMonster($("b:contains(Senses)"), /.*;\s*Senses\s*(.*)/);
    },
    SR : function (srdMonster, $) {
        return parseAttributeFromSrdMonster($("b:contains(SR)"),/.*SR\s*(.*)/);
    },
    DR : function (srdMonster, $) {
        return parseAttributeFromSrdMonster($("b:contains(DR)"), /.*DR\s*([^;]*)/);
    }
}
function parseAttributeFromSrdMonster(element,regex)
{
    if (element.text()) {
        return regex.exec(element.parent().text())[1];
    } else {
        return "";
    }

}
function getSRDMonsterVisualDescription(monster, $) {

    var element = $("div > h3 > i");
    return element.text();
}

function getSRDMonsterDescription(monster, $) {
    function get(div) {
        var element = $("div").eq(div).children().first();
        return element.html();
    }

    var kyleDescription = getKyleMonsterByID(monster.id).Description;
    if (kyleDescription == undefined) {
        console.log("[WARNING] no Kyle Monster '" + monster.Name + "' => guessing description at div 14 !");
        return get(14);
    }
    var div = [14, 12, 16];
    var minDistance = Number.MAX_VALUE;
    var bestDescription = null;
    var ACCEPTABLE_DISTANCE = 0.20;
    for (var i in div) {
        var description = get(div[i]);
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

function compareMonsters(srdMonster, kyleMonster) {
    var WORST_DISTANCE_ALLOWED = 0.35;
    var MIN_LENGTH_RATIO_ALLOWED = 0.3;
    var MAX_LENGTH_RATIO_ALLOWED = 3.0;
    for (var i in MONSTER_ATTRIBUTES) {
        var attribute = MONSTER_ATTRIBUTES[i];
        if (attribute == "Init" &&  kyleMonster[attribute][0] != '-') {
            kyleMonster[attribute] = "+" + kyleMonster[attribute];
        }
        if (kyleMonster[attribute] != undefined) {
            var distance = getDistance(srdMonster[attribute], kyleMonster[attribute]);
            var lengthRatio = getLengthRatio(srdMonster[attribute], kyleMonster[attribute]);
            if (distance > WORST_DISTANCE_ALLOWED) {
                console.log("[ERROR] : " + srdMonster.Name + " : " + attribute + " has a distance : " + distance);
                console.log("SRD : '" + srdMonster[attribute] + "'");
                console.log("KYL : '" + kyleMonster[attribute] + "'");
            }
            if (lengthRatio < MIN_LENGTH_RATIO_ALLOWED || lengthRatio > MAX_LENGTH_RATIO_ALLOWED) {
                console.log("[ERROR] : " + srdMonster.Name + " : " + attribute + " has a length ratio : " + lengthRatio);
                console.log("SRD : '" + srdMonster[attribute] + "'");
                console.log("KYL : '" + kyleMonster[attribute] + "'");
            }
        }
    }
}

function cleanupSRDMonster(srdMonster, $) {
    var monster = {};
    for (var i in MONSTER_ATTRIBUTES) {
        var attribute = MONSTER_ATTRIBUTES[i];
        var attributeFilter = ATTRIBUTE_FILTERS[attribute];
        if (attributeFilter) {
            monster[attribute] = attributeFilter(srdMonster, $);
        } else {
            monster[attribute] = srdMonster[attribute].trim();
        }
    }
    return monster;
}

var monsters = [];

for (var i in srd_monsters) {
    console.log("monster " + i + " / " + srd_monsters.length)
    var kyleMonster = getKyleMonsterByID(srd_monsters[i].id)
    if (kyleMonster == undefined) {
        continue;
    }
    var $ = cheerio.load(srd_monsters[i].FullText);

    try {
        compareMonsters(cleanupSRDMonster(srd_monsters[i], $), kyleMonster);
    } catch (e) {
        console.log(e.stack);
        continue;
    }

    monsters.push(cleanupSRDMonster(srd_monsters[i], $));
    if (i > 100)break;
}

fs.writeFileSync('../data/monsters/monsters.json', JSON.stringify(monsters));

console.log("done");