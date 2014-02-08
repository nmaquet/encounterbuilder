"use strict";

var expect = chai.expect;

var $httpBackend, itemService;

describe("ItemService", function () {

    beforeEach(module("encounterBuilderApp"));

    beforeEach(inject(function (_$httpBackend_, _itemService_) {
        $httpBackend = _$httpBackend_;
        itemService = _itemService_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe("itemService.search", function () {

        it("should GET the search-magic-items API with the given params", function () {
            var params = { "nameSubstring": "veil", "Group" : "head"};
            var response = {};
            itemService.search(params, function() {});
            $httpBackend.expectGET("/api/search-magic-items/?Group=head&nameSubstring=veil").respond(200, response);
            $httpBackend.flush();
        });

        it("should call the user callback with the server response on success", function () {
            var response = ["item1", "item2", "item3"];
            var callbackData;
            itemService.search({}, function(error, serverData) {
                callbackData = serverData;
            });
            $httpBackend.expectGET("/api/search-magic-items/?").respond(200, response);
            $httpBackend.flush();
            expect(callbackData).to.deep.equal(response);
        });

        it("should call the user callback with the server error on error", function () {
            var error = "OH NOES !";
            var callbacError;
            itemService.search({}, function(error, serverData) {
                callbacError = error;
            });
            $httpBackend.expectGET("/api/search-magic-items/?").respond(500, error);
            $httpBackend.flush();
            expect(callbacError).to.equal(error);
        });

    });

    describe("itemService.get", function () {

        it("should GET the magic-item API with the given id", function () {
            var id = "veil-of-broken-death";
            var response = {};
            itemService.get(id, function() {});
            $httpBackend.expectGET("/api/magic-item/veil-of-broken-death").respond(200, response);
            $httpBackend.flush();
        });

        it("should call the user callback with the server response on success", function () {
            var response = {magicItem : { Name : "Veil of Broken Death"}};
            var callbackItem;
            var callbackError;
            itemService.get("veil-of-broken-death", function(error, serverItem) {
                callbackError = error;
                callbackItem = serverItem;
            });
            $httpBackend.expectGET("/api/magic-item/veil-of-broken-death").respond(200, response);
            $httpBackend.flush();
            expect(callbackError).to.equal(null);
            expect(callbackItem).to.deep.equal(response.magicItem);
        });

        it("should call the user callback with the server error on error", function () {
            var response = {error : "SERVER IS SLEEPY"};
            var callbackItem;
            var callbackError;
            itemService.get("veil-of-broken-death", function(error, serverItem) {
                callbackError = error;
                callbackItem = serverItem;
            });
            $httpBackend.expectGET("/api/magic-item/veil-of-broken-death").respond(500, response);
            $httpBackend.flush();
            expect(callbackError).to.equal("SERVER IS SLEEPY");
            expect(callbackItem).to.equal(null);
        });
    });
});