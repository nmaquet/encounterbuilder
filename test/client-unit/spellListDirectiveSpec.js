"use strict";

(function () {
    var expect = chai.expect;

    var SPELLS_KNOWN_NOOB_1 = "Spells Barely Known (CL 0) 0 (at will)-detect magic";
    var SPELLS_KNOWN_NOOB_2 = "Spells Almost Known (CL 0) 0 (at will)-ghost sounds";
    var SPELLS_KNOWN_NOOB_3_NO_AT_WILL = "Spells Almost Known (CL 0) 1st (7/day)-alarm 0-ghost sounds";
    var SPELLS_KNOWN_EGARTHIS = "Spells Known (CL 5th) 2nd (5/day)-bull's strength, false life, scorching ray 1st (7/day)-alarm, burning hands (DC 14), color spray (DC 14), mage armor, magic missile 0 (at will)-detect magic, detect poison, mage hand, message, read magic, touch of fatigue (DC 13)";
    var SPELLS_KNOWN_EGARTHIS_WITH_DC_30_COLOR_SPRAY = "Spells Known (CL 5th) 2nd (5/day)-bull's strength, false life, scorching ray 1st (7/day)-alarm, burning hands (DC 14), color spray (DC 30), mage armor, magic missile 0 (at will)-detect magic, detect poison, mage hand, message, read magic, touch of fatigue (DC 13)";
    var SPELLS_KNOWN_CLERIC_NOOB_1 = "Spells Almost Known (CL 0) 0 (at will)-blightD, false lifeD";

    describe("spellList", function () {

        var $rootScope;
        var $compile;

        beforeEach(module("encounterBuilderApp"));

        beforeEach(function () {
            /* this prevents the linkify directive from crashing and blocking the tests */
            module(function ($provide) {
                $provide.factory('spellService', function () {
                    return { spells: function () {
                        return { names: ["foo"] };
                    }};
                });
                $provide.factory('featService', function () {
                    return { feats: function () {
                        return { names: ["foo"] };
                    }};
                });
            });
        });

        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $rootScope = _$rootScope_;
            $compile = _$compile_;
        }));

        function createElement(spellString) {
            var element = angular.element("<spell-list spell-string=\"" + spellString + "\"></spell-list>");
            $compile(element)($rootScope);
            $rootScope.$digest();
            return element;
        }

        it("should produce HTML for nOOb spellcaster 1", function () {
            var element = createElement(SPELLS_KNOWN_NOOB_1);
            expect(element.find(".spell-title").text()).to.equal("Spells Barely Known");
            expect(element.find(".spell-cl").text()).to.equal("(CL 0)");
            expect(element.find("li").length).to.equal(1);
            expect(element.find("li").hasClass("spell-list-item")).to.equal(true);
            expect(element.find("li").text()).to.equal("0 (at will)—detect magic");
        });

        it("should produce HTML for nOOb spellcaster 2", function () {
            var element = createElement(SPELLS_KNOWN_NOOB_2);
            expect(element.find(".spell-title").text()).to.equal("Spells Almost Known");
            expect(element.find(".spell-cl").text()).to.equal("(CL 0)");
            expect(element.find("li").length).to.equal(1);
            expect(element.find("li").hasClass("spell-list-item")).to.equal(true);
            expect(element.find("li").text()).to.equal("0 (at will)—ghost sounds");
        });

        it("should produce HTML for Egarthis", function () {
            var element = createElement(SPELLS_KNOWN_EGARTHIS);
            expect(element.find(".spell-title").text()).to.equal("Spells Known");
            expect(element.find(".spell-cl").text()).to.equal("(CL 5th)");
            expect(element.find("li").length).to.equal(3);
            expect(element.find("li").hasClass("spell-list-item")).to.equal(true);
            expect(element.find("li:nth-child(1)").text()).to.equal("2nd (5/day)—bull's strength, false life, scorching ray");
            expect(element.find("li:nth-child(2)").text()).to.equal("1st (7/day)—alarm, burning hands (DC 14), color spray (DC 14), mage armor, magic missile");
            expect(element.find("li:nth-child(3)").text()).to.equal("0 (at will)—detect magic, detect poison, mage hand, message, read magic, touch of fatigue (DC 13)");
        });

        it("should produce HTML for Egarthis with DC 30 Color Spray", function () {
            var element = createElement(SPELLS_KNOWN_EGARTHIS_WITH_DC_30_COLOR_SPRAY);
            expect(element.find("li:nth-child(1)").text()).to.equal("2nd (5/day)—bull's strength, false life, scorching ray");
            expect(element.find("li:nth-child(2)").text()).to.equal("1st (7/day)—alarm, burning hands (DC 14), color spray (DC 30), mage armor, magic missile");
            expect(element.find("li:nth-child(3)").text()).to.equal("0 (at will)—detect magic, detect poison, mage hand, message, read magic, touch of fatigue (DC 13)");
        });

        it("should produce HTML for Clerics with Domain Spells", function () {
            var element = createElement(SPELLS_KNOWN_CLERIC_NOOB_1);
            expect(element.find("li:nth-child(1)").html()).to.equal('<span class="ng-scope">0 (at will)—blight</span><sup class="ng-scope">D</sup><span class="ng-scope">, false life</span><sup class="ng-scope">D</sup>');
        });

        it("should produce HTML for nOOb spellcaster 3 missing the (at will) part", function () {
            var element = createElement(SPELLS_KNOWN_NOOB_3_NO_AT_WILL);
            expect(element.find("li:nth-child(1)").text()).to.equal("1st (7/day)—alarm");
            expect(element.find("li:nth-child(2)").text()).to.equal("0 (at will)—ghost sounds");
        });
    });
})();