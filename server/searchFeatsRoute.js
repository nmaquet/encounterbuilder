"use strict";

var escapeRegExp = require('./utils')().escapeRegExp;
var async = require('async');

function getQuery(request) {
    var query = {};
    if (request.query.nameSubstring) {
        query.name = new RegExp(escapeRegExp(request.query.nameSubstring), "i");
    }
    if (request.query.type && request.query.type != 'any') {
        query.type = request.query.type;
    }
    return query;
}

function getSortOption(request) {
    return ['name'];
}

module.exports = function (featCollection, defaultFindLimit) {
    return function (request, response) {
        var query = getQuery(request);
        var feats;
        var count;

        var options = {
            fields: {name: 1, id: 1, source: 1, _id: 0},
            limit: Number(request.query.findLimit || defaultFindLimit),
            skip: Number(request.query.skip || 0),
            sort: getSortOption(request)
        }

        async.parallel([
            function (callback) {
                featCollection.find(query, options).toArray(callback);
            },
            function (callback) {
                featCollection.count(query, callback);
            }
        ],
            function (error, results) {
                if (error) {
                    console.log(error);
                    response.send(500);
                }
                else {
                    response.json({feats: results[0], count: results[1]});
                }
            }
        );
    }
}

