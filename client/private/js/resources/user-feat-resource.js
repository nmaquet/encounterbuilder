'use strict';

DEMONSQUID.encounterBuilderServices.factory('UserFeatResource', ['$resource',
    function ($resource) {
        var actions = {
            'get': {method: 'GET'},
            'save': {method: 'POST'},
            'remove': {method: 'DELETE'},
            'delete': {method: 'DELETE'}
        };
        return $resource("/api/user-feat/:id", {id: '@_id'}, actions);
    }
]);