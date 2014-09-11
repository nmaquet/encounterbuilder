// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderServices.factory('userResourceService',
    [ 'UserFeatResource', 'UserSpellResource', 'UserItemResource', 'UserIllustrationResource', 'UserMapResource', 'ChronicleResource', 'UserMonsterResource', function () {
        return {
            "user-feat": arguments[0],
            "user-spell": arguments[1],
            "user-item": arguments[2],
            "user-illustration": arguments[3],
            "user-map": arguments[4],
            "chronicle": arguments[5],
            "user-monster": arguments[6]
        }
    }]
);