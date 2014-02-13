"use strict";

var fs = require("fs");
var cheerio = require("cheerio");
var levenshtein = require("fast-levenshtein");

var fakeMongoose = {model: function () {
}};

var srd_monsters = require("../data/contrib/monsters_partial.json");
var kyle_monsters = require("../data/contrib/monsters_kyle.json");
var MONSTER_ATTRIBUTES = require('./monsterModel')(fakeMongoose).MONSTER_ATTRIBUTES;

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
        return parseAttributeFromSrdMonster($("b:contains(Init)"), /Init\s*([-,\+]\d*);/);
    },
    Senses: function (srdMonster, $) {
        return parseAttributeFromSrdMonster($("b:contains(Senses)"), /.*;\s*Senses\s*(.*)/);
    },
    SR: function (srdMonster, $) {
        return parseAttributeFromSrdMonster($("b:contains(SR)"), /.*SR\s*(.*)/);
    },
    DR: function (srdMonster, $) {
        return parseAttributeFromSrdMonster($("b:contains(DR)"), /.*DR\s*([^;]*)/);
    },
    Immune: function (srdMonster, $) {
        var immune = parseAttributeFromSrdMonster($("b:contains(Immune)"), /.*Immune\s*([^;]*)/);
        var weakness = immune.indexOf("Weaknesses");
        if (weakness != -1) {
            immune = immune.slice(0, weakness).trim();
        }
        return immune;
    },
    Weaknesses: function (srdMonster, $) {
        var weakness = parseAttributeFromSrdMonster($("b:contains(Weaknesses)"), /.*Weaknesses\s*([^;]*)/);
        if (weakness) return weakness;
        return parseAttributeFromSrdMonster($("b:contains(Immune)"), /.*Weaknesses\s*([^;]*)/);
    },
    SpecialAttacks: function (srdMonster, $) {
        return parseAttributeFromSrdMonster($("b:contains(Special Attacks)"), /.*Special Attacks\s*(.*)/);
    },
    SpellLikeAbilities: function (srdMonster, $) {
        var element = $("b:contains(Spell-Like Abilities)");
        if (!element.text()) {
            //stupid typo in source
            element = $("b:contains(Spell- Like Abilities)");
        }
        return element.parent().html();
    },
    Str: function (srdMonster, $) {
        return  /Str\s*(\d*)/.exec(srdMonster.AbilityScores)[1];
    },
    Dex: function (srdMonster, $) {
        return  /Dex\s*(\d*)/.exec(srdMonster.AbilityScores)[1];
    },
    Con: function (srdMonster, $) {
        return  /Con\s*(\d*)/.exec(srdMonster.AbilityScores)[1];
    },
    Int: function (srdMonster, $) {
        return  /Int\s*(\d*)/.exec(srdMonster.AbilityScores)[1];
    },
    Wis: function (srdMonster, $) {
        return  /Wis\s*(\d*)/.exec(srdMonster.AbilityScores)[1];
    },
    Cha: function (srdMonster, $) {
        return  /Cha\s*(\d*)/.exec(srdMonster.AbilityScores)[1];
    },
    BaseAtk: function (srdMonster, $) {
        return parseAttributeFromSrdMonster($("b:contains(Base Atk)"), /.*Base Atk\s*([^;]*)/);
    },
    CMB: function (srdMonster, $) {
        return parseAttributeFromSrdMonster($("b:contains(CMB)"), /.*CMB\s*([^;]*)/);
    },
    CMD: function (srdMonster, $) {
        return parseAttributeFromSrdMonster($("b:contains(CMD)"), /.*CMD\s*(.*)/);
    },
    SpecialAbilities: function (srdMonster, $) {
        return getSRDMonsterSpecialAbilities(srdMonster, $);
    },
    TreasureBudget: function (srdMonster) {
        return getBudget(srdMonster)
    },
    Heroic: function (srdMonster) {
        if (srdMonster.Class) {
            return parseClass(srdMonster.Class).Heroic;
        }
        else {
            return false;
        }
    },
    Classes: function (srdMonster) {
        if (srdMonster.Class) {
            return parseClass(srdMonster.Class).Classes;
        }
    },
    Level: function (srdMonster) {
        if (srdMonster.Class) {
            return parseClass(srdMonster.Class).Level;
        }
    }
}

