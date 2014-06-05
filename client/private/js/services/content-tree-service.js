'use strict';

DEMONSQUID.encounterBuilderServices.factory('contentTreeService', ['$rootScope', '$timeout', '$http', 'encounterService',
    function ($rootScope, $timeout, $http, encounterService) {

        var NEW_ENCOUNTER = 'newEncounter';
        var NEW_BINDER = 'newBinder';
        var BINDER_CHANGED = 'binderChanged';
        var REMOVE_BINDER = 'removeBinder';
        var LOAD_SUCCESS = "contentTreeLoaded";

        var service = {};
        var contentTree = null;

        var fancyTree = null;

        $http.post('/api/user-data')
            .success(function (userData) {
                if (userData.contentTree) {
                    contentTree = userData.contentTree;
                }
                $rootScope.$emit(LOAD_SUCCESS);
            })
            .error(function (error) {
                console.log(error);
                $window.location.href = '/';
            });

        service.setTree = function (tree) {
            fancyTree = tree;
        };

        service.getBinderByKey = function (key) {
            var node = fancyTree.getNodeByKey(key);
            return {Name: node.title, nodeKey: node.key, descendantCount: node.countChildren(true)};

        };

        service.onLoadSuccess = function (callback) {
            $rootScope.$on(LOAD_SUCCESS, callback);
        };

        service.contentTree = function () {
            return contentTree;
        };

        service.newEncounter = function (encounter) {
            $rootScope.$emit(NEW_ENCOUNTER, encounter);
        };

        service.newBinder = function (encounter) {
            $rootScope.$emit(NEW_BINDER, encounter);
        };

        service.register = function (callbacks) {
            $rootScope.$on(NEW_ENCOUNTER, callbacks[NEW_ENCOUNTER]);
            $rootScope.$on(NEW_BINDER, callbacks[NEW_BINDER]);
            $rootScope.$on(BINDER_CHANGED, callbacks[BINDER_CHANGED]);
            $rootScope.$on(REMOVE_BINDER, callbacks[REMOVE_BINDER]);
        };

        service.binderChanged = function (binder) {
            $rootScope.$emit(BINDER_CHANGED, binder);
        };

        service.removeBinder = function (binder) {
            $rootScope.$emit(REMOVE_BINDER, binder);
        };

        service.treeChanged = function (tree) {
            contentTree = tree;
            $http.post('/api/save-content-tree', { contentTree: tree })
                .success(function (data) {
                })
                .error(function (error) {
                    console.log(error);
                });
        };

        service.getBinderChildrenByKey = function (key, callback) {
            var children = fancyTree.getNodeByKey(key).getChildren();
            var ids = [];
            for (var i in children) {
                if (children[i].data.encounterId) {
                    ids.push(children[i].data.encounterId);
                }
            }
            encounterService.getMultiple(ids, function (error, encounters) {
                if (error) {
                    console.log(error);
                }
                else {
                    var enrichedLeaves = [];
                    for (var j in children) {
                        if (children[j].folder) {
                            enrichedLeaves.push({Name: children[j].title, nodeKey: children[j].key, descendantCount: children[j].countChildren(true), type: "binder"})
                        }
                        else if (children[j].data.encounterId) {
                            for (var k in encounters) {
                                if (encounters[k]._id === children[j].data.encounterId) {
                                    enrichedLeaves.push(encounters[k]);
                                    break;
                                }
                            }

                        }
                    }
                    callback(enrichedLeaves);
                }
            });
        };

        return service;
    }]);
