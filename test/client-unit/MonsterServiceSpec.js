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
            var serverResponse = {monsters : ["a", "b", "c"], count:42};
            var serviceResponse;
            monsterService.search({nameSubstring: "hobgob", order: "name"}, function (error, data) {
                serviceResponse = data;
            });
            $httpBackend.expectGET("/api/search-monsters/?nameSubstring=hobgob&order=name").respond(200, serverResponse);
            $httpBackend.flush();
            expect(serviceResponse.monsters).to.deep.equal(serverResponse.monsters);
            expect(serviceResponse.count).to.equal(serverResponse.count);
            expect(serviceResponse.timestamp).to.not.be.undefined;
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
            var monster;
            monsterService.get("hobgoblin", function (err, data) {
                monster = data;
            });
            $httpBackend.expectGET("/api/monster/hobgoblin").respond(200, {error : null, monster : "HOBGOBLIN"});
            $httpBackend.flush();
            expect(monster).to.equal("HOBGOBLIN");
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