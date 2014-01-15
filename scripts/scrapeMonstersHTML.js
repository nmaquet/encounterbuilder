var window = null;
var cheerio = require("cheerio");
var srd_monsters = require("../data/monsters/monsters_partial.json");
var kyle_monsters = require("../data/monsters/monsters_kyle.json");
var expect = require('chai').expect;
var levenshtein = require("fast-levenshtein");

function getKyleMonsterByID(id) {
    var array = kyle_monsters.ArrayOfMonster.Monster;
    for (var i in array) {
        if (array[i].id == id) {
            return array[i];
        }
    }
    throw "not found";
}

function getSRDMonsterByName(name) {
    for (var i in srd_monsters) {
        if (srd_monsters[i].Name == name) {
            return srd_monsters[i];
        }
    }
    throw "not found";
}

function getSRDMonsterVisualDescription(monster) {
    var $ = cheerio.load(monster.FullText);
    var element = $("div > h3 > i");
    return element.text();
}

function getSRDMonsterDescriptionInDivX(monster, div) {
    var $ = cheerio.load(monster.FullText);
    var element = $("div").eq(div).children().first();
    var paragraphs = [];
    element.children().each(function (index, elem) {
        paragraphs.push($(this).text().trim());
    });
    return paragraphs;
}

function getSRDMonsterDescription(monster) {
    var div_i = 0;
    var div_range = [10,11,12,13,15,16,17,18];
    var description = getSRDMonsterDescriptionInDivX(monster, 14);
    try {
        var kyleDescription = getKyleMonsterByID(monster.id).Description;
        while (levenshtein.get(""+description, ""+kyleDescription) > 50) {
            description = getSRDMonsterDescriptionInDivX(monster, div_range[div_i]);
            kyleDescription = getKyleMonsterByID(monster.id).Description;
            div_i++;
        }
    } catch(e) {
        console.log(e.stack);
    }
    return description;
}

var PROBLEMATIC_DESCRIPTIONS = 0;

function compareMonsters(srdMonster, kyleMonster) {
    expect(srdMonster.Name).to.equal(kyleMonster.Name[0]);
    expect(kyleMonster.Name.length).to.equal(1);
    expect(srdMonster.Description_Visual).to.equal(kyleMonster.Description_Visual[0]);
    expect(kyleMonster.Description_Visual.length).to.equal(1);

    var srdDescription = "" + srdMonster.Description;
    var kyleDescription = "" + kyleMonster.Description;
    var distance = levenshtein.get(srdDescription, kyleDescription);
    if (distance > 50) {
        PROBLEMATIC_DESCRIPTIONS++;
        /*
        console.log(srdMonster.Name + " / " + kyleMonster.Name);
        console.log("SRD DESC>>>>");
        console.log(srdDescription);
        console.log();
        console.log("KYL DESC>>>>");
        console.log(kyleDescription);
        */
    }
    console.log(distance)
}

function cleanupSRDMonster(srdMonster) {
    return {
        Name: srdMonster.Name.trim(),
        Description: getSRDMonsterDescription(srdMonster),
        Description_Visual: getSRDMonsterVisualDescription(srdMonster)
    };
}


var OK_COUNT = 0;

for (i in srd_monsters) {
    try {
        var kyleMonster = getKyleMonsterByID(srd_monsters[i].id)
    } catch (e) {
        continue;
    }
    try {
        compareMonsters(cleanupSRDMonster(srd_monsters[i]), kyleMonster);
    } catch (e) {
        console.log(e);
        continue;
    }
    OK_COUNT++;
}

console.log(OK_COUNT + " monsters are OK !");
console.log(PROBLEMATIC_DESCRIPTIONS + " descriptions are not OK!");