"use strict";

module.exports = function (MagicItem) {
    return function (request, response) {
        MagicItem.find({id: request.params.id}, function (error, magicItem) {
            if (error)
                response.send(error);
            response.json(magicItem);
        });
    }
};

