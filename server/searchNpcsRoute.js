"use strict";
var escapeRegExp = require('./utils')().escapeRegExp;

function getQuery(request) {
    var query = {};
    if (request.query.nameSubstring) {
        query.Name = new RegExp( escapeRegExp(request.query.nameSubstring), "i");
    }
    if (request.query.class && request.query.class !== 'any') {
        query.Classes = { $elemMatch : {Class : request.query.class} };
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
            fields: {Name: 1, CR: 1, XP: 1, id: 1, Source: 1, TreasureBudget: 1, Type: 1, Heroic : 1, Level: 1},
            limit: Number(request.query.findLimit || defaultFindLimit),
            skip: Number(request.query.skip || 0),
            sort: getSortOption(request)
        }

        npcsCollection.find(query, options).toArray(function (error, data) {
            npcs = data;
            if (error) {
                response.json({error: error});
            }
            if (count !== undefined) {
                response.json({count: count, npcs: npcs});
            }
        });

        npcsCollection.count(query, function (error, value) {
            count = value;
            if (error) {
                response.json({error: error});
            }
            if (npcs !== undefined) {
                response.json({count: count, npcs: npcs});
            }
        });
    }
}

