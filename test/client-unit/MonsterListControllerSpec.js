"use strict";

var expect = chai.expect;

var $scope, $controller, monsterService;

describe("MonsterListController", function () {

    beforeEach(module("encounterBuilderApp"));

    beforeEach(inject(function ($rootScope, _$controller_) {
        $scope = $rootScope.$new();
        $controller = _$controller_;
        monsterService = {
            search: function (params, callback) {
                this.search.params = params;
                this.search.callback = callback;
                return this;
            },
            get: function (id, callback) {
                this.get.id = id;
                this.get.callback = callback;
                return this;
            }
        };
    }));

    function instantiateController() {
        $controller('MonsterListController', {$scope: $scope, monsterService: monsterService});
    }

    it("should initialize the name substring to the empty string", function () {
        instantiateController();
        expect($scope.nameSubstring).to.equal("");
    });

    it("should initialize the sort order to *challenge rating*", function () {
        instantiateController();
        expect($scope.orderProp).to.equal("cr");
    });

    it("should put a refreshMonsters() function in the scope", function () {
        instantiateController();
        expect(typeof $scope.refreshMonsters).to.equal("function");
    });

    it("should initially refresh the list of monsters a first time", function () {
        var monsters = ["1", "2", "3"];
        instantiateController();
        $scope.$apply();
        /* force angular to resolve the $watchCollection */
        var params = {nameSubstring: "", order: "cr", type: "any", skip:0, findLimit:50};
        expect(monsterService.search.params).to.deep.equal(params);
        monsterService.search.callback(null, {monsters: monsters, timestamp: 1000, count:42});
        expect($scope.monsters).to.equal(monsters);
    });
});