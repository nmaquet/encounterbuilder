'use strict';

DEMONSQUID.encounterBuilderServices.factory('UserFeatResource', ['$resource',
    function ($resource) {
        function copy(id, idAttributeName) {
            var userFeat = new UserFeatResource();
            var query = {};
            query[idAttributeName] = id;
            userFeat.$save(query);
            return userFeat;
        }
        var actions = {
            'get': {method: 'GET'},
            'save': {method: 'POST'},
            'remove': {method: 'DELETE'},
            'delete': {method: 'DELETE'}
        };
        var resource = window.U = $resource("/api/user-feat/:id", {id: '@_id'}, actions);
        resource.copyFeat = function(id) {
            return copy(id, "featId");
        };
        resource.copyUserFeat = function(id) {
            return copy(id, "userFeatId");
        };
        return resource;
    }
]);