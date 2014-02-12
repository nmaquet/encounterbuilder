"use strict";

function getQuery(request) {
    var query = {};
    if (request.query.nameSubstring) {
        query.Name = new RegExp(request.query.nameSubstring, "i");
    }
    if (request.query.type && request.query.type != 'any') {
        query.Type = request.query.type;
    }
    var minCR = Number(request.query.minCR || 0);
    var maxCR = Number(request.query.maxCR || 40);
    if (minCR != 0 || maxCR != 40) {
        query.CR = { $gte: minCR, $lte: maxCR};
    }
    return query;
}

function getSortOption(request) {
    if (request.query.order === "cr") {
        return ['CR', 'Name'];
    } else {
        return ['Name', 'CR'];
    }
}

module.exports = function (monsterCollection, defaultFindLimit) {
    return function (request, response) {
        var query = getQuery(request);
        var monsters;
        var count;

        var options = {
            fields: {Name: 1, CR: 1, XP: 1, id: 1, Source: 1, TreasureBudget: 1, Type: 1, Heroic : 1, Level: 1},
            limit: Number(request.query.findLimit || defaultFindLimit),
            skip: Number(request.query.skip || 0),
            sort: getSortOption(request)
        }

        monsterCollection.find(query, options).toArray(function (error, data) {
            monsters = data;
            if (error) {
                response.json({error: error});
            }
            if (count !== undefined) {
                response.json({count: count, monsters: monsters});
            }
        });

        monsterCollection.count(query, function (error, value) {
            count = value;
            if (error) {
                response.json({error: error});
            }
            if (monsters !== undefined) {
                response.json({count: count, monsters: monsters});
            }
        });
    }
}

