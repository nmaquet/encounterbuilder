var fs = require('fs');
var cheerio = require('cheerio');
var weapons = JSON.parse(fs.readFileSync("./weapons_kyle.json", 'utf8'));
for (var i in weapons.ArrayOfWeapon.Weapon) {
    var weapon = weapons.ArrayOfWeapon.Weapon[i];
    if (!weapon.Desc) {
        continue;
    }
    var $ = cheerio.load(weapon.Desc[0]);
    weapon.Desc[0] = $(weapon.Desc[0]).text();
}
fs.writeFileSync("./weapons_kyle_text_descriptions.json",  JSON.stringify(weapons, null, 4));