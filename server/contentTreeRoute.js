// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";
module.exports = function (contentTreeCollection) {
    return {
        updateContentTree: function (request, response) {
            var username = request.user.username;
            contentTreeCollection.update(
                {username: username},
                {$set: {contentTree: request.body.contentTree}},
                function (error) {
                    if (error) {
                        response.json({error: error});
                    }
                    else {
                        response.json({});
                    }
                });
        }
    };
};


