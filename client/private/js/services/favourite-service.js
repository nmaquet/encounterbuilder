// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderServices.factory('favouriteService', ['$http', '$rootScope', function ($http, $rootScope) {
    var favourites = null;
    var fancyTree = null;
    var typeBinderKeys = {spell: "defaultSpellBinder", monster: "defaultMonsterBinder", npc: "defaultNpcBinder", item: "defaultItemBinder", feat: "defaultFeatBinder"};
    var typeBinderNames = {spell: "Spells", monster: "Monsters", npc: "NPCs", item: "Items", feat: "Feats"};
    var LOAD_SUCCESS = "favouritesLoaded";

    function handleExtraClasses(node) {
        node.extraClasses = "fancytree-" + node.type;
    }

    function removeExtraClasses(dict) {
        if (dict.extraClasses) {
            delete dict.extraClasses;
        }
    }

    $http.get('/api/favourites')
        .success(function (data) {
            if (data.favourites) {
                favourites = data.favourites;
            }
            $rootScope.$emit(LOAD_SUCCESS);
        })
        .error(function (error) {
            console.log(error);
            $window.location.href = '/';
        });

//    $http.get('/api/user-favorites/', {params: {findLimit: 2000}})
//        .success(function (data) {
//            spells = {names: []};
//            for (var i in data.spells) {
//                spells.names.push(data.spells[i].name);
//                spells[data.spells[i].name.toLowerCase()] = data.spells[i].id;
//            }
//            /* we need to have longest names first so that they get matched in priority in the linkify directive */
//            /* e.g. "Accursed Hex" needs to be before "Accursed" */
//            spells.names.sort();
//            spells.names.reverse();
//        });
    return {
        favourites: function () {
            return favourites;
        },
        setTree: function (tree) {
            fancyTree = tree;
        },
        isFavourite: function (id) {
            var favouriteFound = false;
            if (fancyTree) {
                fancyTree.visit(function (node) {
                    if (node.data && node.data.id === id) {
                        favouriteFound = true;
                        return false;// stop visit
                    }
                });
            }
            return favouriteFound;
        },
        addFavourite: function (name, id, type, userContent) {
            var newFavourite = {title: name, id: id, type: type, userContent: userContent};
            handleExtraClasses(newFavourite);
            var node = fancyTree.getNodeByKey(typeBinderKeys[type]);
            if (node === null) {
                var defaultFolder = {title: typeBinderNames[type], folder: true, key: typeBinderKeys[type], acceptedType: type, expanded: true};
                fancyTree.rootNode.addNode(defaultFolder);
                node = fancyTree.getNodeByKey(typeBinderKeys[type]);
            }
            node.addNode(newFavourite);
            node.sortChildren();
            this.treeChanged();
        },
        removeFavourite: function (id) {
            var toRemove;
            fancyTree.visit(function (node) {
                if (node.data && node.data.id === id) {
                    toRemove = node;
                }
            });
            var defaultFolder = fancyTree.getNodeByKey(typeBinderKeys[toRemove.data.type]);
            toRemove.remove();
            if (defaultFolder && !defaultFolder.hasChildren()) {
                defaultFolder.remove();
            }
            this.treeChanged();
        },
        treeChanged: function () {
            favourites = fancyTree.toDict(removeExtraClasses);
            if (favourites && fancyTree) {
                if (fancyTree.count() === 0) {
                    favourites = [];
                }
                $http.post('/api/save-favourites', { favourites: favourites })
                    .success(function (data) {
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            }
        },
        onLoadSuccess: function (callback) {
            $rootScope.$on(LOAD_SUCCESS, callback);
        }

    };
}])
;