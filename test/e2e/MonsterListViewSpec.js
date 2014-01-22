'use strict';

describe('Monster List View', function () {

    beforeEach(function () {
        browser().navigateTo('/');
    });

    function inputNameSubstring(text) {
        input('nameSubstring').enter(text);
        sleep(0.5); /* wait for setTimeout to trigger */
    }

    it('should initially display 50 monsters + 1 header row', function () {
        expect(repeater('.monsters tr').count()).toBe(50+1);
    });

    it('should display 3 monsters when searching for "wyvern"', function () {
        inputNameSubstring('wyvern');
        expect(repeater('.monsters tr').count()).toBe(3+1);
    });

    it('should display one monster when searching for "cube"', function () {
        inputNameSubstring('cube');
        expect(repeater('.monsters tr').count()).toBe(1+1);
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
        expect(repeater('.monsters tr').count()).toBe(5+1);
        expect(element('.monsters tr:nth-child(1) td:nth-child(1) p').text()).toBe("Goblin");
        expect(element('.monsters tr:nth-child(2) td:nth-child(1) p').text()).toBe("Hobgoblin");
        expect(element('.monsters tr:nth-child(3) td:nth-child(1) p').text()).toBe("Monkey Goblin");
        expect(element('.monsters tr:nth-child(4) td:nth-child(1) p').text()).toBe("Goblin Dog");
        expect(element('.monsters tr:nth-child(5) td:nth-child(1) p').text()).toBe("Goblin Snake");
    });

    it('should sort by name when order is name', function () {
        inputNameSubstring('goblin');
        select('orderProp').option('name');
        expect(repeater('.monsters tr').count()).toBe(5+1);
        expect(element('.monsters tr:nth-child(1) td:nth-child(1) p').text()).toBe("Goblin");
        expect(element('.monsters tr:nth-child(2) td:nth-child(1) p').text()).toBe("Goblin Dog");
        expect(element('.monsters tr:nth-child(3) td:nth-child(1) p').text()).toBe("Goblin Snake");
        expect(element('.monsters tr:nth-child(4) td:nth-child(1) p').text()).toBe("Hobgoblin");
        expect(element('.monsters tr:nth-child(5) td:nth-child(1) p').text()).toBe("Monkey Goblin");
    });

    it('should display the challenge rating of each monster', function() {
        inputNameSubstring('goblin');
        select('orderProp').option('cr');
        expect(repeater('.monsters tr').count()).toBe(5+1);
        expect(element('.monsters tr:nth-child(1) td:nth-child(2) p').text()).toBe("1/3");
        expect(element('.monsters tr:nth-child(2) td:nth-child(2) p').text()).toBe("1/2");
        expect(element('.monsters tr:nth-child(3) td:nth-child(2) p').text()).toBe("1/2");
        expect(element('.monsters tr:nth-child(4) td:nth-child(2) p').text()).toBe("1");
        expect(element('.monsters tr:nth-child(5) td:nth-child(2) p').text()).toBe("1");
    });

    it('should  display 17 monsters when searching for "small"', function () {
        inputNameSubstring('small');
        expect(repeater('.monsters tr').count()).toBe(17+1);
    });
    
    it('should  display 2 monsters when searching for "small" with type "animal"', function () {
        inputNameSubstring('small');
        select('type').option('animal');
        expect(repeater('.monsters tr').count()).toBe(2+1);
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
        expect(element('.monsters tr:nth-child(1) td:nth-child(1) p').text()).toBe("Dragonfish");
        element("a:contains(2)").click();
        expect(element('.monsters tr:nth-child(1) td:nth-child(1) p').text()).toBe("Juvenile Green Dragon");
        element("a:contains(3)").click();
        expect(element('.monsters tr:nth-child(1) td:nth-child(1) p').text()).toBe("Adult Forest Dragon");
        element("a:contains(4)").click();
        expect(element('.monsters tr:nth-child(1) td:nth-child(1) p').text()).toBe("Elemental Air Dragon");
    });

    it('should have working pagination arrows', function () {
        inputNameSubstring('dragon');
        element("a:contains(›)").click();
        expect(element('.monsters tr:nth-child(1) td:nth-child(1) p').text()).toBe("Juvenile Green Dragon");
        element("a:contains(»)").click();
        expect(element('.monsters tr:nth-child(1) td:nth-child(1) p').text()).toBe("Elemental Air Dragon");
        element("a:contains(‹)").click();
        expect(element('.monsters tr:nth-child(1) td:nth-child(1) p').text()).toBe("Adult Forest Dragon");
        element("a:contains(«)").click();
        expect(element('.monsters tr:nth-child(1) td:nth-child(1) p').text()).toBe("Dragonfish");
    });

    it('should update the right-side pane when you click on a monster in the search results', function() {
        inputNameSubstring('dragon');
        element('.monsters tr:nth-child(1)').click();
        expect(element('h2').text()).toBe("Dragonfish");
        element('.monsters tr:nth-child(2)').click();
        expect(element('h2').text()).toBe("Pseudodragon");
    });

    it('should initially fill the monster detail pane with the first monster', function() {
        expect(element('h2').text()).toBe("Bat");
    });
});