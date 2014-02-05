"use strict";

module.exports = function (MagicItem, defaultFindLimit) {
    return function (request, response) {
        var skip = request.query.skip || 0;
        var findLimit = request.query.findLimit || defaultFindLimit;
        var projection = {Name: true, Price: true, Source: true, id: true};
        var magicItems;
        var count;
        MagicItem.find({}, projection).limit(findLimit).skip(skip)
            .execFind(function (error, data) {
                magicItems = data;
                if (error) {
                    response.send(error);
                }
                if (count) {
                    response.json({count: count, magicItems: magicItems});
                }
            }).count(function (error, value) {
                count = value;
                if (error) {
                    response.send(error);
                }
                if (magicItems) {
                    response.json({count: count, magicItems: magicItems});
                }
            });
    }
}

