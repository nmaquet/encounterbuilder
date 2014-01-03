"use strict";

var expect = require("chai").expect;

var mock, searchMonstersRoute;

describe("searchMonstersRoute", function () {

    beforeEach(function () {
        mock = require("./mock")();
        searchMonstersRoute = require("../../server/searchMonstersRoute")(mock.Monster, mock.FIND_LIMIT);
    });

    it("should find the monster using the nameSubstring", function () {
        mock.request.query.nameSubstring = "cube"
        searchMonstersRoute(mock.request, mock.response);
        expect(mock.Monster.find.params).to.deep.equal({name: /cube/i});
    });

    it("should limit the find to FIND_LIMIT elements", function () {
        searchMonstersRoute(mock.request, mock.response);
        expect(mock.Monster.limit.value).to.equal(mock.FIND_LIMIT);
    });

    it("should sort by name then challenge rating by default", function () {
        mock.request.query.order = undefined;
        searchMonstersRoute(mock.request, mock.response);
        expect(mock.Monster.sort.options).to.equal("name cr");
    });

    it("should sort by name then challenge rating when asked", function () {
        mock.request.query.order = "name";
        searchMonstersRoute(mock.request, mock.response);
        expect(mock.Monster.sort.options).to.equal("name cr");
    });

    it("should sort by challenge rating then name when asked", function () {
        mock.request.query.order = "cr";
        searchMonstersRoute(mock.request, mock.response);
        expect(mock.Monster.sort.options).to.equal("cr name");
    });

    it("should respond with the monster JSON on success", function () {
        var error = null;
        searchMonstersRoute(mock.request, mock.response);
        mock.Monster.execFind.callback(error, mock.monster);
        expect(mock.response.json.object).to.equal(mock.monster);
    });

    it("should send the error on error", function () {
        var error = "ALL YOUR BASE";
        searchMonstersRoute(mock.request, mock.response);
        mock.Monster.execFind.callback(error, mock.monster);
        expect(mock.response.send.data).to.equal(error);
    });
});
