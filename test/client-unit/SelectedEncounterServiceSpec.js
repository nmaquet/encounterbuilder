"use strict";

var expect = chai.expect;

var service;

describe("selectedEncounterService", function () {

    beforeEach(module("encounterBuilderApp"));

    beforeEach(inject(function (_selectedEncounterService_) {
        service = _selectedEncounterService_;
    }));

    it("should initially have an undefined selected encounter", function () {
        expect(service.selectedEncounter()).to.equal(undefined);
    });

    it("should return the last selected encounter when asked", function () {
        service.selectedEncounter("Skeleton Folly");
        service.selectedEncounter("Goblin Rage");
        expect(service.selectedEncounter()).to.equal("Goblin Rage");
    });

    it("should call registered callback functions when the selected encounter changes", function () {
        var called = false;
        service.register(function() {
            called = true;
        });
        service.selectedEncounter("Goblin Rage");
        expect(called).to.equal(true);
    });

});