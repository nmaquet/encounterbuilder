"use strict";


var expect = chai.expect;

var service;

describe("knapsackService", function () {

    beforeEach(module("encounterBuilderApp"));


    beforeEach(inject(function (_knapsackService_) {
        service = _knapsackService_;
    }));

   it("should return values when target equals to existing value", function () {
        var result = service.knapsack([5], 5);
        expect(result).to.deep.equal([5]);
    });

    it("should return single value when target equals to existing value", function () {
        var result = service.knapsack([1,5], 5);
        expect(result).to.deep.equal([5]);
    });

    it("should return multiples of single value when needed", function () {
        var result = service.knapsack([1,5], 4);
        expect(result).to.deep.equal([1,1,1,1]);
    });

    it("should return multiples of single value when needed", function () {
        var result = service.knapsack([1,5], 20);
        expect(result).to.deep.equal([5,5,5,5]);
    });

    it("should return multiples of single value when needed", function () {
        var result = service.knapsack([1,5], 7);
        expect(result).to.deep.equal([1,1,5]);
    });
    it("should return multiples of single value when needed", function () {
        var result = service.knapsack([1,5], 15);
        expect(result).to.deep.equal([5,5,5]);
    });

    it("should work", function () {
        var result = service.knapsack([1,2,5], 17);
        expect(result).to.deep.equal([2,5,5,5]);
    });
    it("should work", function () {
        var result = service.knapsack([1,2,5], 1);
        expect(result).to.deep.equal([1]);
    });

    it("should work", function () {
        var result = service.knapsack([1,2,5],0);
        expect(result).to.deep.equal([]);
    });

    it("should work", function () {
        var result = service.knapsack([2,3],10);
        expect(result).to.deep.equal([3,3,3]);
    });

    it("should work", function () {
        var result = service.knapsack([1,5,10,25,50,100],10);
        expect(result).to.deep.equal([10]);
    });
    
    it("should work", function () {
        var result = service.knapsack([1,5,10,25,50,100],360);
        expect(result).to.deep.equal([10,50,100,100,100]);
    });
});