"use strict";

var expect = require('chai').expect;

var defaultRoute = require('../../server/defaultRoute')();

describe("defaultRoute", function () {

    it("should send the index.html file", function () {
        var request = {};
        var response = { sendfile: function (url) {
            expect(url).to.equal("client/index.html");
        }};
        defaultRoute(request, response);
    });

});
