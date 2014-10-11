// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

(function () {

    /* three way merge: merge changes a -> b1 with changes a -> b2 */
    /* the result is b2 with all non-conflicting a -> b1 changes merged in */
    /* in case of conflicts, we take b2's property */
    function threeWayMerge(a, b1, b2) {
        var result = angular.copy(b2), key;
        /* first, check for additions a -> b1 */
        for (key in b1) {
            if (b1.hasOwnProperty(key) && !a.hasOwnProperty(key) && !result.hasOwnProperty(key) && key[0] !== "$")
                result[key] = b1[key];
        }
        /* next, check for deletions a -> b1 */
        for (key in a) {
            if (a.hasOwnProperty(key) && !b1.hasOwnProperty(key) && a[key] === result[key] && key[0] !== "$")
                delete result[key];
        }
        /* finally, check for changes a -> b1 */
        for (key in b1) {
            if (b1.hasOwnProperty(key) && a.hasOwnProperty(key) && a[key] === result[key] && key[0] !== "$")
                result[key] = b1[key];
        }
        return result;
    }

    function makeUserResource(resourceSlug, $resource) {
        var resource = $resource("/api/" + resourceSlug + "/:id", {id: '@_id'}, {
            'getNoCache' : {method: 'GET', headers: {"Cache-Control": "no-cache"}},
            'get': {method: 'GET'},
            'query': {method: 'GET', isArray: true},
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
        resource.prototype.$save = function (callback) {
            var beforeSave = angular.copy(this);
            var self = this;
            resource.save(this, function(serverResponse) {
                angular.copy(threeWayMerge(beforeSave, serverResponse, self), self);
                (callback || angular.noop)(self);
            });
        };
        return resource;

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
        return makeUserResource("chronicle",$resource);
    }]);

    DEMONSQUID.encounterBuilderServices.factory('UserMonsterResource', ['$resource', function ($resource) {
        return makeUserResource("user-monster", $resource);
    }]);
    DEMONSQUID.encounterBuilderServices.factory('UserNpcResource', ['$resource', function ($resource) {
        return makeUserResource("user-npc", $resource);
    }]);
    DEMONSQUID.encounterBuilderServices.factory('UserTextResource', ['$resource', function ($resource) {
        return makeUserResource("user-text", $resource);
    }]);
    DEMONSQUID.encounterBuilderServices.factory('EncounterResource', ['$resource', function ($resource) {
        return makeUserResource("encounter", $resource);
    }]);
})();

