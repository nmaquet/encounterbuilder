"use strict";

var expect = chai.expect;

var $scope, $httpBackend, $controller;

describe("MonsterListController", function () {

    beforeEach(module("encounterBuilderApp"));

    beforeEach(inject(function ($rootScope, _$httpBackend_, _$controller_) {
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;
    }));

    function instantiateController() {
        $controller('MonsterListController', {$scope: $scope, $httpBackend : $httpBackend});
    }

    it("should initialize the name substring to the empty string", function () {
        instantiateController();
        expect($scope.query).to.equal("");
    });

    it("should initialize the sort order to *challenge rating*", function () {
        instantiateController();
        expect($scope.orderProp).to.equal("cr");
    });

    it("should put a refreshMonsters() function in the scope", function () {
        instantiateController();
        expect(typeof $scope.refreshMonsters).to.equal("function");
    });

    it("should refresh the list of monsters", function () {
        $httpBackend.expectGET("/api/search-monsters/?nameSubstring=&order=cr").respond([]);
        instantiateController();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    // FIXME: this unit test is a bit too long
    it("it should watch the scope's query property and refresh the list of monsters automatically", function () {
        var monsters = ["a", "b", "c"];
        instantiateController();
        $httpBackend.expectGET("/api/search-monsters/?nameSubstring=dragon&order=cr").respond(200, monsters);
        $scope.query = "dragon";
        $scope.$apply();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.flush();
        expect($scope.monsters).to.equal(monsters);
    });

    // FIXME: this unit test is a bit too long
    it("it should watch the scope's orderProp property and refresh the list of monsters automatically", function () {
        var monsters = ["a", "b", "c"];
        instantiateController();
        $httpBackend.expectGET("/api/search-monsters/?nameSubstring=&order=name").respond(200, monsters);
        $scope.orderProp = "name";
        $scope.$apply();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.flush();
        expect($scope.monsters).to.equal(monsters);
    });
});