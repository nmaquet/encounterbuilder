'use strict';

DEMONSQUID.encounterBuilderServices.factory('UserFeatResource', ['$resource',
    function ($resource) {
        function nop() {
        }
        var actions = {
            'get': {method: 'GET'},
            'save': {method: 'POST'},
            'remove': {method: 'DELETE'},
            'delete': {method: 'DELETE'}
        };
        var UserFeatResource = $resource("/api/user-feat/:id", {id: '@_id'}, actions);
        function copy(id, idAttributeName, callback) {
            callback = callback || nop;
            var userFeat = new UserFeatResource();
            var query = {};
            query[idAttributeName] = id;
            userFeat.$save(query).then(callback);
            return userFeat;
        }
        UserFeatResource.copyFeat = function(id, callback) {
            return copy(id, "featId", callback);
        };
        UserFeatResource.copyUserFeat = function(id) {
            return copy(id, "userFeatId", callback);
        };
        return UserFeatResource;
    }
]);