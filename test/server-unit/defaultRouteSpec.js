"use strict";

var expect = require('chai').expect;

var mock, defaultRoute;

describe("defaultRoute", function () {

    beforeEach(function() {
        mock = require('./mock')();
        defaultRoute = require('../../server/clientRoutes')().default;
    });

    it("should render the index.jade file", function () {
        defaultRoute(mock.request, mock.response);
        expect(mock.response.render.path).to.equal('../client/private/jade/index.jade');
    });

});
