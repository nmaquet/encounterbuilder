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

module.exports = function (Monster, FIND_LIMIT) {
    return function (request, response) {
        var sortOption;
        if (request.query.order === "cr") {
            sortOption = 'CR Name';
        } else {
            sortOption = 'Name CR';
        }
        var findParams = getFindParams(request);
        var projection = {Name: true, CR: true, id: true};
        Monster.find(findParams, projection).limit(FIND_LIMIT).sort(sortOption).execFind(function (error, monsters) {
            if (error)
                response.send(error);
            response.json(monsters);
        });
    }
}

