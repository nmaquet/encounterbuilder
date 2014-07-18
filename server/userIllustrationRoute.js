"use strict";
var fs = require('fs');
var Binary = require('mongodb').Binary;
var s3Service = require('./s3Service')();

module.exports = function (collection, ObjectID) {

    var route = require('./userResourceRoute')(collection, null, ObjectID);

    route.deleteResource = function (request, response) {
        var sessionUserId = request.session.user._id;
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

    route.uploadImage = function (request, response) {
        if (!request.body.fileType || !request.body.fileName) {
            return response.send(400);
        }
        var sessionUserId = request.session.user._id;
        var paramsResourceId = request.params.id;
        var selector = {_id: ObjectID(paramsResourceId), userId: ObjectID(sessionUserId)};
        var fields = {
            fileType: request.body.fileType,
            fileName: request.body.fileName,
            url: s3Service.getResourceURL(paramsResourceId) + "?" + new Date().getTime()
        };
        collection.findAndModify(selector, [], {$set: fields}, {new: true}, function (error, modifiedResource) {
            if (error) {
                return  response.send(500);
            }
            else {
                response.json(s3Service.createS3Credentials(paramsResourceId, request.body.fileType));
            }
        });
    };

    return route;
};

