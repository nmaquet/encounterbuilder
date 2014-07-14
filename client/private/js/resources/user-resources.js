'use strict';

(function(){

    /* a client resource contains methods starting with '$' that we need to remove before putting in the cache */
    function clientToServerResource(clientResource) {
        var serverResource = {};
        for (var key in clientResource) {
            if (clientResource.hasOwnProperty(key) && key.charAt(0) !== '$') {
                serverResource[key] = clientResource[key];
            }
        }
        return serverResource;
    }

    /* $resource is too stupid to update the cache by itself on $save() and $delete(), so we must help it :( */
    function makeUserResource(resourceSlug, $resource, $cacheFactory) {
        var cache = $cacheFactory('UserResource-' + resourceSlug);
        var actions = {
            'get': {method: 'GET', cache: cache},
            'save': {method: 'POST'},
            'delete': {method: 'DELETE'}
        };
        var resource = $resource("/api/" + resourceSlug + "/:id", {id: '@_id'}, actions);
        var wrappedSave = resource.prototype.$save;
        var wrappedDelete = resource.prototype.$delete;
        resource.prototype.$save = function() {
            cache.put("/api/" + resourceSlug + "/" + this._id, clientToServerResource(this));
            wrappedSave.apply(this, arguments);
        };
        resource.prototype.$delete = function() {
            cache.remove("/api/" + resourceSlug + "/" + this._id);
            wrappedDelete.apply(this, arguments);
        };
        return  resource;
    }

    DEMONSQUID.encounterBuilderServices.factory('UserFeatResource', ['$resource', '$cacheFactory',
        function ($resource, $cacheFactory) {
            return makeUserResource("user-feat", $resource, $cacheFactory);
        }
    ]);

})();

