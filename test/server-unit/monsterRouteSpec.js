"use strict";

var expect = require("chai").expect;

var Monster, request, response, monster, monsterRoute;

describe("monsterRoute", function () {

    beforeEach(function() {

        Monster = {
            find: function (params, callback) {
                this.find.params = params;
                this.find.callback = callback;
            }
        }

        request = {
            params: {
                id: "goblin"
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

        monsterRoute = require('../../server/monsterRoute')(Monster);
    });

    it("should find the monster using the supplied id", function () {
        monsterRoute(request, response);
        expect(Monster.find.params).to.deep.equal({id: "goblin"});
    });

    it("should send the JSON of the found monster", function () {
        var error = null;
        monsterRoute(request, response);
        Monster.find.callback(error, monster);
        expect(response.json.object).to.equal(monster);
    });

    it("should send the error in case of an error", function () {
        var error = "EXTERMINATE!";
        monsterRoute(request, response);
        Monster.find.callback(error, monster);
        expect(response.send.data).to.equal(error);
    });

});