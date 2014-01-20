'use strict';

describe('Monster List View', function () {

    beforeEach(function () {
        browser().navigateTo('/');
    });

    it('should initially display 50 monsters', function () {
        expect(repeater('.monsters li').count()).toBe(50);
    });

    it('should display 2 monsters when searching for "wyvern"', function () {
        input('query').enter('wyvern');
        expect(repeater('.monsters li').count()).toBe(3);
    });

    it('should display one monster when searching for "cube"', function () {
        input('query').enter('cube');
        expect(repeater('.monsters li').count()).toBe(1);
    });

    it('should sort by challenge rating by default', function () {
        expect(input('orderProp').val()).toBe("cr");
    });

    it('should allow to sort by name', function () {
        select('orderProp').option('name');
        expect(input('orderProp').val()).toBe("name");
    });

    it('should sort by challenge rating when order is challenge rating', function () {
        input('query').enter('goblin');
        select('orderProp').option('cr');
        expect(repeater('.monsters li').count()).toBe(5);
        expect(element('.monsters li:nth-child(1) a').text()).toBe("Goblin");
        expect(element('.monsters li:nth-child(2) a').text()).toBe("Hobgoblin");
        expect(element('.monsters li:nth-child(3) a').text()).toBe("Monkey Goblin");
        expect(element('.monsters li:nth-child(4) a').text()).toBe("Goblin Dog");
        expect(element('.monsters li:nth-child(5) a').text()).toBe("Goblin Snake");
    });

    it('should sort by name when order is name', function () {
        input('query').enter('goblin');
        select('orderProp').option('name');
        expect(repeater('.monsters li').count()).toBe(5);
        expect(element('.monsters li:nth-child(1) a').text()).toBe("Goblin");
        expect(element('.monsters li:nth-child(2) a').text()).toBe("Goblin Dog");
        expect(element('.monsters li:nth-child(3) a').text()).toBe("Goblin Snake");
        expect(element('.monsters li:nth-child(4) a').text()).toBe("Hobgoblin");
        expect(element('.monsters li:nth-child(5) a').text()).toBe("Monkey Goblin");
    });

    it('should make a list of anchors to the Monster description page', function() {
        input('query').enter('wyvern');
        expect(element('.monsters li:nth-child(1) a').attr("href")).toBe("#/monsters/wyvern");
        expect(element('.monsters li:nth-child(2) a').attr("href")).toBe("#/monsters/aashaq's-wyvern");
        expect(element('.monsters li:nth-child(3) a').attr("href")).toBe("#/monsters/mythic-wyvern");
    });

    it('should display the challenge rating of each monster', function() {
        input('query').enter('goblin');
        select('orderProp').option('cr');
        expect(repeater('.monsters li').count()).toBe(5);
        expect(element('.monsters li:nth-child(1) p').text()).toBe("CR : 1/3");
        expect(element('.monsters li:nth-child(2) p').text()).toBe("CR : 1/2");
        expect(element('.monsters li:nth-child(3) p').text()).toBe("CR : 1/2");
        expect(element('.monsters li:nth-child(4) p').text()).toBe("CR : 1");
        expect(element('.monsters li:nth-child(4) p').text()).toBe("CR : 1");
    });
});