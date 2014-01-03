"use strict";

module.exports = function (Monster) {
    return function (request, response) {
        Monster.find({id: request.params.id}, function (error, monster) {
            if (error)
                response.send(error);

            response.json(monster);
        });
    }
};

