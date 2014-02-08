"use strict";

var expect = chai.expect;

var $httpBackend, encounterService;

describe("EncounterService", function () {

    beforeEach(module("encounterBuilderApp"));

    beforeEach(inject(function (_$httpBackend_, _encounterService_) {
        $httpBackend = _$httpBackend_;
        encounterService = _encounterService_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe("encounterService.remove", function () {

        it("should POST to the remove-encounter API", function () {
            var encounter = {};
            var response = {};
            encounterService.remove(encounter);
            $httpBackend.expectPOST("/api/remove-encounter", {encounter : encounter}).respond(200, response);
            $httpBackend.flush();
        });

    });

    describe("encounterService.upsert", function () {

        it("should POST the upsert-encounter API", function () {
            var encounter = {};
            var response = {};
            encounterService.upsert(encounter);
            $httpBackend.expectPOST("/api/upsert-encounter", {encounter : encounter}).respond(200, response);
            $httpBackend.flush();
        });

        it("should assign the _id in response to the encounter", function () {
            var encounter = {};
            var response = { _id : "012345"};
            encounterService.upsert(encounter);
            $httpBackend.expectPOST("/api/upsert-encounter", {encounter : encounter}).respond(200, response);
            $httpBackend.flush();
            expect(encounter._id).to.equal(response._id);
        });

    });
});