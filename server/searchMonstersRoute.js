"use strict";

module.exports = function (Monster, FIND_LIMIT) {
    return function (request, response) {
        var sortOption;
        if (request.query.order === "cr") {
            sortOption = 'CR Name';
        } else {
            sortOption = 'Name CR';
        }
        var findParams = {Name: new RegExp(request.query.nameSubstring, "i")};
        Monster.find(findParams).limit(FIND_LIMIT).sort(sortOption).execFind(function (error, monster) {
            if (error)
                response.send(error);

            response.json(monster);
        });
    }
}

