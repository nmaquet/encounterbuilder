"use strict";

function getFindParams(request) {
    var findParams = {};
    if (request.query.nameSubstring) {
        findParams.Name = new RegExp(request.query.nameSubstring, "i");
    }
    if (request.query.type && request.query.type != 'any') {
        findParams.Type = request.query.type;
    }
    var minCR = request.query.minCR || 0;
    var maxCR = request.query.maxCR || 40;
    if (minCR != 0 || maxCR != 40) {
        findParams.CR = { $gte: minCR, $lte: maxCR};
    }
    return findParams;
}

module.exports = function (Monster, defaultFindLimit) {
    return function (request, response) {
        var sortOption;
        if (request.query.order === "cr") {
            sortOption = 'CR Name';
        } else {
            sortOption = 'Name CR';
        }
        var skip = request.query.skip || 0;
        var findLimit = request.query.findLimit || defaultFindLimit;
        var findParams = getFindParams(request);
        var projection = {Name: true, CR: true, id: true, Source: true};
        var monsters;
        var count;
        Monster.find(findParams, projection).limit(findLimit).sort(sortOption).skip(skip)
            .execFind(function (error, data) {
                monsters = data;
                if (error) {
                    response.send(error);
                }
                if (count !== undefined) {
                    response.json({count: count, monsters: monsters});
                }
            }).count(function (error, value) {
                count = value;
                if (error) {
                    response.send(error);
                }
                if (monsters !== undefined) {
                    response.json({count: count, monsters: monsters});
                }
            });
    }
}

