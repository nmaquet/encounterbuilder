"use strict";

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
    "Senses",
    "SR",
    "DR"
]

function generateMonsterModelObject() {
    var model = {};
    for (var i in MONSTER_ATTRIBUTES) {
        var attribute = MONSTER_ATTRIBUTES [i];
        model[attribute] = String;
    }
    model.CR = Number;
    model.id = String;
    return model;
}

module.exports = function (mongoose) {
    return {
        MONSTER_ATTRIBUTES : MONSTER_ATTRIBUTES,
        Monster :  mongoose.model('Monster', generateMonsterModelObject())
    }
};

