"use strict";

var expect = require('chai').expect;

var mock, defaultRoute;

describe("defaultRoute", function () {

    beforeEach(function() {
        mock = require('./mock')();
        defaultRoute = require('../../server/defaultRoute')();
    });

    it("should send the index.html file when logged in", function () {
        mock.request.session = {user : "King Kong"};
        defaultRoute(mock.request, mock.response);
        expect(mock.response.sendfile.path).to.equal('client/public/index.html');
    });

    it("should redirect to /login when not logged in (no session)", function () {
        mock.request.session = undefined;
        defaultRoute(mock.request, mock.response);
        expect(mock.response.redirect.url).to.equal('/login');
    });

    it("should redirect to /login when not logged in (no user in session)", function () {
        mock.request.session = {};
        defaultRoute(mock.request, mock.response);
        expect(mock.response.redirect.url).to.equal('/login');
    });
});
