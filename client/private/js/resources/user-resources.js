'use strict';

(function(){

    /* a client resource contains methods starting with '$' that we need to remove before serialization */
    function clientToServerResource(clientResource) {
        var serverResource = {};
        for (var key in clientResource) {
            if (clientResource.hasOwnProperty(key) && key.charAt(0) !== '$') {
                serverResource[key] = clientResource[key];
            }
        }
        return serverResource;
    }

    /* $resource is too stupid to update the cache by itself on $save() POST requests, so we must help it :( */
    /* we hook at the $http 'transformRequest' phase, update the cache, and must deal with serialization manually */
    function makeUserResource(resourceSlug, $resource, $cacheFactory) {
        var cache = $cacheFactory('UserResource-' + resourceSlug);
        var actions = {
            'get': {method: 'GET', cache: cache},
            'save': {method: 'POST', transformRequest: function(clientResource) {
                var serverResource = clientToServerResource(clientResource);
                cache.put("/api/" + resourceSlug + "/" + serverResource._id, serverResource);
                return JSON.stringify(serverResource);
            }},
            'remove': {method: 'DELETE'},
            'delete': {method: 'DELETE'}
        };
        return $resource("/api/" + resourceSlug + "/:id", {id: '@_id'}, actions);
    }

    DEMONSQUID.encounterBuilderServices.factory('UserFeatResource', ['$resource', '$cacheFactory',
        function ($resource, $cacheFactory) {
            return makeUserResource("user-feat", $resource, $cacheFactory);
        }
    ]);

})();

