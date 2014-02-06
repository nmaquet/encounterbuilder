'use strict';

describe('Items View', function () {

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

    it('should display items and not monsters when clicking on the items tab',function(){
        expect(element('ul.nav-tabs li.active').text()).toBe('Monsters');
        element('#itemsTab').click();
        expect(element('ul.nav-tabs li.active').text()).toBe('Items');
        expect(element('tr.item-row:nth-child(1) td:nth-child(1) p').text()).toBe("Mithral Heavy Shield");
    });

    it('should display 5 pages and 4 arrows when opening items tab', function () {
        expect(repeater('.page:visible li').count()).toBe(5 + 4);
    });

    it('the pagination should work', function () {
        expect(element('tr.item-row:nth-child(1) td:nth-child(1) p').text()).toBe("Mithral Heavy Shield");
        element("a:contains(2)").click();
        expect(element('tr.item-row:nth-child(1) td:nth-child(1) p').text()).toBe("Necklace of Strangulation");
    });

    it('should allow logout', function () {
        expect(browser().location().path()).toBe('/');
        element("#user-dropdown").click();
        element("#user-dropdown-logout").click();
        sleep(0.5); /* necessary to wait for page reload... ugly, I know */
        expect(browser().location().path()).toBe('/login');
    });
});