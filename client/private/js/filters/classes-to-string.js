// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderFilters.filter('classesToString', function () {
    return function (classes) {
        if (classes !== undefined) {
            return classes.map(function (cls) {
                return cls.Class + " " + cls.Level
            }).join("/");
        }
    };
});