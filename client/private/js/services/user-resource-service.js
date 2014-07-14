'use strict';

DEMONSQUID.encounterBuilderServices.factory('userResourceService',
    [ 'UserFeatResource', 'UserSpellResource', 'UserItemResource', function (r1, r2, r3) {
        return {
            "user-feat": r1,
            "user-spell": r2,
            "user-item": r3
        }
    }]
);