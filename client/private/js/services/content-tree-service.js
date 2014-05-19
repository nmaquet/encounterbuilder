'use strict';

DEMONSQUID.encounterBuilderServices.factory('contentTreeService', ['$rootScope', '$timeout', '$http', 'encounterService', 'selectedEncounterService',
    function ($rootScope, $timeout, $http, encounterService, selectedEncounterService) {

        var NEW_ENCOUNTER = 'newEncounter';
        var NEW_BINDER = 'newBinder';
        var BINDER_CHANGED = 'binderChanged';
        var LEAVES_CHANGED = 'leavesChanged';
        var REMOVE_BINDER = 'removeBinder';
        var LOAD_SUCCESS = "contentTreeLoaded";

        var service = {};
        var contentTree = [];

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

        service.onLeavesChange = function (callback) {
            $rootScope.$on(LEAVES_CHANGED, callback);
        };


        service.binderChanged = function (binder) {
            $rootScope.$emit(BINDER_CHANGED, binder);
        };

        service.removeBinder = function (binder) {
            $rootScope.$emit(REMOVE_BINDER, binder);
        };

        service.treeChanged = function (tree) {
            $http.post('/api/save-content-tree', { contentTree: tree })
                .success(function (data) {
                })
                .error(function (error) {
                    console.log(error);
                });
        };

        service.updateBinderLeaves = function (leaves) {
            var ids = [];
            for (var i in leaves) {
                if (leaves[i].data.encounterId) {
                    ids.push(leaves[i].data.encounterId);
                }
            }
            encounterService.getMultiple(ids, function (error, encounters) {
                if (error) {
                    console.log(error);
                }
                else {
                    $rootScope.$emit(LEAVES_CHANGED, encounters);
                }
            });
        };

        return service;
    }]);
