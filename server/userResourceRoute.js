"use strict";

module.exports = function (collection, ObjectID) {

    return {
        getResource: function (request, response) {
            var sessionUserId = request.session.user._id;
            var paramsResourceId = request.params.id;
            collection.findOne({_id: ObjectID(paramsResourceId), userId: ObjectID(sessionUserId)}, function (error, resource) {
                if (error) {
                    response.send(404);
                }
                else {
                    response.json(resource);
                }
            });
        },
        updateResource: function (request, response) {
            var sessionUserId = request.session.user._id;
            var paramsResourceId = request.params.id;
            var resource = request.body;
            delete resource._id;
            resource.userId = ObjectID(sessionUserId);
            var selector = {_id: ObjectID(paramsResourceId), userId: ObjectID(sessionUserId)};
            console.log("updating with");
            console.log(resource);
            console.log(request.body);
            collection.update(selector, resource, {}, function (error) {
                if (error) {
                    response.send(500);
                }
                else {
                    response.send(200);
                }
            });
        },
        createResource: function (request, response) {
            var sessionUserId = request.session.user._id;
            var resource = request.body || {};
            delete resource._id;
            resource.userId = ObjectID(sessionUserId);
            collection.insert(resource, function (error, newResource) {
                if (error) {
                    response.json(500);
                }
                else {
                    response.json(newResource);
                }
            });
        },
        deleteResource: function (request, response) {
            var sessionUserId = request.session.user._id;
            var paramsResourceId = request.params.id;
            collection.remove({_id: ObjectID(paramsResourceId), userId: ObjectID(sessionUserId)}, function (error) {
                if (error) {
                    response.send(500)
                }
                else {
                    response.send(200);
                }
            });
        }
    };
};

