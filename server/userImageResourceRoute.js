// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";
var fs = require('fs');
var Binary = require('mongodb').Binary;
var s3Service = require('./s3Service')();

module.exports = function (collection, ObjectID) {

    var route = require('./userResourceRoute')(collection, null, ObjectID);

    var originalCreate = route.createResource;

    function createImageResouce(request, response) {
        var userResourceId = request.body.userResourceId;
        if (!userResourceId) {
            return originalCreate(request, response);
        }
        else {
            var sessionUserId = request.user._id;
            var query = {_id: ObjectID(userResourceId), userId: ObjectID(sessionUserId)};
            collection.findOne(query, {id: 0, _id: 0}, function (error, baseResource) {
                if (error) {
                    return response.send(500);
                }
                if (!baseResource) {
                    return response.send(404);
                }
                baseResource.userId = ObjectID(sessionUserId);
                baseResource.lastModified = new Date().toISOString();
                collection.insert(baseResource, function (error, newResourceArray) {
                    if (error) {
                        response.send(500);
                    }
                    else {
                        var newResource = newResourceArray[0];
                        s3Service.copyInS3(userResourceId, newResource._id.toString());
                        collection.update({_id: newResource._id}, {$set: {url: s3Service.getResourceURL(newResource._id)}}, function (error) {
                            if (error) {
                                console.log(error);
                            }
                            response.setHeader("Location", request.path + "/" + newResource._id);
                            response.status(201).json(newResource);
                        });

                    }
                });
            });
        }
    }

    route.createResource = createImageResouce;
    route.deleteResource = function (request, response) {
        var sessionUserId = request.user._id;
        var paramsResourceId = request.params.id;
        collection.remove({_id: ObjectID(paramsResourceId), userId: ObjectID(sessionUserId)}, function (error, numberOfRemovedDocs) {
            if (error) {
                return response.send(500)
            }
            else {
                if (numberOfRemovedDocs === 0) {
                    return response.json({});
                }
                s3Service.removeFromS3(paramsResourceId, function (error) {
                    if (error) {
                        console.log(error);
                        console.log("ERROR object:" + paramsResourceId + " wasn't deleted from S3");
                    }
                    return response.json({});
                });
            }
        });
    };

    var wrappedUpdateResource = route.updateResource;

    route.updateResource = function (request, response) {
        var id = request.params.id;
        var fileType = request.body.fileType;
        if (!request.body.s3Credentials) {
            request.body.s3Credentials = s3Service.createS3Credentials(id, fileType);
        }
        return wrappedUpdateResource(request, response);
    };

    return route;
};

