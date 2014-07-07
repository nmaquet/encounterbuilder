"use strict";

var expect = require("chai").expect;

var mock, searchMonstersRoute;

describe("searchMonstersRoute", function () {

    beforeEach(function () {
        mock = require("./mock")();
        searchMonstersRoute = require("../../server/searchMonstersRoute")(mock.monsterCollection, mock.userMonsterCollection, mock.FIND_LIMIT);
    });

    it("should find the monster using the nameSubstring", function () {
        mock.request.query.nameSubstring = "cube"
        searchMonstersRoute(mock.request, mock.response);
        expect(mock.monsterCollection.find.query).to.deep.equal({Name: /cube/i});
    });

    it("should limit the find to FIND_LIMIT elements", function () {
        searchMonstersRoute(mock.request, mock.response);
        expect(mock.monsterCollection.find.options.limit).to.equal(mock.FIND_LIMIT);
    });

    it("should sort by name then challenge rating by default", function () {
        mock.request.query.order = undefined;
        searchMonstersRoute(mock.request, mock.response);
        expect(mock.monsterCollection.find.options.sort).to.deep.equal(["Name", "CR"]);
    });

    it("should sort by name then challenge rating when asked", function () {
        mock.request.query.order = "name";
        searchMonstersRoute(mock.request, mock.response);
        expect(mock.monsterCollection.find.options.sort).to.deep.equal(["Name", "CR"]);
    });

    it("should sort by challenge rating then name when asked", function () {
        mock.request.query.order = "cr";
        searchMonstersRoute(mock.request, mock.response);
        expect(mock.monsterCollection.find.options.sort).to.deep.equal(["CR", "Name"]);
    });

    it("should respond with the JSON object with count + monsters on success (first find then count)", function () {
        var error = null;
        var count = 50;
        searchMonstersRoute(mock.request, mock.response);
        mock.monsterCollection.toArray.callback(error, mock.monsterArray);
        mock.monsterCollection.count.callback(error, count);
        expect(mock.response.json.object.monsters).to.deep.equal(mock.monsterArray);
        expect(mock.response.json.object.count).to.equal(count);
    });

    it("should respond with the JSON object with count + monsters on success (first count then find)", function () {
        var error = null;
        var count = 50;
        searchMonstersRoute(mock.request, mock.response);
        mock.monsterCollection.count.callback(error, count);
        mock.monsterCollection.toArray.callback(error, mock.monsterArray);
        expect(mock.response.json.object.monsters).to.deep.equal(mock.monsterArray);
        expect(mock.response.json.object.count).to.equal(count);
    });

    it("should NOT respond with the JSON object with count + monsters when only .find() has finished", function () {
        var error = null;
        var count = 50;
        searchMonstersRoute(mock.request, mock.response);
        mock.monsterCollection.toArray.callback(error, mock.monsterArray);
        expect(mock.response.json.object).to.be.undefined;
    });

    it("should NOT respond with the JSON object with count + monsters when only .count() has finished", function () {
        var error = null;
        var count = 50;
        searchMonstersRoute(mock.request, mock.response);
        mock.monsterCollection.count.callback(error, count);
        expect(mock.response.json.object).to.be.undefined;
    });

    it("should send the error on error", function () {
        var error = "ALL YOUR BASE";
        searchMonstersRoute(mock.request, mock.response);
        mock.monsterCollection.toArray.callback(error, mock.monsterArray);
        expect(mock.response.json.object).to.deep.equal({error : error});
    });

    it("should filter by monster type when asked", function () {
        mock.request.query.type = "humanoid";
        searchMonstersRoute(mock.request, mock.response);
        expect(mock.monsterCollection.find.query).to.deep.equal({Type: "humanoid"});
    });

    it("should be able to filter both by name and type", function () {
        mock.request.query.nameSubstring = "gob";
        mock.request.query.type = "humanoid";
        searchMonstersRoute(mock.request, mock.response);
        expect(mock.monsterCollection.find.query).to.deep.equal({Name: /gob/i, Type: "humanoid"});
    });

    it("should understand type='any' to be any type", function () {
        mock.request.query.nameSubstring = "gob";
        mock.request.query.type = "any";
        searchMonstersRoute(mock.request, mock.response);
        expect(mock.monsterCollection.find.query).to.deep.equal({Name: /gob/i});
    });

    it("should be able to filter by minCR and maxCR", function () {
        mock.request.query.minCR = 12;
        mock.request.query.maxCR = 256;
        searchMonstersRoute(mock.request, mock.response);
        expect(mock.monsterCollection.find.query).to.deep.equal({CR: {$gte: 12, $lte: 256 }});
    });

    it("should be able to filter by minCR only", function () {
        mock.request.query.minCR = 12;
        searchMonstersRoute(mock.request, mock.response);
        expect(mock.monsterCollection.find.query).to.deep.equal({CR: {$gte: 12, $lte: 40 }});
    });

    it("should be able to filter by maxCR only", function () {
        mock.request.query.maxCR = 256;
        searchMonstersRoute(mock.request, mock.response);
        expect(mock.monsterCollection.find.query).to.deep.equal({CR: {$gte: 0, $lte: 256 }});
    });

    it("should not filter by CR when default values are used", function () {
        mock.request.query.nameSubstring = "gob";
        mock.request.query.type = "humanoid";
        mock.request.query.minCR = 0;
        mock.request.query.maxCR = 40;
        searchMonstersRoute(mock.request, mock.response);
        expect(mock.monsterCollection.find.query).to.deep.equal({Name: /gob/i, Type: "humanoid"});
    });
});
