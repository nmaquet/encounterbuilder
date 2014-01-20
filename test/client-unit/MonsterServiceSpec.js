"use strict";

var expect = chai.expect;

var $httpBackend, monsterService;

describe("MonsterService", function () {

    beforeEach(module("encounterBuilderApp"));

    beforeEach(inject(function (_$httpBackend_, _monsterService_) {
        $httpBackend = _$httpBackend_;
        monsterService = _monsterService_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    describe("MonsterService.search", function () {

        it("should call the user callback with result data if successful", function () {
            var monsters = ["a", "b", "c"];
            var response;
            monsterService.search({nameSubstring: "hobgob", order: "name"}, function (error, data) {
                response = data;
            });
            $httpBackend.expectGET("/api/search-monsters/?nameSubstring=hobgob&order=name").respond(200, monsters);
            $httpBackend.flush();
            expect(response).to.deep.equal(monsters);
        });

        it("should call the user callback with an an error on error", function () {
            var monsters = ["a", "b", "c"];
            var response;
            monsterService.search({nameSubstring: "hobgob", order: "name"}, function (error, data) {
                response = error;
            });
            $httpBackend.expectGET("/api/search-monsters/?nameSubstring=hobgob&order=name").respond(404, "ALL YOUR BASE");
            $httpBackend.flush();
            expect(response).to.equal("ALL YOUR BASE");
        });

    });

    describe("MonsterService.get", function () {

        it("should call the user callback with result data if successful", function () {
            var monster = ["HOBGOBLIN"];
            var response;
            monsterService.get("hobgoblin", function (error, data) {
                response = data;
            });
            $httpBackend.expectGET("/api/monster/hobgoblin").respond(200, monster);
            $httpBackend.flush();
            expect(response).to.equal("HOBGOBLIN");
        });

        it("should call the user callback with an an error on error", function () {
            var monster = {};
            var response;
            monsterService.get("hobgoblin", function (error, data) {
                response = error;
            });
            $httpBackend.expectGET("/api/monster/hobgoblin").respond(404, "KILL IT WITH FIRE");
            $httpBackend.flush();
            expect(response).to.equal("KILL IT WITH FIRE");
        });

    });
});