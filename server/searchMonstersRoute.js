"use strict";

module.exports = function (Monster, FIND_LIMIT) {
    return function (request, response) {
        var sortOption;
        if (request.query.order === "cr") {
            sortOption = 'cr name';
        } else {
            sortOption = 'name cr';
        }
        var findParams = {name: new RegExp(request.query.nameSubstring, "i")};
        Monster.find(findParams).limit(FIND_LIMIT).sort(sortOption).execFind(function (error, monster) {
            if (error)
                response.send(error);

            response.json(monster);
        });
    }
}

