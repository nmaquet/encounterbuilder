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
        var sessionUserId = request.session.user._id;
        var paramsResourceId = request.params.id;
        var file = request.files.file;
        var selector = {_id: ObjectID(paramsResourceId), userId: ObjectID(sessionUserId)};
        s3Service.uploadToS3(paramsResourceId, file.type, file.path, function (error, data, url) {
            fs.unlink(file.path);
            if (error) {
                console.log(error);
                return response.send(500);
            }
            var fields = {
                imagePath: file.path,
                fileType: file.type,
                fileName: file.originalFilename,
                url: url + "?" + new Date().getTime()
            };
            collection.findAndModify(selector, [], {$set: fields}, {new: true}, function (error, modifiedResource) {
                if (error) {
                    return  response.send(500);
                }
                else {
                    response.json(modifiedResource);
                }
            });
        });
    };

    return route;
};

