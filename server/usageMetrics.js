// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var keenIO = require('keen.io');

var keen = keenIO.configure({
    projectId: process.env['KEEN_PROJECT_ID'],
    writeKey: process.env['KEEN_WRITE_KEY']
});

function logUsage(request, response, next) {
    var params = { username: request.user ? request.user.username : null, query: request.query };
    request.route.keys.forEach(function (key) {
        params[key.name] = request.params[key.name];
    });
    keen.addEvent(encodeURIComponent(request.method.toUpperCase() + " " + request.route.path), params);
    next();
}

module.exports = function () {
    return {
        logUsage: logUsage
    }
};