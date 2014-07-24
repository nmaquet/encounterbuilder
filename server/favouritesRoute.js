"use strict";
module.exports = function (favouriteCollection) {
    return {
        fetch: function (request, response) {
            favouriteCollection.find({username: request.user.username}, {fields: {username: 1, favourites: 1, _id: 0}}).toArray(function (error, data) {
                if (error) {
                    response.json({error: error});
                }
                else {
                    console.log(data);
                    var favourites = (data.length > 0) ? data[0].favourites : [];
                    response.json({favourites: favourites});
                }
            });
        },
        update: function (request, response) {
            var username = request.user.username;
            favouriteCollection.update(
                {username: username},
                {$set: {favourites: request.body.favourites}},
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


