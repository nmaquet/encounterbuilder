"use strict";

var expect = require('chai').expect;

var diceService = require('../../server/diceService')();
var knapsackService = require('../../server/knapsackService')();
var service = require('../../server/loot/lootService')(diceService, knapsackService);


describe("lootService", function () {

    describe("service.generateTypeGLoot", function () {

        for (var budgetLowerBound = 0; budgetLowerBound < 1000000; budgetLowerBound += 1000) {

            it("should generate type G loot for budgets " + budgetLowerBound + " to " + (budgetLowerBound + 950), function () {

                for (var budget = budgetLowerBound; budget <= budgetLowerBound + 950; budget += 50) {
                    var loot = service.generateTypeGLoot(budget);

                    expect(loot.coins.pp).to.be.at.least(0);
                    expect(loot.coins.gp).to.be.at.least(0);
                    expect(loot.coins.sp).to.be.at.least(0);
                    expect(loot.coins.cp).to.be.at.least(0);

                    for (var i in loot.items) {
                        var item = loot.items[i];
                        expect(typeof item.Price).to.equal('number');
                        expect(item.PriceUnit).to.equal('gp');
                        expect(typeof item.Name).to.equal('string');
                        expect(typeof item.id).to.equal('string');
                        expect(typeof item.amount).to.equal('number');
                        expect(item.amount).to.be.at.least(1);
                    }
                }
            });
        }
    });

    describe("service.generateTypeELoot", function () {

        for (var budgetLowerBound = 0; budgetLowerBound < 1000000; budgetLowerBound += 1000) {

            it("should generate type E loot for budgets " + budgetLowerBound + " to " + (budgetLowerBound + 950), function () {

                for (var budget = budgetLowerBound; budget <= budgetLowerBound + 950; budget += 50) {
                    var loot = service.generateTypeELoot(budget);

                    expect(loot.coins.pp).to.equal(0);
                    expect(loot.coins.gp).to.equal(0);
                    expect(loot.coins.sp).to.equal(0);
                    expect(loot.coins.cp).to.equal(0);

                    for (var i in loot.items) {
                        var item = loot.items[i];
                        expect(typeof item.Price).to.equal('number');
                        expect(item.PriceUnit).to.equal('gp');
                        expect(typeof item.Name).to.equal('string');
                        expect(typeof item.id).to.equal('string');
                        expect(typeof item.amount).to.equal('number');
                        expect(item.amount).to.be.at.least(1);
                    }
                }
            });
        }
    });

    describe("service.generateTypeDLoot", function () {

        for (var budgetLowerBound = 0; budgetLowerBound < 1000000; budgetLowerBound += 1000) {

            it("should generate type D loot for budgets " + budgetLowerBound + " to " + (budgetLowerBound + 950), function () {

                for (var budget = budgetLowerBound; budget <= budgetLowerBound + 950; budget += 50) {
                    var loot = service.generateTypeDLoot(budget);

                    expect(loot.coins.pp).to.be.at.least(0);
                    expect(loot.coins.gp).to.be.at.least(0);
                    expect(loot.coins.sp).to.be.at.least(0);
                    expect(loot.coins.cp).to.be.at.least(0);

                    for (var i in loot.items) {
                        var item = loot.items[i];
                        expect(typeof item.Price).to.equal('number');
                        expect(item.PriceUnit).to.equal('gp');
                        expect(typeof item.Name).to.equal('string');
                        expect(typeof item.id).to.equal('string');
                        expect(typeof item.amount).to.equal('number');
                        expect(item.amount).to.be.at.least(1);
                    }
                }
            });
        }
    });

    describe("service.generateTypeALoot", function () {

        for (var budgetLowerBound = 0; budgetLowerBound < 1000000; budgetLowerBound += 1000) {

            it("should generate type A loot for budgets " + budgetLowerBound + " to " + (budgetLowerBound + 950), function () {

                for (var budget = budgetLowerBound; budget <= budgetLowerBound + 950; budget += 50) {
                    var loot = service.generateTypeALoot(budget);
                    expect(loot.coins.pp).to.be.at.least(0);
                    expect(loot.coins.gp).to.be.at.least(0);
                    expect(loot.coins.sp).to.be.at.least(0);
                    expect(loot.coins.cp).to.be.at.least(0);
                    expect(loot.items).to.deep.equal([]);
                }
            });
        }
    });

});
