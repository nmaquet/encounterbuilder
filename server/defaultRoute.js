"use strict";

module.exports = function () {
    return function (request, response) {
        response.sendfile('client/index.html');
    }
}