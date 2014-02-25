"use strict";


var expect = require('chai').expect;
var service = require('../../server/knapsackService')();

describe("knapsackService", function () {

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
        expect(result).to.deep.equal([5,1,1]);
    });
    it("should return multiples of single value when needed", function () {
        var result = service.knapsack([1,5], 15);
        expect(result).to.deep.equal([5,5,5]);
    });

    it("should work", function () {
        var result = service.knapsack([1,2,5], 17);
        expect(result).to.deep.equal([5,5,5,2]);
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
        expect(result).to.deep.equal([100,100,100, 50, 10]);
    });
});