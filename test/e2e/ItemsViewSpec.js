'use strict';
describe('Items View', function () {

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
        input('itemNameSubstring').enter(text);
    }

    beforeEach(function () {
        browser().navigateTo('/');
    });

    it('should allow login', function () {
        expect(browser().location().path()).toBe('/login');
        input("username").enter("test");
        input("password").enter("test");
        element("#login-button").click();
        expect(browser().location().path()).toBe('/app');
    });

    it('should display items and not monsters when clicking on the items tab', function () {
        expect(element('ul.nav-tabs li.active').text()).toBe('Monsters');
        element('#itemsTab').click();
        expect(element('ul.nav-tabs li.active').text()).toBe('Items');
        expect(element('tr.item-row:nth-child(1) td:nth-child(1) p').text()).toBe("Adamantine Breastplate");
    });

    it('should display 5 pages and 4 arrows when opening items tab', function () {
        element('#itemsTab').click();
        expect(repeater('.page:visible li').count()).toBe(5 + 4);
    });

    it('the pagination should work', function () {
        element('#itemsTab').click();
        expect(element('tr.item-row:nth-child(1) td:nth-child(1) p').text()).toBe("Adamantine Breastplate");
        element("a:contains(2)").click();
        expect(element('tr.item-row:nth-child(1) td:nth-child(1) p').text()).toBe("Death's Head Talisman 24HD");
    });

    it('should find three items and sort by name when searching for "plate""', function () {
        element('#itemsTab').click();
        inputNameSubstring('plate');
        expect(repeater('tr.item-row').count()).toBe(3);
        expect(element('tr.item-row:nth-child(1) td:nth-child(1) p').text()).toBe("Adamantine Breastplate");
        expect(element('tr.item-row:nth-child(2) td:nth-child(1) p').text()).toBe("Dragonhide Plate");
        expect(element('tr.item-row:nth-child(3) td:nth-child(1) p').text()).toBe("Dwarven Plate");
    });

    it('should sort by price when asked', function () {
        element('#itemsTab').click();
        inputNameSubstring('plate');
        select('sortOrder').option('price');
        expect(element('tr.item-row:nth-child(1) td:nth-child(1) p').text()).toBe("Dragonhide Plate");
        expect(element('tr.item-row:nth-child(2) td:nth-child(1) p').text()).toBe("Adamantine Breastplate");
        expect(element('tr.item-row:nth-child(3) td:nth-child(1) p').text()).toBe("Dwarven Plate");
    });

    it('should sort by CL when asked', function () {
        element('#itemsTab').click();
        inputNameSubstring('amulet');
        expect(element('tr.item-row:nth-child(1) td:nth-child(1) p').text()).toBe("Amulet of Inescapable Location");
        expect(element('tr.item-row:nth-child(2) td:nth-child(1) p').text()).toBe("Armillary Amulet");
        select('sortOrder').option('cl');
        expect(element('tr.item-row:nth-child(1) td:nth-child(1) p').text()).toBe("Armillary Amulet");
        expect(element('tr.item-row:nth-child(2) td:nth-child(1) p').text()).toBe("Amulet of Inescapable Location");
    });

    it('should show 17 items when filtering for group:"Artifact"', function () {
        element('#itemsTab').click();
        select('group').option('Artifact');
        expect(repeater('tr.item-row').count()).toBe(17);
    });

    it('should show 1 items when filtering for slot:"eyes"', function () {
        element('#itemsTab').click();
        select('slot').option('eyes');
        expect(repeater('tr.item-row').count()).toBe(1);
        expect(element('tr.item-row:nth-child(1) td:nth-child(1) p').text()).toBe("Lens Of Detection");
    });

    it('should have a working CL slider', function () {
        element('#itemsTab').click();
        var LEFT = 37, RIGHT = 39;
        element('#slider-cl-range > a:nth-child(2)').click();
        expect(element('#cl-range').val()).toBe("0 - 20");
        keyboard().keydown('#slider-cl-range > a:nth-child(2)', 'keydown', RIGHT, false, false);
        keyboard().keydown('#slider-cl-range > a:nth-child(2)', 'keydown', RIGHT, false, false);
        expect(element('#cl-range').val()).toBe("2 - 20");
        element('#slider-cl-range > a:nth-child(3)').click();
        keyboard().keydown('#slider-cl-range > a:nth-child(3)', 'keydown', LEFT, false, false);
        keyboard().keydown('#slider-cl-range > a:nth-child(3)', 'keydown', LEFT, false, false);
        expect(element('#cl-range').val()).toBe("2 - 18");
    });

    it('should allow logout', function () {
        expect(browser().location().path()).toBe('/app');
        element("#user-dropdown").click();
        element("#user-dropdown-logout").click();
        sleep(0.5);
        /* necessary to wait for page reload... ugly, I know */
        expect(browser().location().path()).toBe('/login');
    });
});
