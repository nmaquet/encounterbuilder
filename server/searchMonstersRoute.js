"use strict";

function getFindParams(request) {
    var findParams = {};
    if (request.query.nameSubstring) {
        findParams.Name = new RegExp(request.query.nameSubstring, "i");
    }
    if (request.query.type && request.query.type != 'any') {
        findParams.Type = request.query.type;
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
        var projection = {Name: true, CR: true, id: true};
        var monsters;
        var count;
        Monster.find(findParams, projection).limit(findLimit).sort(sortOption).skip(skip)
            .execFind(function (error, data) {
                monsters = data;
                if (error) {
                    response.send(error);
                }
                if (count) {
                    response.json({count: count, monsters: monsters});
                }
            }).count(function (error, value) {
                count = value;
                if (error) {
                    response.send(error);
                }
                if (monsters) {
                    response.json({count: count, monsters: monsters});
                }
            });
    }
}

