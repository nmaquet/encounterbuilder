"use strict";

var expect = chai.expect;

var service;

describe("parserService", function () {

    var baseMonster = '';
    beforeEach(module("encounterBuilderApp"));

    beforeEach(inject(function (_parserService_) {
        service = _parserService_;
    }));

    beforeEach(function () {
        baseMonster = {
            "Name": "Solar",
            "CR": 23,
            "XP": 819200,
            "Alignment": "NG",
            "Size": "Large",
            "Type": "outsider",
            "SubType": "(angel, extraplanar, good)",
            "AC": "44, touch 11, flat-footed 42",
            "HP": "363",
            "HD": "(22d10+242)",
            "Saves": "Fort +25, Ref +14, Will +23; +4 vs. poison, +4 resistance vs. evil",
            "Fort": "25",
            "Ref": "14",
            "Will": "23",
            "Speed": "50 ft., fly 150 ft. (good)",
            "Melee": "+5 dancing greatsword +35/+30/+25/+20 (3d6+18) or slam +30 (2d8+13)",
            "Ranged": "+5 composite longbow (+9 Str bonus) +31/+26/+21/+16 (2d6+14 plus slaying arrow)",
            "Space": "10 ft.",
            "Reach": "10 ft.",
            "AbilityScores": "Str 28, Dex 20, Con 30, Int 23, Wis 27, Cha 25",
            "Feats": "Cleave, Deadly Aim, Dodge, Great Fortitude, Improved Initiative, Improved Sunder, Iron Will, Lightning Reflexes, Mobility, Power Attack, Toughness",
            "Skills": "Craft (any one) +31, Diplomacy +32, Fly +32, Knowledge (history) +31, Knowledge (nature) +31, Knowledge (planes) +31, Knowledge (religion) +31, Perception +33, Sense Motive +33, Spellcraft +31, Stealth +21, Survival +31",
            "Languages": "Celestial, Draconic, Infernal; truespeech",
            "SQ": "change shape (alter self )",
            "Environment": "any good-aligned plane",
            "Organization": "solitary or pair",
            "Treasure": "double (+5 full plate, +5 dancing greatsword, +5 composite longbow [+9 Str bonus])",
            "Group": "Angel",
            "Source": "PFRPG Bestiary",
            "IsTemplate": "0",
            "CharacterFlag": "0",
            "CompanionFlag": "0",
            "Fly": "0",
            "Climb": "0",
            "Burrow": "0",
            "Swim": "0",
            "Land": "0",
            "AgeCategory": "adult",
            "DontUseRacialHD": "0",
            "CompanionFamiliarLink": "''",
            "UniqueMonster": "0",
            "MR": "0",
            "Mythic": false,
            "MT": "0",
            "Description": "<p></p><p>Solars are the greatest type of angel, usually serving at the right hand of a deity or championing a cause that benefits an entire world or plane. A typical solar looks roughly human, though some physically resemble other humanoid races and a rare few have even more unusual forms. A solar stands about 9 feet tall and weighs about 500 pounds, with a strong, commanding voice that is impossible to ignore. Most have silvery or golden skin. Blessed with an array of magical powers and the spellcasting abilities of the most powerful clerics, solars are powerful opponents capable of single-handedly <i>slaying</i> mighty evils. They are the greatest trackers among the celestials, the most masterful of which are s<i>aid</i> to be able to track the days-old wake of a pit fiend flying through the Astral Plane. Some take on the mantle of monster-slayers and hunt powerful fiends and undead such as devourers, night hags, night shades, and pit fiends, even making forays into the evil planes and the Negative Energy Plane to destroy these creatures at their source before they can bring harm to mortals. A few very old solars have succeeded at this task and bear slayer-names of dread creatures that are now extinct by the solar's hand. Solars accept roles as guardians, usually of fundamental supernatural concepts, or objects or creatures of great importance. On one world, a group of solars patrols the energy conduits of the sun, alert for any attempts by evil races such as drow to snuff out the light and bring eternal darkness. On another, seven solars stand watch over seven mystical chains keeping evil gods bound within a prison demiplane. On yet another, a solar with a flaming sword stands watch over the original mortal paradise so that no creature may enter. In worlds where the gods cannot take physical form, they send solars to be their prophets and gurus (often pretending to be mortals), laying the foundation for cults that grow to become great religions. Likewise, in worlds oppressed by evil, solars are the secret priests who bring hope to the downtrodden, or in some cases allow themselves to be martyred so that their holy essence can explode outward to land and grow in the hearts of great heroes-to-be. Though they are not gods, the solars' power approaches that of demigods, and they often have an advisory role for younger or weaker deities. In some polytheistic faiths, mortals worship one or more solars as aspects or near-equal servants of the true deities-never without the deity's approval-or consider notable solars to be offspring, consorts, lovers, or spouses of true deities (which they may be, depending on the deity). Unlike other angels, most solars are created from an amalgam of good souls and raw divine energy to directly serve the gods, but an increasing number of these powerful angels have been \"promoted\" to their existence as solars from lesser creatures like planetars or devas. A few rare and powerful good souls ascend directly to the status of solar. The oldest solars predate mortality and are among the gods' first creations. These strange solars are paragons of their kind and have little direct interaction with mortals, focusing on the protection or <i>destruction</i> of abstract concepts such as gravity, dark matter, entropy, and primordial evil. Solars who spend a long time in the Material Plane, especially those in the guise of mortals, are sometimes the source of halfcelestial or aasimar bloodlines in mortal families, due either to romantic dalliances or simply the mortals' proximity to celestial energy. Actual offspring are rare, and when they occur, it is always a mortal mother that bears the child-while solars can appear as either sex, the gods have not granted them the capacity for pregnancy or motherhood. Indeed, this fundamental truth is often what drives a solar to seek out a mortal lover. Since begetting a child upon a mortal is generally frowned upon by other solars, a solar father rarely interacts directly with the fate of his lover or child, so as to avoid bringing shame upon him<i>self</i> or his responsibilities. Yet such solars still watch over their progeny from afar, and in times of peril, they might even be moved to intercede to <i>aid</i> one of their endangered children, albiet in subtle and mysterious ways. All angels respect the power and wisdom of solars, and though these mightiest of angels usually work alone, they sometimes command multiple armies led by planetars, acting as great field marshals for massive incursions against the legions of Hell or the hordes of the Abyss.</p>",
            "Description_Visual": "This towering humanoid creature has shining topaz eyes, metallic skin, and three pairs of white wings.",
            "Init": "+9",
            "Senses": "darkvision 60 ft., low- light vision, detect evil, detect snares and pits, true seeing; Perception +33",
            "SR": "34",
            "DR": "15/epic and evil",
            "Immune": "acid, cold, petrification",
            "Resist": "electricity 10, fire 10",
            "SpellLikeAbilities": "<b>Spell-Like Abilities</b> (CL 20th) <br>Constant&mdash;<i><i>detect evil</i></i>,<i> <i>detect snares and pits</i></i>, <i><i>discern lies</i></i> (DC 21),<i> <i>true seeing</i></i><br>At Will&mdash;<i><i>aid</i></i>,<i> <i>animate objects</i></i>,<i> <i>commune</i></i>,<i> <i>continual flame</i></i>,<i> <i>dimensional anchor</i></i>,<i> <i>greater dispel magic</i></i>, <i><i>holy smite</i></i> (DC 21), <i><i>imprisonment</i></i> (DC 26), <i><i>invisibility</i></i> (<i>self</i> only),<i> <i>lesser restoration</i></i>,<i> <i>remove curse</i></i>,<i> <i>remove disease</i></i>,<i> <i>remove fear</i></i>,<i> <i>resist energy</i></i>,<i> <i>summon monster VII</i></i>, <i><i>speak with dead</i></i> (DC 20),<i> <i>waves of fatigue</i></i><br>3/day&mdash;<i><i>blade barrier</i></i> (DC 23), <i><i>earthquake</i></i> (DC 25),<i> <i>heal</i></i>, <i><i>mass charm monster</i></i> (DC 25),<i> <i>permanency</i></i>,<i> <i>resurrection</i></i>,<i> <i>waves of exhaustion</i></i><br>1/day&mdash;<i><i>greater restoration</i></i>,<i> <i>power word blind</i></i>,<i> <i>power word kill</i></i>,<i> <i>power word stun</i></i>, <i><i>prismatic spray</i></i> (DC 24),<i> <i>wish</i></i>",
            "Str": "28",
            "Dex": "20",
            "Con": "30",
            "Int": "23",
            "Wis": "27",
            "Cha": "25",
            "BaseAtk": "+22",
            "CMB": "+32",
            "CMD": "47",
            "SpecialAbilities": "<h5><b>Spells</b> Solars can cast divine spells as 20th-level clerics. They do not gain access to domains or other cleric abilities. </h5><h5><b>Slaying Arrow (Su)</b> A solar's bow needs no ammunition, and automatically creates a <i>slaying</i> arrow of the solar's choice when drawn.</h5>",
            "TreasureBudget": "double",
            "Heroic": false
        };
    });

    it("should  parse the ability scores to numbers", function () {
        var parsedMonster = service.parseMonster(baseMonster);
        expect(parsedMonster.Str).to.equal(28);
        expect(parsedMonster.Dex).to.equal(20);
        expect(parsedMonster.Con).to.equal(30);
        expect(parsedMonster.Int).to.equal(23);
        expect(parsedMonster.Wis).to.equal(27);
        expect(parsedMonster.Cha).to.equal(25);
        expect(parsedMonster.Fort).to.equal(25);
        expect(parsedMonster.Ref).to.equal(14);
        expect(parsedMonster.Will).to.equal(23);
        expect(parsedMonster.CMD).to.equal(47);
        expect(parsedMonster.CMB).to.equal(32);
    });

    it("should parse the AC", function () {
        var parsedMonster = service.parseMonster(baseMonster);
        expect(parsedMonster.normalAC).to.equal(44);
        expect(parsedMonster.touchAC).to.equal(11);
        expect(parsedMonster.flatFootedAC).to.equal(42);
    });

    it("should parse the HD", function () {
        var parsedMonster = service.parseMonster(baseMonster);
        expect(parsedMonster.numberOfHD).to.equal(22);
        expect(parsedMonster.typeOfHD).to.equal(10);
        expect(parsedMonster.hitPointBonus).to.equal(242);
        expect(parsedMonster.HP).to.equal(363);
    });

    it("should parse the skills", function () {
        baseMonster.Skills = "Craft (any one) +31, Diplomacy +32";
        var parsedMonster = service.parseMonster(baseMonster);
        expect(parsedMonster.Skills).to.deep.equal([
            {name: "Craft (any one)", mod: 31},
            {name: "Diplomacy", mod: 32}
        ]);
    });

    it("should parse Melee", function () {
        baseMonster.Melee = "+5 dancing greatsword +35/+30/+25/+20 (3d6+18)";
        var parsedMonster = service.parseMonster(baseMonster);
        expect(parsedMonster.Melee).to.deep.equal([
            [
                {"attackDescription": "+5 dancing greatsword", "attackBonuses": [35, 30, 25, 20], "damageDice": "3d6", "damageMod": 18,specialAttacks:''}
            ]
        ]);
    });

    it("should parse strings with multiple attacks", function () {
        baseMonster.Melee = "+5 dancing greatsword +35/+30/+25/+20 (3d6+18), 2 wings +30 (2d6+12)";
        var parsedMonster = service.parseMonster(baseMonster);
        expect(parsedMonster.Melee).to.deep.equal([
            [
                {"attackDescription": "+5 dancing greatsword", "attackBonuses": [35, 30, 25, 20], "damageDice": "3d6", "damageMod": 18,specialAttacks:''},
                {"attackDescription": "2 wings", "attackBonuses": [30], "damageDice": "2d6", "damageMod": 12,specialAttacks:''}
            ]
        ]);
    });

    it("should parse strings with multiple attacks groups", function () {
        //"+5 dancing greatsword +35/+30/+25/+20 (3d6+18) or slam +30 (2d8+13)",
        var parsedMonster = service.parseMonster(baseMonster);
        expect(parsedMonster.Melee).to.deep.equal([
            [
                {"attackDescription": "+5 dancing greatsword", "attackBonuses": [35, 30, 25, 20], "damageDice": "3d6", "damageMod": 18,specialAttacks:''}
            ],
            [
                {"attackDescription": "slam", "attackBonuses": [30], "damageDice": "2d8", "damageMod": 13,specialAttacks:''}
            ]
        ]);
    });
    it("should parse special attacks ", function () {
        baseMonster.Melee = "+5 dancing greatsword +35/+30/+25/+20 (3d6+18 plus grab)";
        var parsedMonster = service.parseMonster(baseMonster);

        expect(parsedMonster.Melee).to.deep.equal([
            [
                {"attackDescription": "+5 dancing greatsword", "attackBonuses": [35, 30, 25, 20], "damageDice": "3d6", "damageMod": 18,specialAttacks:'plus grab'}
            ]
        ]);
    });
    it("should parse attacks when they are separated with 'and' instead of ','", function () {
        baseMonster.Melee = "+5 dancing greatsword +35/+30/+25/+20 (3d6+18) and 2 wings +30 (2d6+12)";
        var parsedMonster = service.parseMonster(baseMonster);
        expect(parsedMonster.Melee).to.deep.equal([
            [
                {"attackDescription": "+5 dancing greatsword", "attackBonuses": [35, 30, 25, 20], "damageDice": "3d6", "damageMod": 18,specialAttacks:''},
                {"attackDescription": "2 wings", "attackBonuses": [30], "damageDice": "2d6", "damageMod": 12,specialAttacks:''}
            ]
        ]);
    });

    it("should parse ranged attacks ", function () {
        baseMonster.Ranged = "+5 longbow +31/+26/+21/+16 (2d6+14 plus slaying arrow)";
        var parsedMonster = service.parseMonster(baseMonster);
        expect(parsedMonster.Ranged).to.deep.equal([
            [
                {"attackDescription": "+5 longbow", "attackBonuses": [31, 26, 21, 16], "damageDice": "2d6", "damageMod": 14,specialAttacks:'plus slaying arrow'}
            ]
        ]);
    });

    it("should parse ranged attacks ", function () {
        baseMonster.Ranged = "+5 composite longbow (+9 Str bonus) +31/+26/+21/+16 (2d6+14 plus slaying arrow)";
        var parsedMonster = service.parseMonster(baseMonster);
        expect(parsedMonster.Ranged).to.deep.equal([
            [
                {"attackDescription": "+5 composite longbow (+9 Str bonus)", "attackBonuses": [31, 26, 21, 16], "damageDice": "2d6", "damageMod": 14, specialAttacks:'plus slaying arrow'}
            ]
        ]);
    });

    it("should not throw an exception if Melee is missing", function () {
        baseMonster.Melee = undefined;
        service.parseMonster(baseMonster);
    });

    it("should not throw an exception if Ranged is missing", function () {
        baseMonster.Ranged = undefined;
        service.parseMonster(baseMonster);
    });

    it("should try to guess the natural armor (monster with armor in treasure)", function () {
        baseMonster.Treasure = "Some armor.";
        var parsedMonster = service.parseMonster(baseMonster);
        expect(parsedMonster.naturalArmor).to.equal(0);
    });

    it("should try to guess the natural armor (monster with armor in treasure)", function () {
        baseMonster.Treasure = "Nothing.";
        baseMonster.AC = "44, touch 11, flat-footed 42";
        var parsedMonster = service.parseMonster(baseMonster);
        expect(parsedMonster.naturalArmor).to.equal(42-11);
    });
});