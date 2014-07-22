"use strict";

var expect = chai.expect;

var service;

describe("templateService", function () {

    var baseMonster = null;
    beforeEach(module("encounterBuilderApp"));

    beforeEach(inject(function (_templateService_) {
        service = _templateService_;
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
            "CompanionFamiliarLink": "NULL",
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

    it("shouldn't do anything if no templates are selected", function () {
        baseMonster.templates = {};
        var templatedMonster = service.createTemplatedMonster(baseMonster);
        expect(templatedMonster).to.deep.equal(baseMonster);
    });

    it("shouldn't crash on a monster with Resist sonic 30", function () {
        baseMonster.templates = {};
        baseMonster.Resist = "Sonic 30";
        service.createTemplatedMonster(baseMonster);
    });

    it("shouldn't crash on a monster with a undentified resistance", function () {
        baseMonster.templates = {};
        baseMonster.Resist = "Sarcasm 30";
        service.createTemplatedMonster(baseMonster);
    });

    it("should identify a failure on a monster with a undentified resistance", function () {
        baseMonster.templates = {};
        baseMonster.Resist = "Sarcasm 30";
        var failures = {};
        service.createTemplatedMonster(baseMonster, failures);
        expect(failures.Resist).to.equal("unknown energy: sarcasm");
    });

    describe("Advanced Template", function () {

        it("should  add '(Advanced)' to the Name for advanced template", function () {
            baseMonster.templates = {
                advanced: true
            };
            expect(service.createTemplatedMonster(baseMonster).Name).to.equal("Solar (Advanced)");
        });


        it("should  add 1 to the CR for advanced template", function () {
            baseMonster.templates = {
                advanced: true
            };
            expect(service.createTemplatedMonster(baseMonster).CR).to.equal(24);
        });

        it("should  adjust the xp according to the new  CR", function () {
            baseMonster.templates = {
                advanced: true
            };
            expect(service.createTemplatedMonster(baseMonster).XP).to.equal(1228800);
        });

        it("should  adjust the ability scores", function () {
            baseMonster.templates = {
                advanced: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Str).to.equal(32);
            expect(templatedMonster.Dex).to.equal(24);
            expect(templatedMonster.Con).to.equal(34);
            expect(templatedMonster.Int).to.equal(27);
            expect(templatedMonster.Wis).to.equal(31);
            expect(templatedMonster.Cha).to.equal(29);
        });

        it("should adjust the saves", function () {
            baseMonster.templates = {
                advanced: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Fort).to.equal(25 + 2);
            expect(templatedMonster.Ref).to.equal(14 + 2);
            expect(templatedMonster.Will).to.equal(23 + 2);
        });

        it("should adjust the AC", function () {
            baseMonster.templates = {
                advanced: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.AC).to.equal("48, touch 15, flat-footed 46");
        });

        it("should adjust the CMD", function () {
            baseMonster.templates = {
                advanced: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.CMD).to.equal(47 + 4);
        });

        it("should adjust the CMB", function () {
            baseMonster.templates = {
                advanced: true
            };
            baseMonster.CMB = "-1";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.CMB).to.equal("+1");
        });
        it("should adjust the CMB even if it's negative", function () {
            baseMonster.templates = {
                advanced: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.CMB).to.equal("+34");
        });

        it("should still work if the CMB or CMD isn't a Number", function () {
            baseMonster.templates = {
                advanced: true
            };
            baseMonster.CMB = "-";
            baseMonster.CMD = "-";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.CMB).to.equal("-");
            expect(templatedMonster.CMD).to.equal("-");
        });

        it("should  not adjust int if base creature has less than 3", function () {
            baseMonster.templates = {
                advanced: true
            };
            baseMonster.Int = 2;
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Str).to.equal(32);
            expect(templatedMonster.Dex).to.equal(24);
            expect(templatedMonster.Con).to.equal(34);
            expect(templatedMonster.Int).to.equal(2);
            expect(templatedMonster.Wis).to.equal(31);
            expect(templatedMonster.Cha).to.equal(29);
        });

        it("should  add 44 HP ", function () {
            baseMonster.templates = {
                advanced: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.HP).to.equal(407);
            expect(templatedMonster.HD).to.equal("(22d10+286)");
        });

        it("should be resilient to erroneous HD", function () {
            baseMonster.templates = {
                advanced: true
            };
            baseMonster.HD = "(22+6)";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.HD).to.equal("(22+6)");
        });

        it("should  add 2 to Init ", function () {
            baseMonster.templates = {
                advanced: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Init).to.equal("+11");
        });

        it("should  add 2 to Skills ", function () {
            baseMonster.templates = {
                advanced: true
            };
            baseMonster.Skills = "Craft (any one) +31, Diplomacy +32";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Skills).to.equal("Craft (any one) +33, Diplomacy +34");
        });

        it("should adjust the melee attack rolls", function () {
            baseMonster.templates = {
                advanced: true
            };
            baseMonster.Melee = "+5 dancing greatsword +35/+30/+25/+20 (3d6+18), 2 wings +30 (2d6+12)";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Melee).to.equal("+5 dancing greatsword +37/+32/+27/+22 (3d6+20), 2 wings +32 (2d6+14)");
        });

        it("should adjust the ranged attack rolls", function () {
            baseMonster.templates = {
                advanced: true
            };
            baseMonster.Ranged = "+5 longbow +31/+26/+21/+16 (2d6+14 plus slaying arrow)";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Ranged).to.equal("+5 longbow +33/+28/+23/+18 (2d6+14 plus slaying arrow)");
        });

        it("should adjust the ranged attack rolls, event for FREAKING COMPOSITE LONGBOWS", function () {
            baseMonster.templates = {
                advanced: true
            };
            baseMonster.Ranged = "+5 composite longbow (+9 Str bonus) +31/+26/+21/+16 (2d6+14 plus slaying arrow)";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Ranged).to.equal("+5 composite longbow (+11 Str bonus) +33/+28/+23/+18 (2d6+16 plus slaying arrow)");
        });

        it("should  add 2 to SpecialAbilities DC", function () {
            baseMonster.templates = {
                advanced: true
            };
            baseMonster.SpecialAbilities = "<h5><b>Gaze (Ex)</b> Turn to stone permanently (as flesh to stone), range 30 feet, Fortitude DC 15 negates. A creature petrified in this matter that is then coated (not just splashed) with fresh basilisk blood (taken from a basilisk no more than 1 hour dead) is instantly restored to flesh. A single basilisk contains enough blood to coat 1d3 Medium creatures in this manner. The save DC is Constitution-based.</h5>";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.SpecialAbilities).to.equal("<h5><b>Gaze (Ex)</b> Turn to stone permanently (as flesh to stone), range 30 feet, Fortitude DC 17 negates. A creature petrified in this matter that is then coated (not just splashed) with fresh basilisk blood (taken from a basilisk no more than 1 hour dead) is instantly restored to flesh. A single basilisk contains enough blood to coat 1d3 Medium creatures in this manner. The save DC is Constitution-based.</h5>");
        });

    });

    describe("Multiple templates", function () {

        it("should have all the template names, sorted alphabetically", function () {
            baseMonster.templates = {
                advanced: true,
                young: true
            };

            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Name).to.equal("Solar (Advanced, Young)");
        });

    });

    describe("Young template", function () {

        it("should remove 44 HP ", function () {
            baseMonster.templates = {
                young: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.HP).to.equal(363 - 44);
            expect(templatedMonster.HD).to.equal("(22d10+198)");
        });

        it("should modify the name", function () {
            baseMonster.templates = {
                young: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Name).to.equal("Solar (Young)");
        });

        it("should augment Dex and reduce Str and Con by four", function () {
            baseMonster.templates = {
                young: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Str).to.equal(28 - 4);
            expect(templatedMonster.Dex).to.equal(20 + 4);
            expect(templatedMonster.Con).to.equal(30 - 4);
        });

        it("should not reduce abilities below 3", function () {
            baseMonster.templates = {
                young: true
            };
            baseMonster.Str = 4;
            baseMonster.Con = 6;
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Str).to.equal(3);
            expect(templatedMonster.Con).to.equal(3);
        });

        it("should reduce theFort saves by 2 and increase the Ref save by 2", function () {
            baseMonster.templates = {
                young: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Fort).to.equal(25 - 2);
            expect(templatedMonster.Ref).to.equal(14 + 2);
            expect(templatedMonster.Will).to.equal(23);
        });

        it("should increase the Dex modifier to AC by 2, and reduce natural amor by 2 (no natural armor)", function () {
            baseMonster.templates = {
                young: true
            };
            baseMonster.AC = "25, touch 10, flat-footed 20";
            baseMonster.AC_Mods = "(+8 armor)";
            baseMonster.Treasure = "Some armor";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.AC).to.equal("28, touch 13, flat-footed 21");
            expect(templatedMonster.AC_Mods).to.equal("(+8 armor, +2 Dex, +0 size)");
        });

        it("should increase the Dex modifier to AC by 2, and reduce natural amor by 2 (with natural armor 1)", function () {
            baseMonster.templates = {
                young: true
            };
            baseMonster.AC = "25, touch 24, flat-footed 11";
            baseMonster.AC_Mods = "(+8 armor, +1 natural, -1 size)";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.AC).to.equal("27, touch 27, flat-footed 11");
            expect(templatedMonster.AC_Mods).to.equal("(+8 armor, +0 natural, +0 size, +2 Dex)");
        });

        it("should increase the Dex modifier to AC by 2, and reduce natural amor by 2 (with natural armor 3)", function () {
            baseMonster.templates = {
                young: true
            };
            baseMonster.AC = "27, touch 24, flat-footed 11";
            baseMonster.AC_Mods = "(+8 armor, +3 natural, -1 size)";
            baseMonster.Treasure = "";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.AC).to.equal("28, touch 27, flat-footed 10");
            expect(templatedMonster.AC_Mods).to.equal("(+8 armor, +1 natural, +0 size, +2 Dex)");
        });

        it("should change the damage dices", function () {
            baseMonster.templates = {
                young: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Melee).to.equal("+5 dancing greatsword +34/+29/+24/+19 (2d6+16) or slam +29 (1d10+11)");
            expect(templatedMonster.Ranged).to.equal("+5 composite longbow (+7 Str bonus) +34/+29/+24/+19 (1d8+12 plus slaying arrow)");
        });

        it("should change the size", function () {
            baseMonster.templates = {
                young: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Size).to.equal("Medium");
        });

        it("should have +2 initiative", function () {
            baseMonster.templates = {
                young: true
            };
            baseMonster.Init = "+4";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Init).to.equal("+6");
        });

        it("should have +2 to Dex based skills", function () {
            baseMonster.templates = {
                young: true
            };
            baseMonster.Skills = "Acrobatics +0, Intimidate +2";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Skills).to.equal("Acrobatics +2, Intimidate +2");
        });

        it("should have -2 to Str-based skills", function () {
            baseMonster.templates = {
                young: true
            };
            baseMonster.Skills = "Climb +0, Swim +2, Ride +3";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Skills).to.equal("Climb -2, Swim +0, Ride +5");
        });

        it("should have +6 to Stealth", function () {
            baseMonster.templates = {
                young: true
            };
            baseMonster.Skills = "Stealth +2";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Skills).to.equal("Stealth +8");
        });

        it("should have +4 to Fly", function () {
            baseMonster.templates = {
                young: true
            };
            baseMonster.Skills = "Fly +2";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Skills).to.equal("Fly +6");
        });

        it("takes the size difference into account in AC mods, even in extreme cases (Diminutive)", function () {
            baseMonster.templates = {
                young: true
            };
            baseMonster.Size = "Diminutive";
            baseMonster.AC = "AC 10, touch 10, flat-footed 10";
            baseMonster.AC_Mods = "(+4 size)";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.AC).to.equal("16, touch 16, flat-footed 14");
            expect(templatedMonster.AC_Mods).to.equal("(+8 size, +2 Dex)");
        });

        it("takes the size difference into account in AC mods, even in extreme cases (Colossal)", function () {
            baseMonster.templates = {
                young: true
            };
            baseMonster.Size = "Colossal";
            baseMonster.AC = "AC 10, touch 10, flat-footed 10";
            baseMonster.AC_Mods = "(-8 size)";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.AC).to.equal("16, touch 16, flat-footed 14");
            expect(templatedMonster.AC_Mods).to.equal("(-4 size, +2 Dex)");
        });

        it("should not reduce the CR below 1/3", function () {
            baseMonster.templates = {
                young: true
            };
            baseMonster.CR = 1 / 3;
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.CR).to.equal(1 / 3);
        });


    });

    describe("Giant template", function () {

        it("should add 44 HP ", function () {
            baseMonster.templates = {
                giant: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.HP).to.equal(363 + 44);
            expect(templatedMonster.HD).to.equal("(22d10+286)");
        });

        it("should modify the name", function () {
            baseMonster.templates = {
                giant: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Name).to.equal("Solar (Giant)");
        });

        it("should reduce Dex and augment Str and Con by four", function () {
            baseMonster.templates = {
                giant: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Str).to.equal(28 + 4);
            expect(templatedMonster.Dex).to.equal(20 - 2);
            expect(templatedMonster.Con).to.equal(30 + 4);
        });

        it("should not reduce abilities below 3", function () {
            baseMonster.templates = {
                giant: true
            };
            baseMonster.Dex = 4;
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Dex).to.equal(3);
        });

        it("should reduce theFort saves by 2 and increase the Ref save by 2", function () {
            baseMonster.templates = {
                giant: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Fort).to.equal(25 + 2);
            expect(templatedMonster.Ref).to.equal(14 - 1);
            expect(templatedMonster.Will).to.equal(23);
        });

        it("should reduce the Dex modifier to AC by 1, and increase natural amor by 3 (no natural armor)", function () {
            baseMonster.templates = {
                giant: true
            };
            baseMonster.AC = "25, touch 10, flat-footed 20";
            baseMonster.AC_Mods = "(+8 armor)";
            baseMonster.Treasure = "Some armor";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.AC).to.equal("26, touch 8, flat-footed 22");
            expect(templatedMonster.AC_Mods).to.equal("(+8 armor, -1 Dex, -2 size, +3 natural)");
        });

        it("should reduce the Dex modifier to AC by 1, and increase natural amor by 3 (with natural armor 1)", function () {
            baseMonster.templates = {
                giant: true
            };
            baseMonster.AC = "25, touch 24, flat-footed 11";
            baseMonster.AC_Mods = "(+8 armor, +1 natural, -1 size)";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.AC).to.equal("26, touch 22, flat-footed 13");
            expect(templatedMonster.AC_Mods).to.equal("(+8 armor, +4 natural, -2 size, -1 Dex)");
        });

        it("should reduce the Dex modifier to AC by 1, and increase natural amor by 3 (with natural armor 3)", function () {
            baseMonster.templates = {
                giant: true
            };
            baseMonster.AC = "27, touch 24, flat-footed 11";
            baseMonster.AC_Mods = "(+8 armor, +3 natural, -1 size)";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.AC).to.equal("28, touch 22, flat-footed 13");
            expect(templatedMonster.AC_Mods).to.equal("(+8 armor, +6 natural, -2 size, -1 Dex)");
        });

        it("should change the damage dices", function () {
            baseMonster.templates = {
                giant: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Melee).to.equal("+5 dancing greatsword +36/+31/+26/+21 (4d6+20) or slam +31 (3d8+15)");
            expect(templatedMonster.Ranged).to.equal("+5 composite longbow (+11 Str bonus) +29/+24/+19/+14 (3d6+16 plus slaying arrow)");
        });

        it("should change the size", function () {
            baseMonster.templates = {
                giant: true
            };
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Size).to.equal("Huge");
        });

        it("should have -1 initiative", function () {
            baseMonster.templates = {
                giant: true
            };
            baseMonster.Init = "+4";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Init).to.equal("+3");
        });

        it("should have -1 to Dex based skills", function () {
            baseMonster.templates = {
                giant: true
            };
            baseMonster.Skills = "Acrobatics +0, Intimidate +2";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Skills).to.equal("Acrobatics -1, Intimidate +2");
        });

        it("should have +2 to Str-based skills", function () {
            baseMonster.templates = {
                giant: true
            };
            baseMonster.Skills = "Climb +0, Swim +2, Ride +3";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Skills).to.equal("Climb +2, Swim +4, Ride +2");
        });

        it("should have -5 to Stealth", function () {
            baseMonster.templates = {
                giant: true
            };
            baseMonster.Skills = "Stealth +2";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Skills).to.equal("Stealth -3");
        });

        it("should have -3 to Fly", function () {
            baseMonster.templates = {
                giant: true
            };
            baseMonster.Skills = "Fly +2";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Skills).to.equal("Fly -1");
        });

        it("takes the size difference into account in AC mods, even in extreme cases (Fine)", function () {
            baseMonster.templates = {
                giant: true
            };
            baseMonster.Size = "Fine";
            baseMonster.AC = "10, touch 10, flat-footed 10";
            baseMonster.AC_Mods = "(+8 size)";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.AC).to.equal("8, touch 5, flat-footed 9");
            expect(templatedMonster.AC_Mods).to.equal("(+4 size, -1 Dex, +3 natural)");
        });

        it("takes the size difference into account in AC mods, even in extreme cases (Gargantuan)", function () {
            baseMonster.templates = {
                giant: true
            };
            baseMonster.Size = "Gargantuan";
            baseMonster.AC = "10, touch 10, flat-footed 10";
            baseMonster.AC_Mods = "(-4 size)";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.AC).to.equal("8, touch 5, flat-footed 9");
            expect(templatedMonster.AC_Mods).to.equal("(-8 size, -1 Dex, +3 natural)");
        });
        it("should have correct AC for Giant Chimera", function () {
            baseMonster.templates = {
                giant: true
            };
            baseMonster.Size = "Large";
            baseMonster.AC = "AC 19, touch 10, flat-footed 18";
            baseMonster.AC_Mods = "(+1 Dex, +9 natural, -1 size)";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.AC).to.equal("20, touch 8, flat-footed 20");
            expect(templatedMonster.AC_Mods).to.equal("(+0 Dex, +12 natural, -2 size)");
        });
        it("takes the size difference into account in CMB and CMD", function () {
            baseMonster.templates = {
                giant: true
            };
            baseMonster.Size = "Gargantuan";
            baseMonster.CMB = "+26";
            baseMonster.CMD = "26";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.CMB).to.equal("+28");
            expect(templatedMonster.CMD).to.equal(31);
        });
    });
    describe("Fiendish template", function () {

        it("should add resistance according to number of hit dice 22HD", function () {
            baseMonster.templates = {
                fiendish: true
            };
            delete baseMonster.Resist;
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Resist).to.equal("cold 15, fire 15");
        });
        it("should add resistance according to number of hit dice 1HD", function () {
            baseMonster.templates = {
                fiendish: true
            };
            delete baseMonster.Resist;
            baseMonster.HD = "(1d10+242)";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Resist).to.equal("cold 5, fire 5");
        });
        it("should add resistance according to number of hit dice 6HD", function () {
            baseMonster.templates = {
                fiendish: true
            };
            delete baseMonster.Resist;
            baseMonster.HD = "(6d10+242)";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Resist).to.equal("cold 10, fire 10");
        });
        it("should not change resist if base monster already has higher resistance", function () {
            baseMonster.templates = {
                fiendish: true
            };
            baseMonster.Resist = "cold 15, fire 15";
            baseMonster.HD = "(1d10+242)";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Resist).to.equal("cold 15, fire 15");
        });
        it("should add Darkvision if the monster doesn't already have it", function () {
            baseMonster.templates = {
                fiendish: true
            };
            baseMonster.Senses = "low- light vision, detect evil, detect snares and pits, true seeing; Perception +33";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.Senses).to.equal("darkvision 60 ft., low- light vision, detect evil, detect snares and pits, true seeing; Perception +33");
        });
        it("should add SR according to the new CR", function () {
            baseMonster.templates = {
                fiendish: true
            };
            delete baseMonster.SR;
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.SR).to.equal(29);
        });
        it("should not change SR when base monster has higher SR than template", function () {
            baseMonster.templates = {
                fiendish: true
            };
            baseMonster.SR = "34";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.SR).to.equal(34);
        });
        it("should add  dr/good according to number of HD", function () {
            baseMonster.templates = {
                fiendish: true
            };
            baseMonster.HD = "(5d10+242)";
            delete baseMonster.DR;
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.DR).to.equal("5/good");
        });
        it("should add  dr/good according to number of HD", function () {
            baseMonster.templates = {
                fiendish: true
            };
            baseMonster.HD = "(11d10+242)";
            delete baseMonster.DR;
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.DR).to.equal("10/good");
        });
        it("should add  dr/good according to number of HD", function () {
            baseMonster.templates = {
                fiendish: true
            };
            baseMonster.HD = "(11d10+242)";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.DR).to.equal("15/epic and evil, 10/good");
        });
        it("should add  smite good to the special attacks", function () {
            baseMonster.templates = {
                fiendish: true
            };
            baseMonster.SpecialAttacks = "fire breath";
            var templatedMonster = service.createTemplatedMonster(baseMonster);
            expect(templatedMonster.SpecialAttacks).to.equal("fire breath, smite good (1/day)");
        });
    });
});