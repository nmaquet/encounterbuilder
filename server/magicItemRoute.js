"use strict";

module.exports = function (magicitemCollection) {
    return function (request, response) {
        magicitemCollection.findOne({id: request.params.id}, function (error, magicItem) {
            if (error) {
                response.json({error: error});
            }
            else {
                response.json({magicItem: magicItem});
            }
        });
    }
};

