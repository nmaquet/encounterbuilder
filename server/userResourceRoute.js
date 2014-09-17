// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";
var uuid = require('node-uuid');
module.exports = function (userCollection, baseCollection, ObjectID) {

    function createEmptyResource(request, response) {
        var sessionUserId = request.user._id;
        var resource = request.body || {};
        delete resource._id;
        resource.userId = ObjectID(sessionUserId);
        resource.uuid = uuid.v4();
        console.log(">>>> created resource with uuid=" + resource.uuid);
        userCollection.insert(resource, function (error, newResourceArray) {
            if (error) {
                response.json(500);
            }
            else {
                var newResource = newResourceArray[0];
                response.setHeader("Location", request.path + "/" + newResource._id);
                response.status(201).json(newResource);
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
            query = {id: baseResourceId};
        }
        else {
            sourceCollection = userCollection;
            query = {_id: ObjectID(userResourceId), userId: ObjectID(sessionUserId)};
        }
        sourceCollection.findOne(query, {id: 0, _id: 0}, function (error, baseResource) {
            if (error) {
                return response.send(500);
            }
            if (!baseResource) {
                return response.send(404);
            }
            baseResource.userId = ObjectID(sessionUserId);
            baseResource.uuid = uuid.v4();
            console.log(">>>> created resource with uuid=" + baseResource.uuid);
            userCollection.insert(baseResource, function (error, newResourceArray) {
                if (error) {
                    response.send(500);
                }
                else {
                    var newResource = newResourceArray[0];
                    response.setHeader("Location", request.path + "/" + newResource._id);
                    response.status(201).json(newResource);
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
        query: function (request, response) {
            userCollection.find({userId: ObjectID(request.user._id)}, {fields: {name: 1, _id: 1}}).toArray(function (error, data) {
                if (error) {
                    response.send(404);
                }
                else {
                    response.json(data);
                }
            });
        },
        updateResource: function (request, response) {
            var sessionUserId = request.user._id;
            var paramsResourceId = request.params.id;
            var clientResource = request.body;
            delete clientResource._id;
            clientResource.userId = ObjectID(sessionUserId);
            var selector = {_id: ObjectID(paramsResourceId), userId: ObjectID(sessionUserId)};
            // FIXME: two requests is expensive!
            console.log(">>>> UPDATE " + request.path);
            console.log(">>>> (1) CLIENT uuid=" + clientResource.uuid);
            userCollection.findOne({_id: ObjectID(paramsResourceId), userId: ObjectID(sessionUserId)}, function (error, dbResource) {
                if (dbResource === null) {
                    return response.send(404)
                }
                console.log(">>>> (2)     DB uuid=" + dbResource.uuid);
                if (dbResource.uuid !== clientResource.uuid) {
                    console.log(">>>> (3) 409 conflict !");
                    return response.status(409).json(dbResource);
                }
                clientResource.uuid = uuid.v4();
                console.log(">>>> (3)    NEW uuid=" + clientResource.uuid);
                userCollection.findAndModify(selector, [], clientResource, {new:true}, function (error, modifiedResource) {
                    if (error) {
                        response.send(500);
                    }
                    else {
                        console.log(">>>> (4) update successful\n");
                        response.json(modifiedResource);
                    }
                });
            });
        },
        createResource: function (request, response) {
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

