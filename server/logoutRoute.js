"use strict";

module.exports = function () {
    return function (request, response) {
        request.session.regenerate(function () {
            response.send(200);
        });
    }
};