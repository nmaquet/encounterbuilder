"use strict";

var scope, controller;

describe("MonsterListController", function () {

    beforeEach(module("encounterBuilderApp"));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller('MonsterListController', {$scope: scope});
    }));

    it("should initialize the name substring to the empty string", function () {
        expect(scope.query).toBe("");
    });

    it("should initialize the sort order to *challenge rating*", function () {
        expect(scope.orderProp).toBe("cr");
    });

    it("should put a refreshMonsters() function in the scope", function () {
        expect(typeof scope.refreshMonsters).toBe("function");
    });
});