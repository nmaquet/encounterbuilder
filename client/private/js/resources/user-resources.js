// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

(function () {

    function makeUserResource(resourceSlug, $resource) {
        var resource = $resource("/api/" + resourceSlug + "/:id", {id: '@_id'}, {
            'getNoCache' : {method: 'GET', headers: {"Cache-Control": "no-cache"}},
            'get': {method: 'GET'},
            'save': {method: 'POST'},
            'delete': {method: 'DELETE'}
        });
        resource.getMultiple = function (ids, callback) {
            function pushTask(id) {
                tasks.push(function (taskCallback) {
                    resource.get({id: id}, function (data) {
                        taskCallback(null, data)
                    }, function (error) {
                        taskCallback(error, null)
                    });
                });
            }

            var tasks = [];
            for (var i in ids) {
                pushTask(ids[i]);
            }
            window.async.parallel(tasks, callback);
        };
        return resource

    }

    function makeChronicleResource($resource) {
        var resource = $resource("/api/chronicle/:id", {id: '@_id'}, {
            'get': {method: 'GET'},
            'save': {method: 'POST'},
            'query': {method: 'GET', isArray: true},
            'delete': {method: 'DELETE'}
        });
        return resource

    }

    DEMONSQUID.encounterBuilderServices.factory('UserFeatResource', ['$resource', function ($resource) {
        return makeUserResource("user-feat", $resource);
    }]);

    DEMONSQUID.encounterBuilderServices.factory('UserSpellResource', ['$resource', function ($resource) {
        return makeUserResource("user-spell", $resource);
    }]);

    DEMONSQUID.encounterBuilderServices.factory('UserItemResource', ['$resource', function ($resource) {
        return makeUserResource("user-item", $resource);
    }]);

    DEMONSQUID.encounterBuilderServices.factory('UserIllustrationResource', ['$resource', function ($resource) {
        return makeUserResource("user-illustration", $resource);
    }]);

    DEMONSQUID.encounterBuilderServices.factory('UserMapResource', ['$resource', function ($resource) {
        return makeUserResource("user-map", $resource);
    }]);

    DEMONSQUID.encounterBuilderServices.factory('ChronicleResource', ['$resource', function ($resource) {
        return makeChronicleResource($resource);
    }]);

    DEMONSQUID.encounterBuilderServices.factory('UserMonsterResource', ['$resource', function ($resource) {
        return makeUserResource("user-monster", $resource);
    }]);
    DEMONSQUID.encounterBuilderServices.factory('UserNpcResource', ['$resource', function ($resource) {
        return makeUserResource("user-npc", $resource);
    }]);
})();

