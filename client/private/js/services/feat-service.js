'use strict';

DEMONSQUID.encounterBuilderServices.factory('featService', ['$http', function ($http) {
    var lastSearchParam = null;
    var lastSearchResults = null;
    var feats = null;
    $http.get('/api/search-feats/', {params: {findLimit: 2000}})
        .success(function (data) {
            feats = {names: []};
            var mythicFeats = {names: []};
            /* first we collect normal feats and mythic feats separately */
            for (var i in data.feats) {
                var feat = data.feats[i];
                if (feat.type === "Mythic") {
                    mythicFeats.names.push(feat.name);
                    mythicFeats[feat.name.toLowerCase()] = feat.id;
                }
                else {
                    feats.names.push(feat.name);
                    feats[feat.name.toLowerCase()] = feat.id;
                }
            }
            /* then we add the mythic feats that DON'T have a normal feat homonym (homonymic mythic feats are handled by the linkify directive) */
            for (var i in mythicFeats.names) {
                var mythicFeatName = mythicFeats.names[i];
                if (!feats[mythicFeatName]) {
                    feats[mythicFeatName] = mythicFeats[mythicFeatName];
                }
            }
            /* we need to have longest names first so that they get matched in priority in the linkify directive */
            /* e.g. "Accursed Hex" needs to be before "Accursed" */
            feats.names.sort();
            feats.names.reverse();
        });
    return {
        lastSearchParam: function(){return lastSearchParam;},
        feats: function () {
            return feats;
        },
        search: function (params, callback) {
            if (lastSearchResults && JSON.stringify(params) === JSON.stringify(lastSearchParam)) {
                callback(null, lastSearchResults);
                return;
            }
            var now = new Date().getTime();
            $http.get('/api/search-feats/', {params: params})
                .success(function (data) {
                    lastSearchParam = params;
                    lastSearchResults = data;
                    data["timestamp"] = now;
                    callback(data.error, data);
                })
                .error(function (error) {
                    callback(error, null);
                });
        },
        get: function (id, callback) {
            $http.get('/api/feat/' + id, {cache: true})
                .success(function (data) {
                    callback(data.error, data.feat);
                })
                .error(function (error) {
                    callback(error, null);
                });
        }
    };
}]);