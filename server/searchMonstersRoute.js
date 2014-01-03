"use strict";

module.exports = function (Monster, FIND_LIMIT) {
    return function (request, response) {
        var sortOption;
        if (request.query.order === "cr") {
            sortOption = 'cr name';
        } else {
            sortOption = 'name cr';
        }
        var findCriteria = {name: new RegExp(request.query.nameSubstring, "i")};
        Monster.find(findCriteria).limit(FIND_LIMIT).sort(sortOption).execFind(function (error, monster) {
            if (error)
                response.send(error);

            response.json(monster);
        });
    }
}

