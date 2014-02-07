"use strict";

module.exports = function (monsterCollection) {
    return function (request, response) {
        monsterCollection.findOne({id: request.params.id}, function (error, monster) {
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

