// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

module.exports = function (userCollection, baseCollection, ObjectID) {

    function createEmptyResource (request, response) {
        var sessionUserId = request.user._id;
        var resource = request.body || {};
        delete resource._id;
        resource.userId = ObjectID(sessionUserId);
        userCollection.insert(resource, function (error, newResourceArray) {
            if (error) {
                response.json(500);
            }
            else {
                response.json(newResourceArray[0]);
            }
        });
    }

    function createCopyResource(request, response) {
        var baseResourceId = request.body.baseResourceId;
        var userResourceId = request.body.userResourceId;
        var sessionUserId = request.user._id;
        var sourceCollection, query;
        if (baseResourceId) {
            sourceCollection = baseCollection;
            query =  {id: baseResourceId};
        }
        else {
            sourceCollection = userCollection;
            query =  {_id: ObjectID(userResourceId), userId: ObjectID(sessionUserId)};
        }
        sourceCollection.findOne(query, {id: 0, _id: 0}, function (error, baseResource) {
            if (error) {
                return response.send(500);
            }
            if (!baseResource) {
                return response.send(404);
            }
            baseResource.userId = ObjectID(sessionUserId);
            userCollection.insert(baseResource, function (error, userResources) {
                if (error) {
                    response.send(500);
                }
                else {
                    response.json(userResources[0]);
                }
            });
        });
    }

    return {
        getResource: function (request, response) {
            var sessionUserId = request.user._id;
            var paramsResourceId = request.params.id;
            userCollection.findOne({_id: ObjectID(paramsResourceId), userId: ObjectID(sessionUserId)}, function (error, resource) {
                if (error) {
                    response.send(404);
                }
                else {
                    response.json(resource);
                }
            });
        },
        updateResource: function (request, response) {
            var sessionUserId = request.user._id;
            var paramsResourceId = request.params.id;
            var resource = request.body;
            delete resource._id;
            resource.userId = ObjectID(sessionUserId);
            var selector = {_id: ObjectID(paramsResourceId), userId: ObjectID(sessionUserId)};
            userCollection.findAndModify(selector, [], resource, {new:true}, function (error, modifiedResource) {
                if (error) {
                    response.send(500);
                }
                else {
                    response.json(modifiedResource);
                }
            });
        },
        createResource: function(request, response) {
            var baseResourceId = request.body.baseResourceId;
            var userResourceId = request.body.userResourceId;
            if (!baseResourceId && !userResourceId) {
                return createEmptyResource(request, response);
            }
            else if (baseResourceId && userResourceId) {
                return response.send(401);
            }
            else {
                return createCopyResource(request, response);
            }
        },
        deleteResource: function (request, response) {
            var sessionUserId = request.user._id;
            var paramsResourceId = request.params.id;
            userCollection.remove({_id: ObjectID(paramsResourceId), userId: ObjectID(sessionUserId)}, function (error) {
                if (error) {
                    response.send(500)
                }
                else {
                    response.json({});
                }
            });
        }
    };
};

