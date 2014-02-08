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

        it("should POST the given encounter", function () {
            var encounter = {};
            var response = {};
            encounterService.remove(encounter);
            $httpBackend.expectPOST("/api/remove-encounter", {encounter : encounter}).respond(200, response);
            $httpBackend.flush();
        });
    });
});