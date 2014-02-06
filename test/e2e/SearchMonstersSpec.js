'use strict';

describe('Search Monsters', function () {

    angular.scenario.dsl('keyboard', function () {
        var chain = {};
        chain.keydown = function (selector, keyEvent, keyCode, shift, ctrl) {
            return this.addFutureAction("keyEvent", function ($window, $document, done) {
                var jQuery = $window.$;
                var e = jQuery.Event(keyEvent);
                e.keyCode = keyCode; // # Some key code value
                e.altKey = false;
                e.ctrlKey = ctrl;
                e.shiftKey = shift;
                if (selector == null) selector = '*:focus';
                var j = jQuery(selector);
                if (j == null) j = jQuery('body');
                j.trigger(e);
                done();
            });
        };
        return function () {
            return chain;
        };
    });

    function inputNameSubstring(text) {
        input('nameSubstring').enter(text);
    }

    beforeEach(function(){
        browser().navigateTo('/');
    });

    it('should allow login', function () {
        expect(browser().location().path()).toBe('/login');
        input("username").enter("test");
        input("password").enter("test");
        element("#login-button").click();
        expect(browser().location().path()).toBe('/');
    });

    it('should initially display 50 monsters', function () {
        expect(repeater('tr.monster-row').count()).toBe(50);
    });

    it('should display 3 monsters when searching for "dog"', function () {
        inputNameSubstring('dog');
        expect(repeater('tr.monster-row').count()).toBe(3);
    });

    it('should display 8 monsters when searching for "fire"', function () {
        inputNameSubstring('fire');
        expect(repeater('tr.monster-row').count()).toBe(8);
    });

    it('should sort by challenge rating by default', function () {
        expect(input('orderProp').val()).toBe("cr");
    });

    it('should allow to sort by name', function () {
        select('orderProp').option('name');
        expect(input('orderProp').val()).toBe("name");
    });

    it('should sort by challenge rating when order is challenge rating', function () {
        inputNameSubstring('lizard');
        select('orderProp').option('cr');
        expect(repeater('tr.monster-row').count()).toBe(5);
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Lizard");
        expect(element('tr.monster-row:nth-child(2) td:nth-child(1) p').text()).toBe("Lizardfolk");
        expect(element('tr.monster-row:nth-child(3) td:nth-child(1) p').text()).toBe("Monitor Lizard");
        expect(element('tr.monster-row:nth-child(4) td:nth-child(1) p').text()).toBe("Shocker Lizard");
        expect(element('tr.monster-row:nth-child(5) td:nth-child(1) p').text()).toBe("Giant Frilled Lizard");
    });

    it('should sort by name when order is name', function () {
        inputNameSubstring('lizard');
        select('orderProp').option('name');
        expect(repeater('tr.monster-row').count()).toBe(5);
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Giant Frilled Lizard");
        expect(element('tr.monster-row:nth-child(2) td:nth-child(1) p').text()).toBe("Lizard");
        expect(element('tr.monster-row:nth-child(3) td:nth-child(1) p').text()).toBe("Lizardfolk");
        expect(element('tr.monster-row:nth-child(4) td:nth-child(1) p').text()).toBe("Monitor Lizard");
        expect(element('tr.monster-row:nth-child(5) td:nth-child(1) p').text()).toBe("Shocker Lizard");
    });

    it('should display the challenge rating of each monster', function () {
        inputNameSubstring('lizard');
        select('orderProp').option('cr');
        expect(repeater('tr.monster-row').count()).toBe(5);
        expect(element('tr.monster-row:nth-child(1) td:nth-child(2) p').text()).toBe("1/6");
        expect(element('tr.monster-row:nth-child(2) td:nth-child(2) p').text()).toBe("1");
        expect(element('tr.monster-row:nth-child(3) td:nth-child(2) p').text()).toBe("2");
        expect(element('tr.monster-row:nth-child(4) td:nth-child(2) p').text()).toBe("2");
        expect(element('tr.monster-row:nth-child(5) td:nth-child(2) p').text()).toBe("5");
    });

    it('should display the source of each monster', function () {
        inputNameSubstring('bear');
        expect(element('tr.monster-row:nth-child(1) td:nth-child(3) small').text()).toBe("PB1");
        expect(element('tr.monster-row:nth-child(4) td:nth-child(3) small').text()).toBe("AP 36");
    });

    it('should  display 14 monsters when searching for type "vermin"', function () {
        select('type').option('vermin');
        expect(repeater('tr.monster-row').count()).toBe(14);
    });

    it('should  display 8 monsters when searching for "giant" with type "vermin"', function () {
        inputNameSubstring('giant');
        select('type').option('vermin');
        expect(repeater('tr.monster-row').count()).toBe(8);
    });

    it('should  display 4 monsters when searching for "giant" with type "animal"', function () {
        inputNameSubstring('giant');
        select('type').option('animal');
        expect(repeater('tr.monster-row').count()).toBe(4);
    });

    it('should display 3 pages and 4 arrows when searching for "t"', function () {
        inputNameSubstring('t');
        expect(repeater('.page:visible li').count()).toBe(3 + 4);
    });

    it('should display 1 page and 4 arrows when searching for "ant"', function () {
        inputNameSubstring('ant');
        expect(repeater('.page:visible li').count()).toBe(1 + 4);
    });

    it('should display the correct first monster of each page', function () {
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Bat");
        element("a:contains(2)").click();
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Boggard");
        element("a:contains(3)").click();
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Lion");
        element("a:contains(4)").click();
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Large Fire Elemental");
        element("a:contains(5)").click();
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Efreeti");
        element("a:contains(6)").click();
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Elder Air Elemental");
    });

    it('should have working pagination arrows', function () {
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Bat");
        element("a:contains(›)").click();
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Boggard");
        element("a:contains(»)").click();
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Elder Air Elemental");
        element("a:contains(‹)").click();
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Efreeti");
        element("a:contains(«)").click();
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Bat");
    });

    it('should update the right-side pane when you click on a monster in the search results', function () {
        inputNameSubstring('dragon');
        element('tr.monster-row:nth-child(1) td').click();
        expect(element('h2:visible').text()).toBe("Pseudodragon");
        element('tr.monster-row:nth-child(2) td').click();
        expect(element('h2:visible').text()).toBe("Young White Dragon");
    });

    it('should initially fill the monster detail pane with the first monster', function () {
        expect(element('h2:visible').text()).toBe("Bat");
    });

    it('should have a working slider', function () {
        var LEFT = 37, RIGHT = 39;
        element('#slider-cr-range > a:nth-child(2)').click();
        expect(element('#cr-range').val()).toBe("0 - 40");
        keyboard().keydown('#slider-cr-range > a:nth-child(2)', 'keydown', RIGHT, false, false);
        keyboard().keydown('#slider-cr-range > a:nth-child(2)', 'keydown', RIGHT, false, false);
        expect(element('#cr-range').val()).toBe("2 - 40");
        element('#slider-cr-range > a:nth-child(3)').click();
        keyboard().keydown('#slider-cr-range > a:nth-child(3)', 'keydown', LEFT, false, false);
        keyboard().keydown('#slider-cr-range > a:nth-child(3)', 'keydown', LEFT, false, false);
        expect(element('#cr-range').val()).toBe("2 - 38");
    });

    it('should allow logout', function () {
        expect(browser().location().path()).toBe('/');
        element("#user-dropdown").click();
        element("#user-dropdown-logout").click();
        sleep(0.1); /* necessary to wait for page reload... ugly, I know */
        expect(browser().location().path()).toBe('/login');
    });
});