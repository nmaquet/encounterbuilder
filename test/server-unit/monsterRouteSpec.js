// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

var expect = require("chai").expect;

var mock, monsterRoute;

describe("monsterRoute", function () {

    beforeEach(function () {
        mock = require("./mock")();
        monsterRoute = require('../../server/monsterRoute')(mock.monsterCollection);
    });

    it("should find the monster using the supplied id", function () {
        mock.request.params = {id: "goblin"};
        monsterRoute(mock.request, mock.response);
        expect(mock.monsterCollection.findOne.query).to.deep.equal({id: "goblin"});
    });

    it("should send the JSON of the found monster", function () {
        var error = null;
        monsterRoute(mock.request, mock.response);
        mock.monsterCollection.findOne.callback(error, mock.monster);
        expect(mock.response.json.object).to.deep.equal({monster: mock.monster});
    });

    it("should send the error in case of an error", function () {
        var error = "EXTERMINATE!";
        monsterRoute(mock.request, mock.response);
        mock.monsterCollection.findOne.callback(error, mock.monster);
        expect(mock.response.json.object).to.deep.equal({error: error});
    });

});