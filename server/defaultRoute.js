"use strict";

module.exports = function () {
    return function (request, response) {
        response.sendfile('../app/index.html');
    }
}