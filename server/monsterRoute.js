"use strict";

module.exports = function (db) {
    return function (request, response) {
        db.collection('monsters').findOne({id: request.params.id}, function (error, monster) {
            if (error) {
                response.json({error: error});
            }
            else {
                response.json({monster: monster});
            }
        });
    }
}
;

