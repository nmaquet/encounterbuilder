'use strict';

(function(){

    function makeUserResource($resource, $cacheFactory) {
        var cache = $cacheFactory('UserFeatResource');
        var actions = {
            'get': {method: 'GET', cache: cache},
            'save': {method: 'POST', transformRequest: function (clientResource) {
                var serverResource = {};
                for (var key in clientResource) {
                    if (clientResource.hasOwnProperty(key) && key.charAt(0) !== '$') {
                        serverResource[key] = clientResource[key];
                    }
                }
                cache.put("/api/user-feat/" + serverResource._id, serverResource);
                return JSON.stringify(serverResource);
            }},
            'remove': {method: 'DELETE'},
            'delete': {method: 'DELETE'}
        };
        return $resource("/api/user-feat/:id", {id: '@_id'}, actions);
    }

    DEMONSQUID.encounterBuilderServices.factory('UserFeatResource', ['$resource', '$cacheFactory',
        function ($resource, $cacheFactory) {
            return makeUserResource($resource, $cacheFactory);
        }
    ]);

})();

