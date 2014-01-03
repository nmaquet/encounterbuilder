
var fs = require('fs');

var ids = [];

function generateId(name) {
    var prefix = name.toLowerCase().replace(/\s/g, "-");

    if (ids.indexOf(prefix) === -1) {
        ids.push(prefix);
        return prefix;
    }

    var suffix = 0;
    while (ids.indexOf(prefix + "-" + suffix) !== -1) {
        ++suffix;
    }

    var id = prefix + "-" + suffix;
    ids.push(id);
    return id;
}

module.exports = function (Monster) {
    return function (request, response) {
        Monster.remove({}, function (error) {

            if (error)
                response.send(error);

            var file = __dirname + '/../data/monsters/monsters_full.json';

            fs.readFile(file, 'utf8', function (error, monsters) {
                if (error) {
                    console.log('Error: ' + error);
                    return;
                }

                monsters = JSON.parse(monsters);
                for (monster in monsters) {
                    var monster = {
                        name: monsters[monster].Name,
                        id: generateId(monsters[monster].Name),
                        cr: Number(eval(monsters[monster].CR))
                    };
                    Monster.create(monster, function (error) {
                        if (error)
                            console.log('Error: ' + error);

                    });
                }
                response.send('monsters regenerated');
            });
        });
    }
}

