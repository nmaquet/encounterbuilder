// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

module.exports = function (featCollection) {
    return function (request, response) {
        featCollection.findOne({id: request.params.id}, function (error, feat) {
            if (error) {
                response.json({error: error});
            }
            else {
                response.json({feat: feat});
            }
        });
    }
};