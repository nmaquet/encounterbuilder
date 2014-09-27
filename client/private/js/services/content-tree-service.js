// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderServices.factory('contentTreeService', function () {

    var service = {};
    var fancyTree = null;

    var currentChronicle = null;

    service.hasFirstNode = function () {
    };

    service.goToFirstNode = function () {
    };

    service.getBinderByKey = function () {
    };

    service.createBinder = function () {
    };

    service.binderChanged = function () {
    };

    service.removeBinder = function () {
    };

    service.createEncounter = function () {
    };

    service.createUserResource = function () {
    };

    service.copyResource = function () {
    };

    service.copyUserResource = function () {
    };

    service.removeEncounter = function () {
    };

    service.changeEncounter = function (encounter) {
        fancyTree.visit(function (node) {
            if (node.data.userResourceId && node.data.userResourceId === encounter._id) {
                if (node.title !== encounter.Name) {
                    node.setTitle(encounter.Name);
                    return false;
                }
                //FIXME this saves every ecounter change to the fancyTree (including monsters and stuffs)
//                        service.treeChanged(fancyTree.toDict(removeExtraClasses));
            }
        });
    };

    service.userResourceUpdated = function (userResource, resourceType) {
        if (resourceType && resourceType === "chronicle") {
            currentChronicle = userResource;
            return;
        }
        fancyTree.visit(function (node) {
            if (node.data.userResourceId && node.data.userResourceId === userResource._id) {
                var name = userResource.name || userResource.Name;
                if (node.title !== name) {
                    node.setTitle(name);
//                            service.treeChanged(fancyTree.toDict(removeExtraClasses));
                }
            }
        });
    };

    service.userResourceDeleted = function () {
    };

    service.getBinderChildrenByKey = function () {
    };

    return service;
});

