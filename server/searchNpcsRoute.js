"use strict";

var escapeRegExp = require('./utils')().escapeRegExp;
var async = require('async');

var CLASS_QUERIES = {
    default: function (request) {
        return { $elemMatch: {Class: { $regex: "^" + request.query.class } } };
    },
    wizard: function (request) {
        var wizards = [
            "wizard",
            "illusionist",
            "conjurer",
            "necromancer",
            "diviner",
            "evoker",
            "abjurer",
            "transmuter",
            "enchanter",
            "earth elementalist wizard",
            "air elementalist wizard",
            "fire elementalist wizard",
            "water elementalist wizard"
        ];
        return  { $elemMatch: {Class: { $regex: "^(" + wizards.join("|") + ")" } } };
    },
    exable: function (request) {
        return { $elemMatch: {Class: { $regex: "^(ex-){0,1}" + request.query.class + ".*" } } };
    },
    paladin: function (request) {
        return CLASS_QUERIES.exable(request);
    },
    druid: function (request) {
        return CLASS_QUERIES.exable(request);
    },
    cleric: function (request) {
        return CLASS_QUERIES.exable(request);
    },
    inquisitor: function (request) {
        return CLASS_QUERIES.exable(request);
    },
    antipaladin: function (request) {
        return CLASS_QUERIES.exable(request);
    }
}

function getQuery(request) {
    var query = {};
    if (request.query.nameSubstring) {
        query.Name = new RegExp(escapeRegExp(request.query.nameSubstring), "i");
    }
    if (request.query.class && request.query.class !== 'any') {
        var classQuery = CLASS_QUERIES[request.query.class] || CLASS_QUERIES.default;
        query.Classes = classQuery(request);
    }
    var minCR = Number(request.query.minCR || 0);
    var maxCR = Number(request.query.maxCR || 40);
    if (minCR != 0 || maxCR != 40) {
        query.CR = { $gte: minCR, $lte: maxCR};
    }
    return query;
}

function getSortOption(request) {
    if (request.query.sortBy === "cr") {
        return ['CR', 'Name'];
    } else {
        return ['Name', 'CR'];
    }
}

module.exports = function (npcsCollection, defaultFindLimit) {
    return function (request, response) {
        var query = getQuery(request);
        var npcs;
        var count;

        var options = {
            fields: {Name: 1, CR: 1, XP: 1, id: 1, Source: 1, Type: 1, Heroic: 1, Level: 1},
            limit: Number(request.query.findLimit || defaultFindLimit),
            skip: Number(request.query.skip || 0),
            sort: getSortOption(request)
        }

        async.parallel([
            function (callback) {
                npcsCollection.find(query, options).toArray(function (error, npcs) {
                    if (error) {
                        callback(error, null);
                    }
                    else {
                        callback(null, npcs);
                    }
                });
            },
            function (callback) {
                npcsCollection.count(query, function (error, count) {
                    if (error) {
                        callback(error, null);
                    }
                    else {
                        callback(null, count);
                    }
                });
            }
        ],
            function (error, results) {
                if (error) {
                    console.log(error);
                    response.send(500);
                }
                else {
                    response.json({npcs: results[0], count: results[1]});
                }
            }
        );
    }
}

