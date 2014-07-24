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
        var paramsResourceId = request.params.id;
        if (paramsResourceId && request.body.fileType) {
            request.body.s3Credentials = s3Service.createS3Credentials(paramsResourceId, request.body.fileType);
            request.body.url = s3Service.getResourceURL(paramsResourceId) + "?" + new Date().getTime();
        }
        return wrappedUpdateResource(request, response);
    };

    return route;
};

