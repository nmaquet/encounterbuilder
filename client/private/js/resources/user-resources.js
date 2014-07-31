'use strict';

(function () {

    function makeUserResource(resourceSlug, $resource) {
        var resource = $resource("/api/" + resourceSlug + "/:id", {id: '@_id'}, {
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

})();

