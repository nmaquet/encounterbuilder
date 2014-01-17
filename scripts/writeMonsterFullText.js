/**
 * Created by user on 17/01/14.
 */
"use strict";
var fs = require('fs');
var srd_monsters = require("../data/contrib/monsters_partial.json");

var name = process.argv[2];

var monster = null;
for (var i in srd_monsters){
    if (srd_monsters[i].Name == name){
        monster = srd_monsters[i];
        break;
    }

}
fs.writeFileSync('../data/monsters/fulltext/'+name+".html",monster.FullText);