function getBudget(srdMonster) {
    var budget;
    var parenthesis = srdMonster.Treasure.indexOf('(');
    if (parenthesis !== -1) {
        budget = srdMonster.Treasure.slice(0, parenthesis).trim().toLowerCase();
    } else {
        budget = srdMonster.Treasure.trim().toLowerCase();
    }
    var table = {
        "": "none",
        "?": "none",
        "greataxe": "none",
        "+1 longsword": "none",
        "value 800 gp": "none",
        "shell worth 800gp": "none",
        "shell worth 800 gp": "none",
        "two gemstone eyes": "none",
        "value": "none",
        "value none": "none",
        "1/10 standard": "none",
        "50% coins, 1/10th goods, 1/10th items": "none",
        "none or incidental": "incidental",
        "none": "none",
        "50% standard": "incidental",
        "no coins, double goods": "standard",
        "double coins; 50% goods; 50% items": "incidental",
        "no coins; 50% goods; 50% items": "incidental",
        "no coins, 50% goods, 50% items": "incidental",
        "1/10 coins; 50% goods; 50% items": "incidental",
        "25% coins; 25% goods; no items": "incidental",
        "25% coins, 25% goods, no items": "incidental",
        "double coins, standard goods, standard items": "standard",
        "10% coins; 50% goods": "none",
        "50% coins; double goods": "standard",
        "50% coins; double goods; standard items": "standard",
        "standard coins": "standard",
        "incidental": "incidental",
        "half standard": "incidental",
        "standard coins; 50% goods; 50% items": "incidental",
        "value incidental": "incidental",
        "standard, plus 1d3 gems": "standard",
        "standard": "standard",
        "standard coins or goods; no items": "standard",
        "standard plus 2 gems": "standard",
        "standard coins; double goods; standard items": "standard",
        "standard coins, double goods": "standard",
        "standard or otherwise": "standard",
        "standard plus double gems": "standard",
        "value double standard": "standard",
        "value standard": "standard",
        'no coins; standard goods': "standard",
        "double": "double",
        "double standard": "double",
        "double standard plus 8 gems": "double",
        "triple": "triple",
        "triple standard": "triple",
        "triple standard plus crystal ball": "triple",
        "triple sq sound imitation": "triple",
        "triple sq water breathing": "triple",
        "triple sq icewalking": "triple",
        "npc gear": "npc gear",
        "double standard sheol: baal's unique weapon is a large +4 unholy morningstar. as a free action, the handle of baal's morningstar can extend 10 feet, thus increasing his reach with this weapon. it can likewise retract to its normal length as a free action.": "double",
        "standard special abilities pass without trace": "standard"
    }
    budget = table[budget];
    if (budget === undefined) {
        console.log("[WARNING] unknown treasure budget '" + srdMonster.Treasure + "' for monster " + srdMonster.Name)
    }
    return budget;
}

function parseClass(Class) {
    var basicClasses = ['commoner', 'aristocrat', 'expert', 'warrior', 'adept'];

    function parseSingleClass(singleClass) {
        var words = singleClass.split(" ");
        var readClass = '';
        var classLevel = 0;
        for (var i in words) {
            if (isNaN(Number(words[i]))) {
                if (i > 0) {
                    readClass += " ";
                }
                readClass += words[i]
            }
            else {
                classLevel = Number(words[i]);
            }
        }
        return {Class: readClass, Level: classLevel};
    }

    if (Class.indexOf('/') === -1) {
        var singleClass = parseSingleClass(Class);
        var heroic = basicClasses.indexOf(singleClass.class) === -1;
        return {'Heroic': heroic, 'Level': singleClass.Level, 'Classes': [singleClass]};
    }
    else {
        var classes = Class.split('/');
        var multipleClasses = [];
        var heroic = false;
        var level = 0;
        for (var j in classes) {
            multipleClasses[j] = parseSingleClass(classes[j]);
            level += multipleClasses[j].classLevel;
            if (!heroic) {
                heroic = basicClasses.indexOf(multipleClasses[j].class) === -1;
            }
        }
        return {'Heroic': heroic, 'Level': level, 'Classes': multipleClasses};
    }
}

