"use strict";

var expect = require("chai").expect;

var mock, monsterRoute;

describe("monsterRoute", function () {

    beforeEach(function() {
        mock = require("./mock")();
        monsterRoute = require('../../server/monsterRoute')(mock.Monster);
    });

    it("should find the monster using the supplied id", function () {
        mock.request.params = {id : "goblin"};
        monsterRoute(mock.request, mock.response);
        expect(mock.Monster.find.params).to.deep.equal({id: "goblin"});
    });

    it("should send the JSON of the found monster", function () {
        var error = null;
        monsterRoute(mock.request, mock.response);
        mock.Monster.find.callback(error, mock.monster);
        expect(mock.response.json.object).to.equal(mock.monster);
    });

    it("should send the error in case of an error", function () {
        var error = "EXTERMINATE!";
        monsterRoute(mock.request, mock.response);
        mock.Monster.find.callback(error, mock.monster);
        expect(mock.response.send.data).to.equal(error);
    });

});