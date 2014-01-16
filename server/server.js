"use strict";

var fs = require('fs');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

var FIND_LIMIT = 50;

var MONSTER_ATTRIBUTES = [
    /* SRD Primary Attributes */
    "Name",
    "CR",
    "XP",
    "Race",
    "Class",
    "MonsterSource",
    "Alignment",
    "Size",
    "Type",
    "SubType",
    "AC",
    "HP",
    "HD",
    "Saves",
    "Fort",
    "Ref",
    "Will",
    "Speed",
    "Melee",
    "Ranged",
    "Space",
    "Reach",
    "AbilityScores",
    "Feats",
    "Skills",
    "RacialMods",
    "Languages",
    "SQ",
    "Environment",
    "Organization",
    "Treasure",
    "Group",
    "Source",
    "IsTemplate",
    "FullText",
    "Gear",
    "OtherGear",
    "CharacterFlag",
    "CompanionFlag",
    "Fly",
    "Climb",
    "Burrow",
    "Swim",
    "Land",
    "TemplatesApplied",
    "AgeCategory",
    "DontUseRacialHD",
    "VariantParent",
    "ClassArchetypes",
    "CompanionFamiliarLink",
    "AlternateNameForm",
    "UniqueMonster",
    "MR",
    "Mythic",
    "MT",
    /* Extra Computed Attributes */
    "Description",
    "Description_Visual",
    "Init",
    "Senses"
]

mongoose.connect('mongodb://heroku:fR98x8wJk2RN@mongo.onmodulus.net:27017/gu9gOmot');

app.configure(function () {
    app.use("/", express.static(__dirname + '/../client/public/'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

function generateMonsterModelObject() {
    var model = {
        CR : Number,
        id : String
    };
    for (var i in MONSTER_ATTRIBUTES) {
        var attribute = MONSTER_ATTRIBUTES [i];
        model[attribute] = String;
    }
    return model;
}

var Monster = mongoose.model('Monster', generateMonsterModelObject());

var searchMonstersRoute = require('./searchMonstersRoute')(Monster, FIND_LIMIT);
var monsterRoute = require('./monsterRoute')(Monster);
var monstersResetRoute = require('./monstersResetRoute')(Monster, fs);
var defaultRoute = require('./defaultRoute')();

app.get('/api/search-monsters', searchMonstersRoute);
app.get('/api/monster/:id', monsterRoute);
app.get('/api/monsters-reset', monstersResetRoute);
app.get('*', defaultRoute);

var port = process.env.PORT || 3000;

app.listen(port);

console.log("Encounter Builder Server listening on port " + port);
