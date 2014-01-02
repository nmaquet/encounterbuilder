'use strict';

describe('Monster List View', function () {

    beforeEach(function () {
        browser().navigateTo('/monsters');
    });

    it('should filter the monster list as user types into the search box', function () {
        expect(repeater('.monsters li').count()).toBe(50);

        input('query').enter('wyvern');
        expect(repeater('.monsters li').count()).toBe(3);

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
        expect(element('.monsters li:nth-child(1) a').attr("href")).toBe("/api/monster/wyvern");
        expect(element('.monsters li:nth-child(2) a').attr("href")).toBe("/api/monster/aashaq's-wyvern");
        expect(element('.monsters li:nth-child(3) a').attr("href")).toBe("/api/monster/mythic-wyvern");
    });
});