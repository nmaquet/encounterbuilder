var window = null;
var cheerio = require("cheerio");
var srd_monsters = require("../data/monsters/monsters_partial.json");
var kyle_monsters = require("../data/monsters/monsters_kyle.json");
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

function compareMonsters(srdMonster, kyleMonster) {
    var WORST_DISTANCE_ALLOWED = 0.35;
    expect(srdMonster.Name).to.equal(kyleMonster.Name[0]);
    expect(kyleMonster.Name.length).to.equal(1);
    expect(srdMonster.Description_Visual).to.equal(kyleMonster.Description_Visual[0]);
    expect(kyleMonster.Description_Visual.length).to.equal(1);
    var distance = getDistance(srdMonster.Description, kyleMonster.Description);
    if (distance > WORST_DISTANCE_ALLOWED) {
        console.log("[ERROR] : " + srdMonster.Name + " / " + kyleMonster.Name + " has a distance : " + distance);
        fs.writeFileSync("../data/monsters/descriptionerrors/" + srdMonster.Name.replace(" ", "") + "_srd_fulltext.html", srdMonster.FullText);
        fs.writeFileSync("../data/monsters/descriptionerrors/" + kyleMonster.Name[0].replace(" ", "") + "_kyle_description.txt", kyleMonster.Description[0]);
    }
}

function cleanupSRDMonster(srdMonster) {
    return {
        Name: srdMonster.Name.trim(),
        Description: getSRDMonsterDescription(srdMonster),
        Description_Visual: getSRDMonsterVisualDescription(srdMonster),
        FullText: srdMonster.FullText,
        CR: srdMonster.CR
    };
}

var monsters = [];

for (i in srd_monsters) {
    console.log("monster " + i + " / " + srd_monsters.length)
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
}

fs.writeFileSync('../data/monsters/monsters.json', JSON.stringify(monsters));

console.log("done");