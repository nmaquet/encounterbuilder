var window = null;
var cheerio = require("cheerio");
var srd_monsters = require("../data/monsters/monsters_partial.json");
var kyle_monsters = require("../data/monsters/monsters_kyle.json");
var expect = require('chai').expect;
var levenshtein = require("fast-levenshtein");
var fs = require("fs");

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
    return element.html();
}

function getSRDMonsterDescription(monster) {
    var div_i = 0;
    var div_range = [12, 10,11,13,15,16,17,18,1,2,3,4,5,6,7,8,9,19,20,21,22,23];
    var description = getSRDMonsterDescriptionInDivX(monster, 14);
    try {
        var kyleDescription = getKyleMonsterByID(monster.id).Description;
        var minDistance = levenshtein.get(""+description, ""+kyleDescription);
        while (minDistance>50 && div_i < div_range.length) {
            console.log("trying spurious div " + div_range[div_i] + "...");
            var testDescription = getSRDMonsterDescriptionInDivX(monster, div_range[div_i]);
            kyleDescription = getKyleMonsterByID(monster.id).Description;
            var distance = levenshtein.get(""+testDescription, ""+kyleDescription)

            if (distance<minDistance){
                minDistance = distance;
                description = testDescription;

            }
            div_i++;

        }
        if (div_i >= div_range.length){
            console.log(monster.Name + ' description not found');
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
        console.log(srdMonster.Name + " / " + kyleMonster.Name + "distance : "+distance );
       /* console.log("SRD DESC>>>>");
        console.log(srdDescription);
        console.log();
        console.log("KYL DESC>>>>");
        console.log(kyleDescription);*/
        fs.writeFileSync("../data/monsters/descriptionerrors/"+srdMonster.Name.replace(" ","") + "_srd_fulltext.html",srdMonster.FullText);
        fs.writeFileSync("../data/monsters/descriptionerrors/"+kyleMonster.Name[0].replace(" ","") + "_kyle_description.txt",kyleMonster.Description[0]);

    }
    //console.log(distance)
}

function cleanupSRDMonster(srdMonster) {
    return {
        Name: srdMonster.Name.trim(),
        Description: getSRDMonsterDescription(srdMonster),
        Description_Visual: getSRDMonsterVisualDescription(srdMonster),
        FullText:srdMonster.FullText
    };
}


var OK_COUNT = 0;

for (i in srd_monsters) {
    console.log("monster " + i + " / " + srd_monsters.length)
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