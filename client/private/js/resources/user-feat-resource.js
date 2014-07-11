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
        resource.copy = function(id, userCreated) {
            var userFeat = new UserFeatResource();
            userFeat.$save(userCreated ? {userFeatId: id}: {featId: id});
            return userFeat;
        };
        return resource;
    }
]);