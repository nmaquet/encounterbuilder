"use strict";
module.exports = function (contentTreeCollection) {
    return {
        updateContentTree: function (request, response) {
            var username = request.session.user.username;
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


