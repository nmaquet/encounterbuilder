"use strict";

module.exports = function (userFeatCollection, featCollection, ObjectID) {
    var userFeatRoute = require("./userResourceRoute")(userFeatCollection, ObjectID);
    var createEmptyResource = userFeatRoute.createResource;
    userFeatRoute.createResource = function (request, response) {
        var featId = request.query.featId;
        var userFeatId = request.query.userFeatId;
        if (!featId && !userFeatId) {
            return createEmptyResource(request, response);
        }
        if (featId && userFeatId) {
            return response.send(401);
        }
        var sessionUserId = request.session.user._id;
        var originCollection = (featId) ? featCollection : userFeatCollection;
        var query = (featId) ? {id: featId} : {_id: ObjectID(userFeatId), userId: sessionUserId} ;
        originCollection.findOne(query, {id: 0, _id: 0}, function (error, feat) {
            if (error) {
                return response.send(500);
            }
            if (!feat) {
                return response.send(404);
            }
            if (featId) {
                //FIXME this kinda works now but will be messy when user will copy content from other users.
                feat.name = "copy of " + feat.name;
                feat.source = "originally from " + (feat.source || "???") + " and modified by " + request.session.user.username;
            }
            feat.userId = sessionUserId;
            userFeatCollection.insert(feat, function (error, newFeatArray) {
                if (error) {
                    response.send(500);
                }
                else {
                    response.json(newFeatArray[0]);
                }
            });
        });
    };
    return userFeatRoute;
};

