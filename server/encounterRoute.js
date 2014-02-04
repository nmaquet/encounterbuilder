"use strict";

module.exports = function (Encounter) {
    return function (request, response) {
        console.log(request);
        response.json({});
    }
};