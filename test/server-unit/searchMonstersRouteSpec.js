"use strict";

var expect = require("chai").expect;

var Monster, searchMonstersRoute, request, response, monster, FIND_LIMIT;

describe("searchMonstersRoute", function () {

    beforeEach(function () {
        Monster = {
            find: function (criteria) {
                this.find.criteria = criteria;
                return Monster;
            },
            limit: function (value) {
                this.limit.value = value;
                return Monster;
            },
            sort: function (options) {
                this.sort.options = options;
                return Monster;
            },
            execFind: function (callback) {
                this.execFind.callback = callback;
            }
        }

        request = {
            query: {

            }
        };

        response = {
            json: function (object) {
                this.json.object = object;
            },
            send: function(data) {
                this.send.data = data;
            }
        };

        monster = {

        };

        FIND_LIMIT = 666;

        searchMonstersRoute = require("../../server/searchMonstersRoute")(Monster, FIND_LIMIT);
    });

    it("should find the monster using the nameSubstring", function () {
        request.query.nameSubstring = "cube"
        searchMonstersRoute(request, response);
        expect(Monster.find.criteria).to.deep.equal({name: /cube/i});
    });

    it("should limit the find to FIND_LIMIT elements", function () {
        searchMonstersRoute(request, response);
        expect(Monster.limit.value).to.equal(FIND_LIMIT);
    });

    it("should sort by name then challenge rating by default", function () {
        request.query.order = undefined;
        searchMonstersRoute(request, response);
        expect(Monster.sort.options).to.equal("name cr");
    });

    it("should sort by name then challenge rating when asked", function () {
        request.query.order = "name";
        searchMonstersRoute(request, response);
        expect(Monster.sort.options).to.equal("name cr");
    });

    it("should sort by challenge rating then name when asked", function () {
        request.query.order = "cr";
        searchMonstersRoute(request, response);
        expect(Monster.sort.options).to.equal("cr name");
    });

    it("should respond with the monster JSON on success", function () {
        var error = null;
        searchMonstersRoute(request, response);
        Monster.execFind.callback(error, monster);
        expect(response.json.object).to.equal(monster);
    });

    it("should send the error on error", function () {
        var error = "ALL YOUR BASE";
        searchMonstersRoute(request, response);
        Monster.execFind.callback(error, monster);
        expect(response.send.data).to.equal(error);
    });
});
