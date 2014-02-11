'use strict';

describe('Encounter', function () {

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


    it('should create an encounter with two bats and compute xp', function () {
        element('a.encounter-dropdown-no-encounter').click();
        element('a.encounter-dropdown-create').click();
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        expect(element('#encounter-xp').text()).toBe("100");
    });

    it('should add a lot of xp when adding an Ancient Gold Dragon', function () {
        inputNameSubstring('Ancient Gold Dragon');
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        expect(element('#encounter-xp').text()).toBe("307300");
    });

    it('should add a lot of xp when adding another Ancient Gold Dragon from the encounter panel', function () {
        element('li.encounter-monster-row:nth-child(1) button.increment-monster-btn').click();
        expect(element('#encounter-xp').text()).toBe("614500");
    });

    it('should remove the encounter', function () {
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