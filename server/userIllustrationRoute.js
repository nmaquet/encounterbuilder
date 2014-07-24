"use strict";
var fs = require('fs');
var Binary = require('mongodb').Binary;
var s3Service = require('./s3Service')();

module.exports = function (collection, ObjectID) {

    var route = require('./userResourceRoute')(collection, null, ObjectID);

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
                        console.log("ERROR object:" + paramsResourceId + " wasn't deleted from S3");
                        return response.send(500);
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
        if (request.body.s3Credentials) {
            request.body.url = s3Service.getResourceURL(id) + "?" + new Date().getTime();
            delete request.body.s3Credentials;
        } else {
            request.body.s3Credentials = s3Service.createS3Credentials(id, fileType);
            delete request.body.url;
        }
        return wrappedUpdateResource(request, response);
    };

    return route;
};

