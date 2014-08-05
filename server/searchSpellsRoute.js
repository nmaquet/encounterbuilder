// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var escapeRegExp = require('./utils')().escapeRegExp;
var async = require('async');

function getQuery(request) {
    var query = {};
    if (request.query.nameSubstring) {
        query.name = new RegExp(escapeRegExp(request.query.nameSubstring), "i");
    }
    if (request.query.class && request.query.class !== 'any') {
        query.classes = { $elemMatch: {class: request.query.class} };
    }
    var minLevel = Number(request.query.minLevel || 0);
    var maxLevel = Number(request.query.maxLevel || 9);
    if (minLevel != 0 || maxLevel != 9) {
        query.classes = query.classes || {$elemMatch: {}};
        query.classes.$elemMatch.level = {$gte: minLevel, $lte: maxLevel};
    }
    return query;
}

function getSortOption(request) {
    return ['name'];
}

module.exports = function (spellCollection, defaultFindLimit) {
    return function (request, response) {
        var query = getQuery(request);
        var spells;
        var count;

        var options = {
            fields: {name: 1, id: 1, source: 1, spell_level: 1, _id: 0},
            limit: Number(request.query.findLimit || defaultFindLimit),
            skip: Number(request.query.skip || 0),
            sort: getSortOption(request)
        }

        async.parallel([
            function (callback) {
                spellCollection.find(query, options).toArray(callback);
            },
            function (callback) {
                spellCollection.count(query, callback);
            }
        ],
            function (error, results) {
                if (error) {
                    console.log(error);
                    response.send(500);
                }
                else {
                    response.json({spells: results[0], count: results[1]});
                }
            }
        );
    }
}

