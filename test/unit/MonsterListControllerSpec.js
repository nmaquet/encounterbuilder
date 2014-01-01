"use strict";

function newController($rootScope, $controller) {
    var scope = $rootScope.$new();
    return $controller('MonsterListController', {$scope: scope}), scope;
}

describe("MonsterListController", function() {

    beforeEach(module("encounterBuilderApp"));

    it("should initialize the name substring to the empty string", inject(function($rootScope, $controller) {
        var _, scope = newController($rootScope, $controller);
        expect(scope.query).toBe("");
    }));

    it("should initialize the sort order to *challenge rating*", inject(function($rootScope, $controller) {
        var _, scope = newController($rootScope, $controller);
        expect(scope.orderProp).toBe("cr");
    }));


});