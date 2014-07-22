'use strict';

(function () {

    function makeUserResource(resourceSlug, $resource) {
        return $resource("/api/" + resourceSlug + "/:id", {id: '@_id'}, {
            'get': {method: 'GET'},
            'save': {method: 'POST'},
            'delete': {method: 'DELETE'}
        });
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

