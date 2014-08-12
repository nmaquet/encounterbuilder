// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";
module.exports = function (chroniclesCollection, ObjectID) {
    return {
        fetch: function (request, response) {
            chroniclesCollection.find({userId: ObjectID(request.user._id)}, {fields: {name: 1, contentTree: 1, _id: 1}}).toArray(function (error, data) {
                if (error) {
                    response.json({error: error});
                }
                else {
//                    var chronicle = (data.length > 0) ? data[0].favourites : [];
                    response.json({chronicle: data[0]});
                }
            });
        },
        update: function (request, response) {
            var userId = request.user._id;
            chroniclesCollection.update(
                {_id: ObjectID(request.body.chronicleId),userId:ObjectID(userId)},
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


