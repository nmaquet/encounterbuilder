'use strict';

describe('EncounterComputedValues', function () {

    function inputMonsterNameSubstring(text) {
        input('nameSubstring').enter(text);
    }

    function inputItemNameSubstring(text) {
        input('itemNameSubstring').enter(text);
    }

    beforeEach(function(){
        browser().navigateTo('/');
    });

    it('should allow login', function () {
        expect(browser().location().path()).toBe('/login');
        input("username").enter("test");
        input("password").enter("test");
        element("#login-button").click();
        expect(browser().location().path()).toBe('/app');
    });


    it('should create an encounter with two bats and compute xp, cr & loot value', function () {
        element('a.encounter-dropdown-no-encounter').click();
        element('a.encounter-dropdown-create').click();
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        expect(element('#encounter-xp').text()).toBe("100");
        expect(element('#encounter-cr').text()).toBe("(CR 1/4)");
        expect(element('#encounter-loot-value').text()).toBe("0");
    });

    it('should add a lot of xp and compute cr when adding an Ancient Gold Dragon', function () {
        inputMonsterNameSubstring('Ancient Gold Dragon');
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        expect(element('#encounter-xp').text()).toBe("307,300");
        expect(element('#encounter-cr').text()).toBe("(CR 20)");
    });

    it('should add a lot of xp and compute cr when adding another Ancient Gold Dragon from the encounter panel', function () {
        element('li.encounter-monster-row:nth-child(1) button.increment-monster-btn').click();
        expect(element('#encounter-xp').text()).toBe("614,500");
        expect(element('#encounter-cr').text()).toBe("(CR 22)");
    });

    it('should add a lot of loot value when adding a Nightskin', function () {
        inputItemNameSubstring('Nightskin');
        element('tr.item-row:nth-child(1) td:nth-child(4) button').click();
        expect(element('#encounter-loot-value').text()).toBe("53,100");
    });

    it('should add a lot of loot value when adding another Nightskinfrom the encounter panel', function () {
        element('li.encounter-item-row:nth-child(1) button.increment-item-btn').click();
        expect(element('#encounter-loot-value').text()).toBe("106,200");
    });

    it('should display 0 coins before clicking the randomize loot button ', function () {
        expect(element('span.encounter-coins-pp').text()).toMatch(/^\s*0 pp\s*$/);
        expect(element('span.encounter-coins-gp').text()).toMatch(/^\s*0 gp\s*$/);
        expect(element('span.encounter-coins-sp').text()).toMatch(/^\s*0 sp\s*$/);
        expect(element('span.encounter-coins-cp').text()).toMatch(/^\s*0 cp\s*$/);
    });

    it('should display 0 coins after clicking the randomize loot button and clicking "no"', function () {
        element('a.randomize-loot').click();
        element('.confirm-dialog-btn-no').click();
        expect(element('span.encounter-coins-pp').text()).toMatch(/^\s*0 pp\s*$/);
        expect(element('span.encounter-coins-gp').text()).toMatch(/^\s*0 gp\s*$/);
        expect(element('span.encounter-coins-sp').text()).toMatch(/^\s*0 sp\s*$/);
        expect(element('span.encounter-coins-cp').text()).toMatch(/^\s*0 cp\s*$/);
    });

    it('should display a lot of  coins after clicking the randomize loot button ', function () {
        element('a.randomize-loot').click();
        element('.confirm-dialog-btn-yes').click();
        expect(element('span.encounter-coins-pp').text()).not().toMatch(/^\s*0 pp\s*$/);
        expect(element('span.encounter-coins-gp').text()).not().toMatch(/^\s*0 gp\s*$/);
        expect(element('span.encounter-coins-sp').text()).toMatch(/^\s*0 sp\s*$/);
        expect(element('span.encounter-coins-cp').text()).toMatch(/^\s*0 cp\s*$/);
    });

    it('should remove the encounter', function () {
        element('a.remove-encounter').click();
        element('.confirm-dialog-btn-yes').click();
        sleep(0.5); /* wait for jquery animations to terminate */
        expect(element('.encounter').css("display")).toBe("none");
        expect(element('.encounter-no-encounter').css("display")).not().toBe("none");
    });

    it('should allow logout', function () {
        expect(browser().location().path()).toBe('/app');
        element("#user-dropdown").click();
        element("#user-dropdown-logout").click();
        sleep(0.1); /* necessary to wait for page reload... ugly, I know */
        expect(browser().location().path()).toBe('/login');
    });
});