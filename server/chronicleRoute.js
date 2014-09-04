// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";
module.exports = function (chroniclesCollection, ObjectID) {
    return {
        fetch: function (request, response) {
            chroniclesCollection.findOne({userId: ObjectID(request.user._id)}, function (error, chronicle) {
                if (error) {
                    response.json({error: error});
                }
                else {
                    response.json(chronicle);
                }
            });
        },
        fetchAll: function (request, response) {
            chroniclesCollection.find({userId: ObjectID(request.user._id)}, {fields: {name: 1, _id: 1}}).toArray(function (error, data) {
                if (error) {
                    response.send(500);
                }
                else {
                    response.json(data);
                }
            });
        },
        update: function (request, response) {
            var userId = request.user._id;
            chroniclesCollection.update(
                {_id: ObjectID(request.params.id), userId: ObjectID(userId)},
                {$set: {contentTree: request.body.contentTree}},
                function (error) {
                    if (error) {
                        response.json({error: error});
                    }
                    else {
                        response.json({});
                    }
                });
        },
        create: function (request, response) {
            var chronicle = {userId: ObjectID(request.user._id), contentTree: [], name: "new Chronicle"};
            chroniclesCollection.insert(chronicle, function (error, newChronicle) {
                if (error) {
                    console.log(error);
                }
                else {
                    response.json({chronicle: newChronicle});
                }
            });
        }
    };
};


