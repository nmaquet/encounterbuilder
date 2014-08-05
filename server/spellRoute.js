// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

module.exports = function (spellCollection) {
    return function (request, response) {
        spellCollection.findOne({id: request.params.id}, function (error, spell) {
            if (error) {
                response.json({error: error});
            }
            else {
                response.json({spell: spell});
            }
        });
    }
}
;

