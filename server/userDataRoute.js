"use strict";


module.exports = function (encounterCollection) {
    return function (request, response) {
        if (request.session && request.session.user) {
            var username = request.session.user.username;
            encounterCollection.find({Username: username}).toArray(function (error, Encounters) {
                if (error)
                    response.send(error);
                var userData = {
                    user: {
                        username: username
                    },
                    Encounters: Encounters
                };
                response.json(userData);
            })
        }
        else {
            response.json({});
        }
    }
};