"use strict";

function getQuery(request) {
    var query = {};
    if (request.query.nameSubstring) {
        query.Name = new RegExp(request.query.nameSubstring, "i");
    }
    if (request.query.group && request.query.group != 'any') {
        query.Group = request.query.group;
    }
    if (request.query.slot && request.query.slot != 'any') {
        query.Slot = request.query.slot;
    }
    var minCL = Number(request.query.minCL || 0);
    var maxCL = Number(request.query.maxCL || 20);
    if (minCL != 0 || maxCL != 20) {
        query.CL = { $gte: minCL, $lte: maxCL};
    }
    return query;
}

function getSortOption(request) {
    if (request.query.sortOrder === "cl") {
        return ['CL', 'Price', 'Name'];
    } else if (request.query.sortOrder === "price") {
        return ['Price', 'CL', 'Name'];
    }
    else {
        return ['Name', 'CL' , 'Price'];
    }
}

module.exports = function (magicitemCollection, defaultFindLimit) {
    return function (request, response) {
        var magicItems;
        var count;
        var options = {
            fields: {Name: 1, Price: 1, PriceUnit: 1, Source: 1, id: 1, Derived : 1},
            limit: Number(request.query.findLimit || defaultFindLimit),
            skip: Number(request.query.skip || 0),
            sort: getSortOption(request)
        }
        var query = getQuery(request);
        magicitemCollection.find(query, options).toArray(function (error, data) {
                magicItems = data;
                if (error) {
                    response.json({error:error});
                    return;
                }
                if (count !== undefined) {
                    response.json({count: count, magicItems: magicItems});
                }
            });

        magicitemCollection.count(query, function (error, value) {
            count = value;
            if (error) {
                response.json({error:error});
                return;
            }
            if (magicItems !== undefined) {
                response.json({count: count, magicItems: magicItems});
            }
        });
    }
}