function parseAttributeFromSrdMonster(element, regex) {
    if (!element.text()) {
        return "";
    }
    var match = regex.exec(element.parent().text());
    if (!match) {
        return "";
    }
    return match[1];
}

function getSRDMonsterVisualDescription(monster, $) {
    var element = $("div > h3 > i");
    return element.text();
}

function getSRDMonsterSpecialAbilities(monster, $) {
    var element = $("div:contains(SPECIAL ABILITIES)");
    return element.next().next().html();
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
    var DEFAULT_MAX_DISTANCE = 0.35;
    var MIN_LENGTH_RATIO = 0.3;
    var MAX_LENGTH_RATIO = 3.0;
    for (var i in MONSTER_ATTRIBUTES) {
        var max_distance = DEFAULT_MAX_DISTANCE;
        var attribute = MONSTER_ATTRIBUTES[i];
        if (attribute == "Init" || attribute == "BaseAtk" || attribute == "CMB" && kyleMonster[attribute][0] != '-') {
            kyleMonster[attribute] = "+" + kyleMonster[attribute];
        }
        if (attribute == "SpellLikeAbilities") {
            max_distance = 0.5;
        }
        if (kyleMonster[attribute] != undefined) {
            var distance = getDistance(srdMonster[attribute], kyleMonster[attribute]);
            var lengthRatio = getLengthRatio(srdMonster[attribute], kyleMonster[attribute]);
            if (distance > max_distance) {
                console.log("[ERROR] : " + srdMonster.Name + " : " + attribute + " has a distance : " + distance);
                console.log("SRD : '" + srdMonster[attribute] + "'");
                console.log("KYL : '" + kyleMonster[attribute] + "'");
            }
            if (lengthRatio < MIN_LENGTH_RATIO || lengthRatio > MAX_LENGTH_RATIO) {
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
        if (monster[attribute] === '') {
            delete monster[attribute];
        }
    }
    return monster;
}

var monsters = [];
var monsterNameCount = {};

for (var i in srd_monsters) {
    if (i > 300)break;
    console.log(i + " / " + srd_monsters.length);

    var kyleMonster = getKyleMonsterByID(srd_monsters[i].id)
    if (kyleMonster == undefined) {
        continue; //FIXME remove this
    }
    var $ = cheerio.load(srd_monsters[i].FullText);

    var cleanedUpMonster = cleanupSRDMonster(srd_monsters[i], $);
    /*
     try {
     compareMonsters(cleanedUpMonster, kyleMonster);
     } catch (e) {
     console.log(e.stack);
     continue;
     }
     */
    monsters.push(cleanedUpMonster);
    if (monsterNameCount[cleanedUpMonster.Name.toLowerCase()] !== undefined) {
        monsterNameCount[cleanedUpMonster.Name.toLowerCase()]++;
        console.log("[WARNING] : " + cleanedUpMonster.Name.toLowerCase() + " occurs at least " + monsterNameCount[cleanedUpMonster.Name.toLowerCase()] + " times");
    } else {
        monsterNameCount[cleanedUpMonster.Name.toLowerCase()] = 1;
    }

}

console.log();

for (var name in monsterNameCount) {
    if (monsterNameCount[name] > 1) {
        console.log("[WARNING] : " + name + " occurs " + monsterNameCount[name] + " times");
    }
}

fs.writeFileSync('../data/monsters/monsters.json', JSON.stringify(monsters));

console.log("done");
