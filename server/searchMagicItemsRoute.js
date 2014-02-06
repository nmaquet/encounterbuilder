"use strict";

function getFindParams(request) {
    var findParams = {};
    if (request.query.nameSubstring) {
        findParams.Name = new RegExp(request.query.nameSubstring, "i");
    }
    if (request.query.group && request.query.group != 'any') {
        findParams.Group = request.query.group;
    }
    if (request.query.slot && request.query.slot != 'any') {
        findParams.Slot = request.query.slot;
    }
    var minCL = request.query.minCL || 0;
    var maxCL = request.query.maxCL || 20;
    if (minCL != 0 || minCL != 20) {
        findParams.CL = { $gte: minCL, $lte: maxCL};
    }
    return findParams;
}

function getSortOption(request) {
    if (request.query.sortOrder === "cl") {
        return 'CL Price Name';
    } else if (request.query.sortOrder === "price") {
        return 'Price CL Name';
    }
    else {
        return 'Name CL Price';
    }
}

module.exports = function (MagicItem, defaultFindLimit) {
    return function (request, response) {
        var sortOption = getSortOption(request);
        var skip = request.query.skip || 0;
        var findLimit = request.query.findLimit || defaultFindLimit;
        var findParams = getFindParams(request);
        var projection = {Name: true, Price: true, PriceUnit : true, Source: true, id: true};
        var magicItems;
        var count;
        MagicItem.find(findParams, projection).limit(findLimit).sort(sortOption).skip(skip)
            .execFind(function (error, data) {
                magicItems = data;
                if (error) {
                    response.send(error);
                }
                if (count !== undefined) {
                    response.json({count: count, magicItems: magicItems});
                }
            }).count(function (error, value) {
                count = value;
                if (error) {
                    response.send(error);
                }
                if (magicItems !== undefined) {
                    response.json({count: count, magicItems: magicItems});
                }
            });
    }
}

