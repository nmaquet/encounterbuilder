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

    it('should add two Adamantine Breastplate to encounter when user clicks on the "plus" button twice in the search results list', function () {
        expect(repeater('li.encounter-item-row').count()).toBe(0);
        element('tr.item-row:nth-child(1) td:nth-child(4) button').click();
        element('tr.item-row:nth-child(1) td:nth-child(4) button').click();
        expect(repeater('li.encounter-item-row').count()).toBe(1);
        expect(element('li.encounter-item-row:nth-child(1) span.item-amount').text()).toBe("2");
        expect(element('li.encounter-item-row:nth-child(1) span.item-name').text()).toBe("Adamantine Breastplate");
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

    it('should remove all Adamantine Breastplates from encounter when user clicks on the remove button', function () {
        expect(repeater('li.encounter-item-row').count()).toBe(1);
        element('li.encounter-item-row:nth-child(1) button.remove-item-btn').click();
        expect(repeater('li.encounter-item-row').count()).toBe(0);
    });

    it('should remove one Bat from encounter when user clicks on the minus button', function () {
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        element('tr.monster-row:nth-child(1) td:nth-child(4) button').click();
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-amount').text()).toBe("4");
        element('li.encounter-monster-row:nth-child(1) button.decrement-monster-btn').click();
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-amount').text()).toBe("3");
    });

    it('should remove one Adamantine Breastplate from encounter when user clicks on the minus button', function () {
        element('tr.item-row:nth-child(1) td:nth-child(4) button').click();
        element('tr.item-row:nth-child(1) td:nth-child(4) button').click();
        element('tr.item-row:nth-child(1) td:nth-child(4) button').click();
        element('tr.item-row:nth-child(1) td:nth-child(4) button').click();
        expect(element('li.encounter-item-row:nth-child(1) span.item-amount').text()).toBe("4");
        element('li.encounter-item-row:nth-child(1) button.decrement-item-btn').click();
        expect(element('li.encounter-item-row:nth-child(1) span.item-amount').text()).toBe("3");
    });
    
    it('should add one Bat from encounter when user clicks on the plus button', function () {
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-amount').text()).toBe("3");
        element('li.encounter-monster-row:nth-child(1) button.increment-monster-btn').click();
        expect(element('li.encounter-monster-row:nth-child(1) span.monster-amount').text()).toBe("4");
    });

    it('should add one Adamantine Breastplate from encounter when user clicks on the plus button', function () {
        expect(element('li.encounter-item-row:nth-child(1) span.item-amount').text()).toBe("3");
        element('li.encounter-item-row:nth-child(1) button.increment-item-btn').click();
        expect(element('li.encounter-item-row:nth-child(1) span.item-amount').text()).toBe("4");
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
        expect(element('h2:visible').text()).toBe("Toad");
        element('li.encounter-monster-row:nth-child(1) span.monster-name a').click();
        expect(element('h2:visible').text()).toBe("Bat");
    });

    it('should update the right-side pane when you click on an item in the encounter panel', function () {
        element('li.encounter-item-row:nth-child(1) span.item-name a').click();
        expect(element('h2:visible').text()).toBe("Adamantine Breastplate");
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