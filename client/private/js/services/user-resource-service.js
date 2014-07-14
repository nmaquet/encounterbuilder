'use strict';

DEMONSQUID.encounterBuilderServices.factory('userResourceService',
    [ 'UserFeatResource', 'UserSpellResource', 'UserItemResource', 'UserIllustrationResource', function (r1, r2, r3,r4)
{
    return {
        "user-feat": r1,
        "user-spell": r2,
        "user-item": r3,
        "user-illustration": r4
    }
}
]
)
;