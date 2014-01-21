"use strict";

function getFindParams(request, field) {
    var findParams = {};
    if (request.query.nameSubstring) {
        findParams[field] = new RegExp(request.query.nameSubstring, "i");
    }
    if (request.query.type && request.query.type != 'any') {
        findParams.Type = request.query.type;
    }
    return findParams;
}

module.exports = function (Monster, FIND_LIMIT, SEARCHABLE_ATTRIBUTES) {
    return function (request, response) {
        var sortOption;
        if (request.query.order === "cr") {
            sortOption = 'CR Name';
        } else {
            sortOption = 'Name CR';
        }
        var projection = {Name: true, CR: true, id: true};

        var monsterList = {};
        var done = false;
        var monsterCount = 0;
        var completedFindCount = 0;
        for (var i in SEARCHABLE_ATTRIBUTES) {
            var field = SEARCHABLE_ATTRIBUTES[i];
            var findParams = getFindParams(request, field);
            Monster.find(findParams, projection).limit(FIND_LIMIT).sort(sortOption).execFind(function (error, monsters) {
                if (done)
                    return;

                if (error)
                    response.send(error);
                monsterList[field] = monsters;
                completedFindCount++;
                monsterCount += monsters.length;

                if (monsterCount>=FIND_LIMIT||completedFindCount===SEARCHABLE_ATTRIBUTES.length){
                    done=true;
                    var results=[];
                    for (var j in SEARCHABLE_ATTRIBUTES){
                       results = results.concat(monsterList[SEARCHABLE_ATTRIBUTES[j]]);
                    }
                    response.json(results.splice(FIND_LIMIT));
                }
            });
        }
    }
}

