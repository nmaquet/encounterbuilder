"use strict";

var expect = require('chai').expect;

var diceService  = require('../../server/diceService')();
var knapsackService = require('../../server/knapsackService')();
var service  = require('../../server/loot/lootService')(diceService, knapsackService);



describe("lootService", function () {

    describe("service.generateTypeELoot", function () {

        it("should generate loot", function () {


            for (var budget = 0; budget<=1000000; budget ++){

                var loot = service.generateTypeELoot(budget);
                for (var i in loot.items){
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
    });
});