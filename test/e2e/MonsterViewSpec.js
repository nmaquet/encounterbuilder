'use strict';

describe('Monster View', function () {

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

    beforeEach(function () {
        browser().navigateTo('/');
    });

    function inputNameSubstring(text) {
        input('nameSubstring').enter(text);
        sleep(0.5);
        /* wait for setTimeout to trigger */
    }

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
        expect(repeater('.page li').count()).toBe(3 + 4);
    });

    it('should display 1 page and 4 arrows when searching for "ant"', function () {
        inputNameSubstring('ant');
        expect(repeater('.page li').count()).toBe(1 + 4);
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
        expect(element('h2').text()).toBe("Pseudodragon");
        element('tr.monster-row:nth-child(2) td').click();
        expect(element('h2').text()).toBe("Young White Dragon");
    });

    it('should initially fill the monster detail pane with the first monster', function () {
        expect(element('h2').text()).toBe("Bat");
    });

    it('should have a working slider', function () {
        var LEFT = 37, RIGHT = 39;
        element('#slider-range > a:nth-child(2)').click();
        expect(element('#cr-range').val()).toBe("0 - 40");
        keyboard().keydown('#slider-range > a:nth-child(2)', 'keydown', RIGHT, false, false);
        keyboard().keydown('#slider-range > a:nth-child(2)', 'keydown', RIGHT, false, false);
        expect(element('#cr-range').val()).toBe("2 - 40");
        element('#slider-range > a:nth-child(3)').click();
        keyboard().keydown('#slider-range > a:nth-child(3)', 'keydown', LEFT, false, false);
        keyboard().keydown('#slider-range > a:nth-child(3)', 'keydown', LEFT, false, false);
        expect(element('#cr-range').val()).toBe("2 - 38");
    });

    it('should add a first encounter', function () {
        expect(element('a.encounter-dropdown').css("display")).toBe("none");
        expect(element('a.encounter-dropdown-no-encounter').css("display")).not().toBe("none");
        element('a.encounter-dropdown-no-encounter').click();
        element('a.encounter-dropdown-create').click();
        expect(element('a.encounter-dropdown').text()).toBe("Untitled #0 (CR 0)\n ");
        expect(element('a.encounter-dropdown').css("display")).not().toBe("none");
        expect(element('a.encounter-dropdown-no-encounter').css("display")).toBe("none");
    });

    it('should add two Bats to encounter when user clicks on the "plus" button twice in the search results list', function () {
        expect(repeater('li.encounter-monster-row').count()).toBe(0);
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        expect(repeater('li.encounter-monster-row').count()).toBe(1);
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-amount').text()).toBe("2");
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-name').text()).toBe("Bat");
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-cr').text()).toBe("CR 1/8");
    });

    it('should add two Bats to encounter when user clicks enters "2" and on the "plus in the search results list', function () {
        expect(repeater('li.encounter-monster-row').count()).toBe(1);
        using('tr.monster-row:nth-child(1) td:nth-child(4)').input("monster.amountToAdd").enter("2");
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        expect(repeater('li.encounter-monster-row').count()).toBe(1);
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-amount').text()).toBe("4");
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-name').text()).toBe("Bat");
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-cr').text()).toBe("CR 1/8");
    });

    it('should remove all Bats from encounter when user clicks on the remove button', function () {
        expect(repeater('li.encounter-monster-row').count()).toBe(1);
        element('li.encounter-monster-row:nth-child(1) button.remove-monster-btn').click();
        expect(repeater('li.encounter-monster-row').count()).toBe(0);
    });

    it('should remove one Bat from encounter when user clicks on the minus button', function () {
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click()
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click()
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-amount').text()).toBe("4");
        element('li.encounter-monster-row:nth-child(1) button.decrement-monster-btn').click();
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-amount').text()).toBe("3");
    });

    it('should add one Bat from encounter when user clicks on the plus button', function () {
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-amount').text()).toBe("3");
        element('li.encounter-monster-row:nth-child(1) button.increment-monster-btn').click();
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-amount').text()).toBe("4");
    });

    it('should not remove the last Bat from encounter when user clicks on the minus button', function () {
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-amount').text()).toBe("4");
        element('li.encounter-monster-row:nth-child(1) button.decrement-monster-btn').click();
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-amount').text()).toBe("3");
        element('li.encounter-monster-row:nth-child(1) button.decrement-monster-btn').click();
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-amount').text()).toBe("2");
        element('li.encounter-monster-row:nth-child(1) button.decrement-monster-btn').click();
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-amount').text()).toBe("1");
        element('li.encounter-monster-row:nth-child(1) button.decrement-monster-btn').click();
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-amount').text()).toBe("1");
    });

    it('should update the right-side pane when you click on a monster in the encounter panel', function () {
        element('tr.monster-row:nth-child(2) td').click();
        expect(element('h2').text()).toBe("Toad");
        element('li.encounter-monster-row:nth-child(1) span.monster-name a').click();
        expect(element('h2').text()).toBe("Bat");
    });

    it ('should create a second encounter',function(){
        element('a.encounter-dropdown').click();
        element('a.encounter-dropdown-create').click();
        expect(element('a.encounter-dropdown').text()).toBe("Untitled #1 (CR 0)\n ");
        expect(repeater('li.encounter-monster-row').count()).toBe(0);
    });

    it ('should reselect the first encounter',function(){
        expect(element('a.encounter-dropdown').text()).toBe("Untitled #1 (CR 0)\n ");
        element('a.encounter-dropdown').click();
        element('a.encounter-dropdown-select').click();
        expect(element('a.encounter-dropdown').text()).toBe("Untitled #0 (CR 0)\n ");
    });

    it('should remove both encounters', function () {
        expect(element('.encounter').css("display")).not().toBe("none");
        expect(element('.encounter-no-encounter').css("display")).toBe("none");
        element('a.remove-encounter').click();
        sleep(0.5); /* wait for jquery animations to terminate */
        element('a.remove-encounter').click();
        sleep(0.5); /* wait for jquery animations to terminate */
        expect(element('.encounter').css("display")).toBe("none");
        expect(element('.encounter-no-encounter').css("display")).not().toBe("none");
    });



    it('should allow logout', function () {
        expect(browser().location().path()).toBe('/');
        element("#user-dropdown").click();
        element("#user-dropdown-logout").click();
        sleep(0.1); /* necessary to wait for page reload... ugly, I know */
        expect(browser().location().path()).toBe('/login');
    });
});