"use strict";

var expect = require('chai').expect;

var mock, defaultRoute;

describe("defaultRoute", function () {

    beforeEach(function() {
        mock = require('./mock')();
        defaultRoute = require('../../server/defaultRoute')();
    });

    it("should send the index.html file", function () {
        defaultRoute(mock.request, mock.response);
        expect(mock.response.sendfile.path).to.equal('client/index.html');
    });

});
