"use strict";

var expect = require("chai").expect;

var mock, monstersResetRoute;

describe("monstersResetRoute", function () {

    beforeEach(function() {
        mock = require("./mock")();
        monstersResetRoute = require('../../server/monstersResetRoute')(mock.Monster);
    });

    it("should start by deleting everything from the DB", function() {
        monstersResetRoute(mock.request, mock.response);
        expect(mock.Monster.remove.params).to.deep.equal({});
    });

    it("should send the error if the remove fails", function() {
        var error = "KILL IT WITH FIRE";
        monstersResetRoute(mock.request, mock.response);
        mock.Monster.remove.callback(error);
        expect(mock.response.send.data).to.equal(error);
    });
       
});