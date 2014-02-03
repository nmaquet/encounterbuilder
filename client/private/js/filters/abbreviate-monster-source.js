'use strict';

DEMONSQUID.MONSTER_SOURCE_ABBREVIATIONS =
{
    "PFRPG Bestiary 2": "PB2",
    "PFRPG Bestiary 3": "PB3",
    "Lands Of The Linnorm Kings": "LLK",
    "Lost Cities Of Golarion": "LCG",
    "PFRPG Bestiary": "PB1",
    "City of Golden Death": "CGD",
    "Heart of the Jungle": "HJ",
    "d20pfsrd": "PFSRD",
    "Book of the Damned V1": "BD",
    "Misfit Monsters": "MM",
    "Tome of Horrors Revised": "THR",
    "Godsmouth Heresy": "GH",
    "The Witchwar Legacy": "WL",
    "Book of the Damned V2": "BDV2",
    "Inner Sea World Guide": "ISWG",
    "Tomb Of The Iron Medusa": "TIM",
    "Undead Revisited": "UR",
    "The Harrowing": "HAR",
    "Ultimate Magic": "UM",
    "Tome of Horrors Complete": "THC",
    "Core Race": "CR",
    "Cult Of The Ebon Destroyers": "CED",
    "Academy Of Secrets": "AoS",
    "Isles Of The Shackles": "IS",
    "Magnimar City Of Monuments": "MCM",
    "Distant Worlds": "DW",
    "Inner Sea Bestiary": "ISB",
    "Irrisen Land Of Eternal Winter": "ILEW",
    "Reign Of Winter Player's Guide": "RWPG",
    "Animal Archive": "AA",
    "Lost Kingdoms": "LK",
    "Mythic Adventures": "MA",
    "Mystery Monsters Revisited": "MMR",
    "The Moonscar": "M",
    "Fey Revisited": "FR",
    "City of Strangers": "CoS",
    "Horsemen Of The Apocalypse": "HA",
    "Dungeons Of Golarion": "DG",
    "The Feast Of Ravenmoor": "FR",
    "The Ruby Phoenix Tournament": "RPT",
    "RotRL-AE-Appendix": "ROTRL",
    "PFS S1-35": "PFS",
    "Chronicle Of The Righteous": "CR",
    "The Worldwound": "TW",
    "No Response From Deepmar": "NRFD",
    "Artifacts & Legends": "AL",
    "Murder's Mark": "MM",
    "PFS S1-36": "PFS",
    "Carrion Hill": "CH",
    "Broken Chains": "BC",
    "The Dragon's Demand": "TDD",
    "Masks Of The Living God": "MLG"
};

DEMONSQUID.encounterBuilderFilters.filter('abbreviateMonsterSource', function () {
    return function (source) {
        if (source.length <= 5) {
            return source;
        }
        return DEMONSQUID.MONSTER_SOURCE_ABBREVIATIONS[source] || "?";
    };
});

