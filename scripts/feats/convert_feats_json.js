// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

(function () {

    var fs = require("fs");
    var cheerio = require("cheerio");

    var fakeMongoose = {model: function () {
    }};

    var srdFeats = require("../../data/feats/feats_srd.json");
    var FEAT_ATTRIBUTES = require('./featModel')(fakeMongoose).FEAT_ATTRIBUTES;
    var FEAT_MODEL = require('./featModel')(fakeMongoose).FEAT_MODEL;

    var ATTRIBUTE_FILTERS = {
    }

    function cleanupSRDFeat(srdFeat, $) {
        var feat = {};
        for (var i in FEAT_ATTRIBUTES) {
            var attribute = FEAT_ATTRIBUTES[i];
            var attributeFilter = ATTRIBUTE_FILTERS[attribute];
            if (attributeFilter) {
                feat[attribute] = attributeFilter(srdFeat, $);
            } else if (FEAT_MODEL[attribute] === Boolean) {
                feat[attribute] = srdFeat[attribute] === "1";
            }
            else if (FEAT_MODEL[attribute] === Number) {
                feat[attribute] = (srdFeat[attribute] === "NULL") ? 0 : Number(srdFeat[attribute]);
            }
            else {
                feat[attribute] = srdFeat[attribute];
            }
            if (feat[attribute] === '') {
                delete feat[attribute];
            }
            if (typeof feat[attribute] === "string") {
                feat[attribute] = srdFeat[attribute].trim();
            }
        }
        if (feat.type === "Monster, Combat") {
            feat.type = "Monster";
        }
        if (feat.grit) {
            feat.type = "Grit";
        }
        delete feat.id;
        return feat;
    }

    var feats = [];
    var featNameCount = {};

    for (var i in srdFeats) {
        console.log(i + " / " + srdFeats.length);
        var $ = cheerio.load(srdFeats[i].FullText);

        var cleanedUpFeat = cleanupSRDFeat(srdFeats[i], $);
        feats.push(cleanedUpFeat);
        if (featNameCount[cleanedUpFeat.name.toLowerCase()] !== undefined) {
            featNameCount[cleanedUpFeat.name.toLowerCase()]++;
            console.log("[WARNING] : " + cleanedUpFeat.name.toLowerCase() + " occurs at least " + featNameCount[cleanedUpFeat.name.toLowerCase()] + " times");
        } else {
            featNameCount[cleanedUpFeat.name.toLowerCase()] = 1;
        }

    }

    console.log();

    for (var name in featNameCount) {
        if (featNameCount[name] > 1) {
            console.log("[WARNING] : " + name + " occurs " + featNameCount[name] + " times");
        }
    }

    fs.writeFileSync('../../data/feats/feats.json', JSON.stringify(feats, null, 4));

    console.log("done");

})();