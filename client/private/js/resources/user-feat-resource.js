'use strict';

DEMONSQUID.encounterBuilderServices.factory('UserFeatResource', ['$resource',
    function ($resource) {
//        var actions = {
//            'get': {method: 'GET', options: {cache: true}},
//            'create': {method: 'POST'},
//            'update': {method: 'PUT'},
//            'delete': {method: 'DELETE'}
//        };
        return window.UserFeatResource = $resource("/api/user-feat/:id", {id: '@_id'});
    }
]);