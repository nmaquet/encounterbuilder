'use strict';

DEMONSQUID.encounterBuilderServices.factory('UserFeatResource', ['$resource',
    function ($resource) {
        var actions = {
            'get': {method: 'GET'},
            'save': {method: 'POST'},
            'remove': {method: 'DELETE'},
            'delete': {method: 'DELETE'}
        };
        var resource = window.U = $resource("/api/user-feat/:id", {id: '@_id'}, actions);
        resource.copy = function(featId) {
            var userFeat = new UserFeatResource();
            userFeat.$save({featId: featId});
            return userFeat;
        };
        return resource;
    }
]);