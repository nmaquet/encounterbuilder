"use strict";

module.exports = function () {
    return function (request, response) {
            response.sendfile('client/public/index.html');
    }
};