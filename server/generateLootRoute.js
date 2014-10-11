// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

module.exports = function (lootService) {
    return {
        generateLoot: function (request, response) {
            var username = request.user.username;
            var encounter = request.body.encounter;
            var loot = lootService.generateEncounterLoot(encounter, "medium", request.body.options);
            response.json({coins: loot.coins, items:loot.items});
        }
    }
};