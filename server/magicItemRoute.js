"use strict";

module.exports = function (MagicItem) {
    return function (request, response) {
        MagicItem.find({id: request.params.id}, function (error, data) {
            if (error) {
                response.json({error: error});
            }
            else {
                response.json({magicItem: data[0]});
            }
        });
    }
};

