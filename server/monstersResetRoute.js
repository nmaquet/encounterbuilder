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

module.exports = function (Monster, fs) {
    return function (request, response) {
        Monster.remove({}, function (error) {

            if (error)
                response.send(error);

            var file = __dirname + '/../data/monsters/monsters.json';

            fs.readFile(file, 'utf8', function (error, monsters) {
                if (error) {
                    console.log('Error: ' + error);
                    return;
                }
                monsters = JSON.parse(monsters);
                for (var monster in monsters) {
                    monsters[monster].CR = Number(eval(monsters[monster].CR));
                    monsters[monster].id = generateId(monsters[monster].Name);
                    Monster.create(monsters[monster], function (error) {
                        if (error)
                            console.log('Error: ' + error);

                    });
                }
                response.send('monsters regenerated');
            });
        });
    }
}

