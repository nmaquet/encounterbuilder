"use strict";

module.exports = function (db) {
    return function (request, response) {
        db.collection('magicitems').findOne({id: request.params.id}, function (error, magicItem) {
            if (error) {
                response.json({error: error});
            }
            else {
                response.json({magicItem: magicItem});
            }
        });
    }
};

