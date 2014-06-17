'use strict';

DEMONSQUID.encounterBuilderServices.factory('favouriteService', ['$http', function ($http) {
    var favourites = [];
    var fancyTree = null;

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
            fancyTree.rootNode.addNode(newFavourite);
            favourites = fancyTree.toDict();
        },
        removeFavourite: function (id) {
            var toRemove;
            fancyTree.visit(function (node) {
                if (node.data && node.data.id === id) {
                    toRemove = node;
                }
            });
            toRemove.remove();
            favourites = fancyTree.toDict();
        }
    };
}])
;