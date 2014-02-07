"use strict";

module.exports = function (db) {
    return function (request, response) {
        db.collection('magicitems').findOne({id: request.params.id}, function (error, data) {
            if (error) {
                response.json({error: error});
            }
            else {
                response.json({magicItem: data});
            }
        });
    }
};

