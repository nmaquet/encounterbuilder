// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

(function () {

    var fs = require("fs");
    var cheerio = require("cheerio");

    var fakeMongoose = {model: function () {
    }};

    var srdSpells = require("../../data/spells/srd-spells.json");
    var SPELL_ATTRIBUTES = require('./spellModel')(fakeMongoose).SPELL_ATTRIBUTES;
    var SPELL_MODEL = require('./spellModel')(fakeMongoose).SPELL_MODEL;

    var ATTRIBUTE_FILTERS = {
        classes: function (srdSpell) {
            var classes = [];
            var srdClasses = {
                "sor": "sorcerer",
                "wiz": "wizard",
                "cleric": "cleric",
                "druid": "druid",
                "ranger": "ranger",
                "bard": "bard",
                "paladin": "paladin",
                "alchemist": "alchemist",
                "summoner": "summoner",
                "witch": "witch",
                "inquisitor": "inquisitor",
                "oracle": "oracle",
                "antipaladin": "antipaladin",
                "magus": "magus",
                "adept": "adept"}
            var names = Object.getOwnPropertyNames(srdClasses);
            for (var i in names) {
                if (srdSpell[names[i]] !== "NULL") {
                    classes.push({class: srdClasses[names[i]], level: Number(srdSpell[names[i]])});
                }
            }
            return classes;
        }
    }

    function cleanupSRDSpell(srdSpell, $) {
        var spell = {};
        for (var i in SPELL_ATTRIBUTES) {
            var attribute = SPELL_ATTRIBUTES[i];
            var attributeFilter = ATTRIBUTE_FILTERS[attribute];
            if (attributeFilter) {
                spell[attribute] = attributeFilter(srdSpell, $);
            } else if (SPELL_MODEL[attribute] === Boolean) {
                spell[attribute] = srdSpell[attribute] === "1";
            }
            else if (SPELL_MODEL[attribute] === Number) {
                spell[attribute] = (srdSpell[attribute] === "NULL") ? 0 : Number(srdSpell[attribute]);
            }
            else {
                spell[attribute] = srdSpell[attribute];
            }
            if (spell[attribute] === '') {
                delete spell[attribute];
            }
            if (typeof spell[attribute] === "string") {
                spell[attribute] = srdSpell[attribute].trim();
            }
        }
        delete spell.id;
        return spell;
    }

    var spells = [];
    var spellNameCount = {};

    for (var i in srdSpells) {
        console.log(i + " / " + srdSpells.length);
        var $ = cheerio.load(srdSpells[i].FullText);

        var cleanedUpSpell = cleanupSRDSpell(srdSpells[i], $);
        spells.push(cleanedUpSpell);
        if (spellNameCount[cleanedUpSpell.name.toLowerCase()] !== undefined) {
            spellNameCount[cleanedUpSpell.name.toLowerCase()]++;
            console.log("[WARNING] : " + cleanedUpSpell.name.toLowerCase() + " occurs at least " + spellNameCount[cleanedUpSpell.name.toLowerCase()] + " times");
        } else {
            spellNameCount[cleanedUpSpell.name.toLowerCase()] = 1;
        }

    }

    console.log();

    for (var name in spellNameCount) {
        if (spellNameCount[name] > 1) {
            console.log("[WARNING] : " + name + " occurs " + spellNameCount[name] + " times");
        }
    }

    fs.writeFileSync('../../data/spells/spells.json', JSON.stringify(spells, null, 4));

    console.log("done");

})();