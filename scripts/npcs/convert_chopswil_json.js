"use strict";

var fs = require("fs");
var cheerio = require("cheerio");

var fakeMongoose = {model: function () {
}};

var chopswil_npcs = require("../data/contrib/npcs_partial.json");
var NPC_ATTRIBUTES = require('./npcModel')(fakeMongoose).NPC_ATTRIBUTES;

var ATTRIBUTE_FILTERS = {
    Description: function (srdNpc, $) {
        return getSRDNpcDescription(srdNpc, $);
    },
    Description_Visual: function (srdNpc, $) {
        return getSRDNpcVisualDescription(srdNpc, $);
    },
    Init: function (srdNpc, $) {
        return parseAttributeFromSrdNpc($("b:contains(Init)"), /Init\s*([-,\+]\d*);/);
    },
    Senses: function (srdNpc, $) {
        return parseAttributeFromSrdNpc($("b:contains(Senses)"), /.*;\s*Senses\s*(.*)/);
    },
    SR: function (srdNpc, $) {
        return parseAttributeFromSrdNpc($("b:contains(SR)"), /.*SR\s*(.*)/);
    },
    DR: function (srdNpc, $) {
        return parseAttributeFromSrdNpc($("b:contains(DR)"), /.*DR\s*([^;]*)/);
    },
    Immune: function (srdNpc, $) {
        var immune = parseAttributeFromSrdNpc($("b:contains(Immune)"), /.*Immune\s*([^;]*)/);
        var weakness = immune.indexOf("Weaknesses");
        if (weakness != -1) {
            immune = immune.slice(0, weakness).trim();
        }
        return immune;
    },
    Weaknesses: function (srdNpc, $) {
        var weakness = parseAttributeFromSrdNpc($("b:contains(Weaknesses)"), /.*Weaknesses\s*([^;]*)/);
        if (weakness) return weakness;
        return parseAttributeFromSrdNpc($("b:contains(Immune)"), /.*Weaknesses\s*([^;]*)/);
    },
    SpecialAttacks: function (srdNpc, $) {
        return parseAttributeFromSrdNpc($("b:contains(Special Attacks)"), /.*Special Attacks\s*(.*)/);
    },
    SpellLikeAbilities: function (srdNpc, $) {
        var element = $("b:contains(Spell-Like Abilities)");
        if (!element.text()) {
            //stupid typo in source
            element = $("b:contains(Spell- Like Abilities)");
        }
        return element.parent().html();
    },
    Str: function (srdNpc, $) {
        return  /Str\s*(\d*)/.exec(srdNpc.AbilityScores)[1];
    },
    Dex: function (srdNpc, $) {
        return  /Dex\s*(\d*)/.exec(srdNpc.AbilityScores)[1];
    },
    Con: function (srdNpc, $) {
        return  /Con\s*(\d*)/.exec(srdNpc.AbilityScores)[1];
    },
    Int: function (srdNpc, $) {
        return  /Int\s*(\d*)/.exec(srdNpc.AbilityScores)[1];
    },
    Wis: function (srdNpc, $) {
        return  /Wis\s*(\d*)/.exec(srdNpc.AbilityScores)[1];
    },
    Cha: function (srdNpc, $) {
        return  /Cha\s*(\d*)/.exec(srdNpc.AbilityScores)[1];
    },
    BaseAtk: function (srdNpc, $) {
        return parseAttributeFromSrdNpc($("b:contains(Base Atk)"), /.*Base Atk\s*([^;]*)/);
    },
    CMB: function (srdNpc, $) {
        return parseAttributeFromSrdNpc($("b:contains(CMB)"), /.*CMB\s*([^;]*)/);
    },
    CMD: function (srdNpc, $) {
        return parseAttributeFromSrdNpc($("b:contains(CMD)"), /.*CMD\s*(.*)/);
    },
    SpecialAbilities: function (srdNpc, $) {
        return getSRDNpcSpecialAbilities(srdNpc, $);
    },
    TreasureBudget: function (srdNpc) {
        return getBudget(srdNpc)
    },
    Heroic: function (srdNpc) {
        if (srdNpc.Class) {
            return parseClass(srdNpc.Class).Heroic;
        }
        else {
            return false;
        }
    },
    Classes: function (srdNpc) {
        if (srdNpc.Class) {
            return parseClass(srdNpc.Class).Classes;
        }
    },
    Level: function (srdNpc) {
        if (srdNpc.Class) {
            return parseClass(srdNpc.Class).Level;
        }
    }
}

function getBudget(srdNpc) {
    var budget;
    var parenthesis = srdNpc.Treasure.indexOf('(');
    if (parenthesis !== -1) {
        budget = srdNpc.Treasure.slice(0, parenthesis).trim().toLowerCase();
    } else {
        budget = srdNpc.Treasure.trim().toLowerCase();
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
        console.log("[WARNING] unknown treasure budget '" + srdNpc.Treasure + "' for npc " + srdNpc.Name)
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

function parseAttributeFromSrdNpc(element, regex) {
    if (!element.text()) {
        return "";
    }
    var match = regex.exec(element.parent().text());
    if (!match) {
        return "";
    }
    return match[1];
}

function getSRDNpcVisualDescription(npc, $) {
    var element = $("div > h3 > i");
    return element.text();
}

function getSRDNpcSpecialAbilities(npc, $) {
    var element = $("div:contains(SPECIAL ABILITIES)");
    return element.next().next().html();
}

function getSRDNpcDescription(npc, $) {
    function get(div) {
        var element = $("div").eq(div).children().first();
        return element.html();
    }

    var kyleDescription = getKyleNpcByID(npc.id).Description;
    if (kyleDescription == undefined) {
        console.log("[WARNING] no Kyle Npc '" + npc.Name + "' => guessing description at div 14 !");
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


function cleanupSRDNpc(srdNpc, $) {
    var npc = {};
    for (var i in NPC_ATTRIBUTES) {
        var attribute = NPC_ATTRIBUTES[i];
        var attributeFilter = ATTRIBUTE_FILTERS[attribute];
        if (attributeFilter) {
            npc[attribute] = attributeFilter(srdNpc, $);
        } else {
            npc[attribute] = srdNpc[attribute].trim();
        }
        if (npc[attribute] === '') {
            delete npc[attribute];
        }
    }
    return npc;
}

var npcs = [];
var npcNameCount = {};

for (var i in chopswil_npcs) {
    console.log(i + " / " + chopswil_npcs.length);
    var $ = cheerio.load(chopswil_npcs[i].FullText);

    var cleanedUpNpc = cleanupSRDNpc(chopswil_npcs[i], $);
    npcs.push(cleanedUpNpc);
    if (npcNameCount[cleanedUpNpc.Name.toLowerCase()] !== undefined) {
        npcNameCount[cleanedUpNpc.Name.toLowerCase()]++;
        console.log("[WARNING] : " + cleanedUpNpc.Name.toLowerCase() + " occurs at least " + npcNameCount[cleanedUpNpc.Name.toLowerCase()] + " times");
    } else {
        npcNameCount[cleanedUpNpc.Name.toLowerCase()] = 1;
    }

}

console.log();

for (var name in npcNameCount) {
    if (npcNameCount[name] > 1) {
        console.log("[WARNING] : " + name + " occurs " + npcNameCount[name] + " times");
    }
}

fs.writeFileSync('../data/npcs/npcs.json', JSON.stringify(npcs));

console.log("done");
