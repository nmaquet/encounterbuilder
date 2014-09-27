// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderServices.factory('contentTreeService', function () {

    var service = {};

    service.hasFirstNode = angular.noop;
    service.goToFirstNode = angular.noop;
    service.getBinderByKey = angular.noop;
    service.createBinder = angular.noop;
    service.binderChanged = angular.noop;
    service.removeBinder = angular.noop;
    service.createEncounter = angular.noop;
    service.createUserResource = angular.noop;
    service.copyResource = angular.noop;
    service.copyUserResource = angular.noop;
    service.removeEncounter = angular.noop;
    service.changeEncounter = angular.noop;
    service.userResourceUpdated = angular.noop;
    service.userResourceDeleted = angular.noop;
    service.getBinderChildrenByKey = angular.noop;

    return service;
});

