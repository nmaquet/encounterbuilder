// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var keenIO = require('keen.io');

var keen = keenIO.configure({
    projectId: process.env['KEEN_PROJECT_ID'],
    writeKey: process.env['KEEN_WRITE_KEY']
});

function logUsage(request, response, next) {
    var requestString = request.method.toUpperCase() + " " + request.route.path;
    var params = {
        username: request.user ? request.user.username : null,
        query: request.query,
        request: requestString
    };
    request.route.keys.forEach(function (key) {
        params[key.name] = request.params[key.name];
    });
    keen.addEvent(encodeURIComponent(requestString), params);
    keen.addEvent("all", params);
    next();
}

module.exports = function () {
    return {
        logUsage: logUsage
    }
};