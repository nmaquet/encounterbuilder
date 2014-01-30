'use strict';

describe('Monster List View', function () {

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
        input("username").enter("nic");
        input("password").enter("nic");
        element("#login-button").click();
        expect(browser().location().path()).toBe('/monsters');
    });

    it('should initially display 50 monsters + 1 header row', function () {
        expect(repeater('tr.monster-row').count()).toBe(50);
    });

    it('should display 3 monsters when searching for "wyvern"', function () {
        inputNameSubstring('wyvern');
        expect(repeater('tr.monster-row').count()).toBe(3);
    });

    it('should display one monster when searching for "cube"', function () {
        inputNameSubstring('cube');
        expect(repeater('tr.monster-row').count()).toBe(1);
    });

    it('should sort by challenge rating by default', function () {
        expect(input('orderProp').val()).toBe("cr");
    });

    it('should allow to sort by name', function () {
        select('orderProp').option('name');
        expect(input('orderProp').val()).toBe("name");
    });

    it('should sort by challenge rating when order is challenge rating', function () {
        inputNameSubstring('goblin');
        select('orderProp').option('cr');
        expect(repeater('tr.monster-row').count()).toBe(5);
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Goblin");
        expect(element('tr.monster-row:nth-child(2) td:nth-child(1) p').text()).toBe("Hobgoblin");
        expect(element('tr.monster-row:nth-child(3) td:nth-child(1) p').text()).toBe("Monkey Goblin");
        expect(element('tr.monster-row:nth-child(4) td:nth-child(1) p').text()).toBe("Goblin Dog");
        expect(element('tr.monster-row:nth-child(5) td:nth-child(1) p').text()).toBe("Goblin Snake");
    });

    it('should sort by name when order is name', function () {
        inputNameSubstring('goblin');
        select('orderProp').option('name');
        expect(repeater('tr.monster-row').count()).toBe(5);
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Goblin");
        expect(element('tr.monster-row:nth-child(2) td:nth-child(1) p').text()).toBe("Goblin Dog");
        expect(element('tr.monster-row:nth-child(3) td:nth-child(1) p').text()).toBe("Goblin Snake");
        expect(element('tr.monster-row:nth-child(4) td:nth-child(1) p').text()).toBe("Hobgoblin");
        expect(element('tr.monster-row:nth-child(5) td:nth-child(1) p').text()).toBe("Monkey Goblin");
    });

    it('should display the challenge rating of each monster', function () {
        inputNameSubstring('goblin');
        select('orderProp').option('cr');
        expect(repeater('tr.monster-row').count()).toBe(5);
        expect(element('tr.monster-row:nth-child(1) td:nth-child(2) p').text()).toBe("1/3");
        expect(element('tr.monster-row:nth-child(2) td:nth-child(2) p').text()).toBe("1/2");
        expect(element('tr.monster-row:nth-child(3) td:nth-child(2) p').text()).toBe("1/2");
        expect(element('tr.monster-row:nth-child(4) td:nth-child(2) p').text()).toBe("1");
        expect(element('tr.monster-row:nth-child(5) td:nth-child(2) p').text()).toBe("1");
    });

    it('should display the source of each monster', function () {
        inputNameSubstring('skull spider');
        expect(repeater('tr.monster-row').count()).toBe(2);
        expect(element('tr.monster-row:nth-child(1) td:nth-child(3) small').text()).toBe("THC");
        expect(element('tr.monster-row:nth-child(2) td:nth-child(3) small').text()).toBe("THR");
    });

    it('should  display 17 monsters when searching for "small"', function () {
        inputNameSubstring('small');
        expect(repeater('tr.monster-row').count()).toBe(17);
    });

    it('should  display 2 monsters when searching for "small" with type "animal"', function () {
        inputNameSubstring('small');
        select('type').option('animal');
        expect(repeater('tr.monster-row').count()).toBe(2);
    });

    it('should display 4 pages and 4 arrows when searching for "dragon"', function () {
        inputNameSubstring('dragon');
        expect(repeater('.page li').count()).toBe(8);
    });

    it('should display 2 pages and 4 arrows when searching for "elemental"', function () {
        inputNameSubstring('elemental');
        expect(repeater('.page li').count()).toBe(6);
    });

    it('should display the correct dragon as first dragon of each page', function () {
        inputNameSubstring('dragon');
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Dragonfish");
        element("a:contains(2)").click();
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Juvenile Green Dragon");
        element("a:contains(3)").click();
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Adult Forest Dragon");
        element("a:contains(4)").click();
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Elemental Air Dragon");
    });

    it('should have working pagination arrows', function () {
        inputNameSubstring('dragon');
        element("a:contains(›)").click();
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Juvenile Green Dragon");
        element("a:contains(»)").click();
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Elemental Air Dragon");
        element("a:contains(‹)").click();
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Adult Forest Dragon");
        element("a:contains(«)").click();
        expect(element('tr.monster-row:nth-child(1) td:nth-child(1) p').text()).toBe("Dragonfish");
    });

    it('should update the right-side pane when you click on a monster in the search results', function () {
        inputNameSubstring('dragon');
        element('tr.monster-row:nth-child(1)').click();
        expect(element('h2').text()).toBe("Dragonfish");
        element('tr.monster-row:nth-child(2)').click();
        expect(element('h2').text()).toBe("Pseudodragon");
    });

    it('should initially fill the monster detail pane with the first monster', function () {
        expect(element('h2').text()).toBe("Bat");
    });

    it('should display 5 dragons when filtering by CR 22 to 25', function () {
        //FIXME this test takes 20 seconds
        inputNameSubstring('dragon');
        var LEFT = 37, RIGHT = 39;
        element('#slider-range > a:nth-child(2)').click();
        for (var i = 0; i < 22; ++i) {
            keyboard().keydown('#slider-range > a:nth-child(2)', 'keydown', RIGHT, false, false);
        }
        element('#slider-range > a:nth-child(3)').click();
        for (var i = 0; i < 15; ++i) {
            keyboard().keydown('#slider-range > a:nth-child(3)', 'keydown', LEFT, false, false);
        }
        sleep(0.3);
        expect(repeater('tr.monster-row').count()).toBe(5);
    });

    it('should add two Bats to encounter when user clicks on the "plus" button twice in the search results list', function () {
        expect(repeater('li.monster-row').count()).toBe(0);
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        expect(repeater('li.monster-row').count()).toBe(1);
        expect(element('li.monster-row:nth-child(1) span.monster-amount').text()).toBe("2");
        expect(element('li.monster-row:nth-child(1) span.monster-name').text()).toBe("Bat");
        expect(element('li.monster-row:nth-child(1) span.monster-cr').text()).toBe("CR 1/8");
    });

    it('should add two Bats to encounter when user clicks enters "2" and on the "plus in the search results list', function () {
        expect(repeater('li.monster-row').count()).toBe(0);
        using('tr.monster-row:nth-child(1) td:nth-child(4)').input("monster.amountToAdd").enter("2");
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        expect(repeater('li.monster-row').count()).toBe(1);
        expect(element('li.monster-row:nth-child(1) span.monster-amount').text()).toBe("2");
        expect(element('li.monster-row:nth-child(1) span.monster-name').text()).toBe("Bat");
        expect(element('li.monster-row:nth-child(1) span.monster-cr').text()).toBe("CR 1/8");
    });

    it('should add a goblin and two hobgoblins to the encounter when asked', function () {
        inputNameSubstring('goblin');
        expect(repeater('li.monster-row').count()).toBe(0);
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        element('tr.monster-row:nth-child(2) td:nth-child(4) button').click();
        element('tr.monster-row:nth-child(2) td:nth-child(4) button').click();
        expect(repeater('li.monster-row').count()).toBe(2);
        expect(element('li.monster-row:nth-child(1) span.monster-amount').text()).toBe("1");
        expect(element('li.monster-row:nth-child(1) span.monster-name').text()).toBe("Goblin");
        expect(element('li.monster-row:nth-child(1) span.monster-cr').text()).toBe("CR 1/3");
        expect(element('li.monster-row:nth-child(2) span.monster-amount').text()).toBe("2");
        expect(element('li.monster-row:nth-child(2) span.monster-name').text()).toBe("Hobgoblin");
        expect(element('li.monster-row:nth-child(2) span.monster-cr').text()).toBe("CR 1/2");
    });

    it('should allow logout', function () {
        expect(browser().location().path()).toBe('/monsters');
        element("#user-dropdown").click();
        element("#user-dropdown-logout").click();
        expect(browser().location().path()).toBe('/login');
    });
});