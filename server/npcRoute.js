// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

module.exports = function (npcCollection) {
    return function (request, response) {
        npcCollection.findOne({id: request.params.id}, function (error, npc) {
            if (error) {
                response.json({error: error});
            }
            else {
                response.json({npc: npc});
            }
        });
    }
}
;

