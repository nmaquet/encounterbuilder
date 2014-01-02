describe('Monster List view', function () {

    beforeEach(function () {
        browser().navigateTo('/monsters');
        dump(element(".monsters li"));
    });

    it('should filter the monster list as user types into the search box', function () {
        expect(repeater('.monsters li').count()).toBe(50);

        input('query').enter('wyvern');
        expect(repeater('.monsters li').count()).toBe(3);

        input('query').enter('cube');
        expect(repeater('.monsters li').count()).toBe(1);
    });

    it('the default sort order should be challenge rating', function () {
        expect(input('orderProp').val()).toBe("cr");
    });

    it('sorting by challenge rating should work', function () {
        input('query').enter('goblin');
        expect(repeater('.monsters li').count()).toBe(5);
        expect(element('.monsters li:nth-child(1) a').text()).toBe("Goblin");
        expect(element('.monsters li:nth-child(2) a').text()).toBe("Hobgoblin");
        expect(element('.monsters li:nth-child(3) a').text()).toBe("Monkey Goblin");
        expect(element('.monsters li:nth-child(4) a').text()).toBe("Goblin Dog");
        expect(element('.monsters li:nth-child(5) a').text()).toBe("Goblin Snake");
    });


});