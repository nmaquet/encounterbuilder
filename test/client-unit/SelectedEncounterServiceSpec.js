"use strict";

var expect = chai.expect;

var service, rootScope, lastEmittedEvent, lastRegisteredEvent, lastRegisteredCallback;

describe("ItemService", function () {

    beforeEach(module("encounterBuilderApp"));

    beforeEach(inject(function ($injector, _selectedEncounterService_) {
        lastEmittedEvent = null;
        lastRegisteredEvent = null;
        lastRegisteredCallback = null;
        rootScope = $injector.get('$rootScope');
        /* FIXME: this is a hack... maybe use some real spies instead ? */
        rootScope.$emit = function (event) {
            lastEmittedEvent = event;
        }
        rootScope.$on = function (event, callback) {
            lastRegisteredEvent = event;
            lastRegisteredCallback = callback;
        }
        service = _selectedEncounterService_;
    }));

    describe("service.selectedEncounter", function () {

        it("should initiall return undefined", function () {
            expect(service.selectedEncounter()).to.equal(undefined);
        });

        it("should return the last selected encounter when asked", function () {
            service.selectedEncounter("Skeleton Folly");
            service.selectedEncounter("Goblin Rage");
            expect(service.selectedEncounter()).to.equal("Goblin Rage");
        });

        it("should $emit the event when a new selected encounter is set", function () {
            service.selectedEncounter("Goblin Rage");
            expect(lastEmittedEvent).to.equal('selectedEncounterChanged');
        });

    });

    describe("service.register", function () {

        it("should hook the callback to the selectedEncounterChanged event", function () {
            var callback = function() {};
            service.register(callback);
            expect(lastRegisteredEvent).to.equal('selectedEncounterChanged');
            expect(lastRegisteredCallback).to.equal(callback);
        });

    });

});