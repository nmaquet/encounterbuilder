"use strict";
var fs = require('fs');
var Binary = require('mongodb').Binary;

module.exports = function (collection, ObjectID) {

    function update(request, response) {
        var sessionUserId = request.session.user._id;
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

    var route = require('./userResourceRoute')(collection, null, ObjectID);

    route.uploadImage = function (request, response) {
        var sessionUserId = request.session.user._id;
        var paramsResourceId = request.params.id;
        var file = request.files.file;
        var selector = {_id: ObjectID(paramsResourceId), userId: ObjectID(sessionUserId)};

            var fields = {
                imagePath: file.path,
                fileType: file.type,
                fileName: file.originalFilename,
                url: "/api/user-illustration-image/" + paramsResourceId
            };
            collection.findAndModify(selector, [], {$set: fields}, {new: true}, function (error, modifiedResource) {
                if (error) {
                    return  response.send(500);
                }
                else {
                    delete modifiedResource.image;
                    response.json(modifiedResource);
                }
            });
    };

    route.getImage = function (request, response) {
        var sessionUserId = request.session.user._id;
        var paramsResourceId = request.params.id;

        collection.findOne({_id: ObjectID(paramsResourceId), userId: ObjectID(sessionUserId)}, {imagePath: 1, fileType: 1, fileName: 1}, function (error, data) {
            if (error) {
                return response.send(500);
            }
            response.header("Content-Type", data.fileType);
            return response.sendfile(data.imagePath);
        });
    };

    return route;
};

