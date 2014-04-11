"use strict";

var clone = require('./../utils')().clone;

var diceService;

var random_art = {
    1: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [5, 6, 7, 9, 17, 21, 25, 29, 30, 32, 36, 39, 42, 44, 46, 51, 52, 55, 60, 66, 71, 74, 80, 83, 87, 90, 93, 96, 97],
        valueTable: [
            {"Price": 15.0, "PriceUnit": "gp", "Name": "Bronze statuette of a warrior", "id": "bronze-statuette-of-a-warrior"},
            {"Price": 20.0, "PriceUnit": "gp", "Name": "Elaborate copper wind chimes", "id": "elaborate-copper-wind-chimes"},
            {"Price": 20.0, "PriceUnit": "gp", "Name": "Painted paper fan with silver slats", "id": "painted-paper-fan-with-silver-slats"},
            {"Price": 25.0, "PriceUnit": "gp", "Name": "Copper and glass decanter", "id": "copper-and-glass-decanter"},
            {"Price": 25.0, "PriceUnit": "gp", "Name": "Silver holy symbol", "id": "silver-holy-symbol"},
            {"Price": 30.0, "PriceUnit": "gp", "Name": "Carved stone idol", "id": "carved-stone-idol"},
            {"Price": 30.0, "PriceUnit": "gp", "Name": "Set of six ivory dice", "id": "set-of-six-ivory-dice"},
            {"Price": 40.0, "PriceUnit": "gp", "Name": "Ivory bowl with animal carvings", "id": "ivory-bowl-with-animal-carvings"},
            {"Price": 40.0, "PriceUnit": "gp", "Name": "Porcelain doll with silk clothing", "id": "porcelain-doll-with-silk-clothing"},
            {"Price": 40.0, "PriceUnit": "gp", "Name": "Porcelain mask", "id": "porcelain-mask"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Bronze flagon with warrior images", "id": "bronze-flagon-with-warrior-images"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Copper brazier with religious markings", "id": "copper-brazier-with-religious-markings"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Copper scepter with gold inlay", "id": "copper-scepter-with-gold-inlay"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Crystal egg with silver stand", "id": "crystal-egg-with-silver-stand"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Painting of a noblewoman", "id": "painting-of-a-noblewoman"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Polished darkwood chalice", "id": "polished-darkwood-chalice"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Silver baby rattle", "id": "silver-baby-rattle"},
            {"Price": 50.0, "PriceUnit": "gp", "Name": "Silver chess set", "id": "silver-chess-set"},
            {"Price": 60.0, "PriceUnit": "gp", "Name": "Carved ivory scroll case", "id": "carved-ivory-scroll-case"},
            {"Price": 60.0, "PriceUnit": "gp", "Name": "Decorated silver plate", "id": "decorated-silver-plate"},
            {"Price": 60.0, "PriceUnit": "gp", "Name": "Ivory drinking horn with copper ends", "id": "ivory-drinking-horn-with-copper-ends"},
            {"Price": 60.0, "PriceUnit": "gp", "Name": "Silver noble family seal", "id": "silver-noble-family-seal"},
            {"Price": 65.0, "PriceUnit": "gp", "Name": "Silver statue of a dragon", "id": "silver-statue-of-a-dragon"},
            {"Price": 70.0, "PriceUnit": "gp", "Name": "Electrum censer with silver filigree", "id": "electrum-censer-with-silver-filigree"},
            {"Price": 75.0, "PriceUnit": "gp", "Name": "Silver candelabra with holy symbol", "id": "silver-candelabra-with-holy-symbol"},
            {"Price": 75.0, "PriceUnit": "gp", "Name": "Silver comb with ornate handle", "id": "silver-comb-with-ornate-handle"},
            {"Price": 75.0, "PriceUnit": "gp", "Name": "Silver hand mirror", "id": "silver-hand-mirror"},
            {"Price": 80.0, "PriceUnit": "gp", "Name": "Crystal skull", "id": "crystal-skull"},
            {"Price": 80.0, "PriceUnit": "gp", "Name": "Ornate silver flute", "id": "ornate-silver-flute"},
            {"Price": 85.0, "PriceUnit": "gp", "Name": "Engraved jade scarab", "id": "engraved-jade-scarab"}
        ]
    },
    2: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [2, 8, 10, 12, 17, 20, 22, 26, 30, 31, 35, 38, 41, 44, 45, 53, 56, 58, 61, 65, 69, 72, 77, 81, 85, 88, 90, 92, 97],
        valueTable: [
            {"Price": 60.0, "PriceUnit": "gp", "Name": "Elaborate silver wind chimes", "id": "elaborate-silver-wind-chimes"},
            {"Price": 75.0, "PriceUnit": "gp", "Name": "Engraved gold scarab", "id": "engraved-gold-scarab"},
            {"Price": 75.0, "PriceUnit": "gp", "Name": "Painted silk fan with electrum slats", "id": "painted-silk-fan-with-electrum-slats"},
            {"Price": 75.0, "PriceUnit": "gp", "Name": "Preserved beast head on a plaque", "id": "preserved-beast-head-on-a-plaque"},
            {"Price": 75.0, "PriceUnit": "gp", "Name": "Set of six silver dice", "id": "set-of-six-silver-dice"},
            {"Price": 75.0, "PriceUnit": "gp", "Name": "Silver and glass decanter", "id": "silver-and-glass-decanter"},
            {"Price": 75.0, "PriceUnit": "gp", "Name": "Silver bowl with lion engravings", "id": "silver-bowl-with-lion-engravings"},
            {"Price": 75.0, "PriceUnit": "gp", "Name": "Silver mask", "id": "silver-mask"},
            {"Price": 80.0, "PriceUnit": "gp", "Name": "Carved jade idol", "id": "carved-jade-idol"},
            {"Price": 80.0, "PriceUnit": "gp", "Name": "Porcelain doll with furs and jewelry", "id": "porcelain-doll-with-furs-and-jewelry"},
            {"Price": 80.0, "PriceUnit": "gp", "Name": "Silver brazier with religious markings", "id": "silver-brazier-with-religious-markings"},
            {"Price": 80.0, "PriceUnit": "gp", "Name": "Silver flagon with religious markings", "id": "silver-flagon-with-religious-markings"},
            {"Price": 90.0, "PriceUnit": "gp", "Name": "Gold censer with silver filigree", "id": "gold-censer-with-silver-filigree"},
            {"Price": 100.0, "PriceUnit": "gp", "Name": "Gold and silver chess set", "id": "gold-and-silver-chess-set"},
            {"Price": 100.0, "PriceUnit": "gp", "Name": "Gold baby rattle", "id": "gold-baby-rattle"},
            {"Price": 100.0, "PriceUnit": "gp", "Name": "Gold holy symbol", "id": "gold-holy-symbol"},
            {"Price": 100.0, "PriceUnit": "gp", "Name": "Masterwork lyre", "id": "masterwork-lyre"},
            {"Price": 100.0, "PriceUnit": "gp", "Name": "Painting of a princess", "id": "painting-of-a-princess"},
            {"Price": 100.0, "PriceUnit": "gp", "Name": "Silver cup with royal crest", "id": "silver-cup-with-royal-crest"},
            {"Price": 110.0, "PriceUnit": "gp", "Name": "Decorated electrum plate", "id": "decorated-electrum-plate"},
            {"Price": 110.0, "PriceUnit": "gp", "Name": "Gold statue of a dragon", "id": "gold-statue-of-a-dragon"},
            {"Price": 110.0, "PriceUnit": "gp", "Name": "Gold statue of a lion", "id": "gold-statue-of-a-lion"},
            {"Price": 110.0, "PriceUnit": "gp", "Name": "Ivory drinking horn with silver ends", "id": "ivory-drinking-horn-with-silver-ends"},
            {"Price": 120.0, "PriceUnit": "gp", "Name": "Gold and silver hand mirror", "id": "gold-and-silver-hand-mirror"},
            {"Price": 120.0, "PriceUnit": "gp", "Name": "Silver cauldron with animal symbols", "id": "silver-cauldron-with-animal-symbols"},
            {"Price": 125.0, "PriceUnit": "gp", "Name": "Silver comb with gold handle", "id": "silver-comb-with-gold-handle"},
            {"Price": 125.0, "PriceUnit": "gp", "Name": "Silver egg with dragon figurine", "id": "silver-egg-with-dragon-figurine"},
            {"Price": 125.0, "PriceUnit": "gp", "Name": "Silver scepter with eagle symbols", "id": "silver-scepter-with-eagle-symbols"},
            {"Price": 150.0, "PriceUnit": "gp", "Name": "Silver chalice with dragon carvings", "id": "silver-chalice-with-dragon-carvings"},
            {"Price": 200.0, "PriceUnit": "gp", "Name": "Gold candelabra with holy symbol", "id": "gold-candelabra-with-holy-symbol"}
        ]
    },
    3: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [3, 13, 19, 24, 28, 32, 35, 41, 42, 48, 51, 56, 65, 69, 77, 81, 88, 93, 96],
        valueTable: [
            {"Price": 300.0, "PriceUnit": "gp", "Name": "Gilded demon skull", "id": "gilded-demon-skull"},
            {"Price": 300.0, "PriceUnit": "gp", "Name": "Marble idol", "id": "marble-idol"},
            {"Price": 300.0, "PriceUnit": "gp", "Name": "Masterwork darkwood lute", "id": "masterwork-darkwood-lute"},
            {"Price": 400.0, "PriceUnit": "gp", "Name": "Engraved mithral scarab", "id": "engraved-mithral-scarab"},
            {"Price": 400.0, "PriceUnit": "gp", "Name": "Gold and ivory decanter", "id": "gold-and-ivory-decanter"},
            {"Price": 400.0, "PriceUnit": "gp", "Name": "Gold bowl with dragon engravings", "id": "gold-bowl-with-dragon-engravings"},
            {"Price": 400.0, "PriceUnit": "gp", "Name": "Gold censer with platinum inlay", "id": "gold-censer-with-platinum-inlay"},
            {"Price": 450.0, "PriceUnit": "gp", "Name": "Gold mask", "id": "gold-mask"},
            {"Price": 500.0, "PriceUnit": "gp", "Name": "Gold and mithral baby rattle", "id": "gold-and-mithral-baby-rattle"},
            {"Price": 500.0, "PriceUnit": "gp", "Name": "Gold chess set", "id": "gold-chess-set"},
            {"Price": 500.0, "PriceUnit": "gp", "Name": "Gold flagon with religious markings", "id": "gold-flagon-with-religious-markings"},
            {"Price": 500.0, "PriceUnit": "gp", "Name": "Gold puzzle box", "id": "gold-puzzle-box"},
            {"Price": 500.0, "PriceUnit": "gp", "Name": "Platinum holy symbol", "id": "platinum-holy-symbol"},
            {"Price": 550.0, "PriceUnit": "gp", "Name": "Gold cup with royal crest", "id": "gold-cup-with-royal-crest"},
            {"Price": 600.0, "PriceUnit": "gp", "Name": "Gold chalice with griffon carvings", "id": "gold-chalice-with-griffon-carvings"},
            {"Price": 600.0, "PriceUnit": "gp", "Name": "Mithral scepter with gold inlay", "id": "mithral-scepter-with-gold-inlay"},
            {"Price": 700.0, "PriceUnit": "gp", "Name": "Decorated gold plate", "id": "decorated-gold-plate"},
            {"Price": 750.0, "PriceUnit": "gp", "Name": "Gold and platinum statuette of a deity", "id": "gold-and-platinum-statuette-of-a-deity"},
            {"Price": 750.0, "PriceUnit": "gp", "Name": "Gold cauldron with alchemical symbols", "id": "gold-cauldron-with-alchemical-symbols"},
            {"Price": 750.0, "PriceUnit": "gp", "Name": "Painting of a queen", "id": "painting-of-a-queen"}
        ]
    },
    4: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [5, 11, 18, 22, 26, 31, 36, 41, 46, 51, 52, 55, 64, 68, 71, 77, 81, 87, 93],
        valueTable: [
            {"Price": 700.0, "PriceUnit": "gp", "Name": "Engraved platinum scarab", "id": "engraved-platinum-scarab"},
            {"Price": 800.0, "PriceUnit": "gp", "Name": "Gilded dragon skull", "id": "gilded-dragon-skull"},
            {"Price": 800.0, "PriceUnit": "gp", "Name": "Platinum bowl with arcane engravings", "id": "platinum-bowl-with-arcane-engravings"},
            {"Price": 800.0, "PriceUnit": "gp", "Name": "Platinum censer with ornate markings", "id": "platinum-censer-with-ornate-markings"},
            {"Price": 850.0, "PriceUnit": "gp", "Name": "Gold decanter with grape vine patterns", "id": "gold-decanter-with-grape-vine-patterns"},
            {"Price": 900.0, "PriceUnit": "gp", "Name": "Platinum mask", "id": "platinum-mask"},
            {"Price": 1000.0, "PriceUnit": "gp", "Name": "Gold and mithral chess set", "id": "gold-and-mithral-chess-set"},
            {"Price": 1000.0, "PriceUnit": "gp", "Name": "Gold and platinum orrery", "id": "gold-and-platinum-orrery"},
            {"Price": 1000.0, "PriceUnit": "gp", "Name": "Gold flute", "id": "gold-flute"},
            {"Price": 1000.0, "PriceUnit": "gp", "Name": "Gold idol with strange carvings", "id": "gold-idol-with-strange-carvings"},
            {"Price": 1000.0, "PriceUnit": "gp", "Name": "Platinum baby rattle", "id": "platinum-baby-rattle"},
            {"Price": 1000.0, "PriceUnit": "gp", "Name": "Platinum holy symbol of a famous priest", "id": "platinum-holy-symbol-of-a-famous-priest"},
            {"Price": 1100.0, "PriceUnit": "gp", "Name": "Decorated platinum plate", "id": "decorated-platinum-plate"},
            {"Price": 1100.0, "PriceUnit": "gp", "Name": "Platinum cauldron with odd symbols", "id": "platinum-cauldron-with-odd-symbols"},
            {"Price": 1100.0, "PriceUnit": "gp", "Name": "Platinum flagon with religious markings", "id": "platinum-flagon-with-religious-markings"},
            {"Price": 1200.0, "PriceUnit": "gp", "Name": "Platinum cup with royal crest", "id": "platinum-cup-with-royal-crest"},
            {"Price": 1200.0, "PriceUnit": "gp", "Name": "Platinum scepter with gold inlay", "id": "platinum-scepter-with-gold-inlay"},
            {"Price": 1250.0, "PriceUnit": "gp", "Name": "Platinum chalice with angel carvings", "id": "platinum-chalice-with-angel-carvings"},
            {"Price": 1300.0, "PriceUnit": "gp", "Name": "Platinum statuette of a deity", "id": "platinum-statuette-of-a-deity"},
            {"Price": 1500.0, "PriceUnit": "gp", "Name": "Painting of a queen by a master", "id": "painting-of-a-queen-by-a-master"}
        ]
    },
    5: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [8, 16, 26, 34, 37, 45, 55, 65, 74, 77, 83, 88, 91, 97],
        valueTable: [
            {"Price": 3000.0, "PriceUnit": "gp", "Name": "Book of lost songs by a famous bard", "id": "book-of-lost-songs-by-a-famous-bard"},
            {"Price": 4000.0, "PriceUnit": "gp", "Name": "Darkwood and platinum music box", "id": "darkwood-and-platinum-music-box"},
            {"Price": 4000.0, "PriceUnit": "gp", "Name": "Mithral hourglass with diamond dust", "id": "mithral-hourglass-with-diamond-dust"},
            {"Price": 4500.0, "PriceUnit": "gp", "Name": "Jeweled egg with epic sorcerer's blood", "id": "jeweled-egg-with-epic-sorcerer-s-blood"},
            {"Price": 5000.0, "PriceUnit": "gp", "Name": "Gold urn containing hero's ashes", "id": "gold-urn-containing-hero-s-ashes"},
            {"Price": 5000.0, "PriceUnit": "gp", "Name": "Helm carved from a pit fiend skull", "id": "helm-carved-from-a-pit-fiend-skull"},
            {"Price": 5000.0, "PriceUnit": "gp", "Name": "Holy text penned by a saint", "id": "holy-text-penned-by-a-saint"},
            {"Price": 5000.0, "PriceUnit": "gp", "Name": "Painting of a beloved queen by a master", "id": "painting-of-a-beloved-queen-by-a-master"},
            {"Price": 5000.0, "PriceUnit": "gp", "Name": "Platinum idol with mysterious markings", "id": "platinum-idol-with-mysterious-markings"},
            {"Price": 6000.0, "PriceUnit": "gp", "Name": "Bejeweled sword of state", "id": "bejeweled-sword-of-state"},
            {"Price": 6000.0, "PriceUnit": "gp", "Name": "Carved saint's femur", "id": "carved-saint-s-femur"},
            {"Price": 6000.0, "PriceUnit": "gp", "Name": "Platinum chalice blessed by a saint", "id": "platinum-chalice-blessed-by-a-saint"},
            {"Price": 6500.0, "PriceUnit": "gp", "Name": "Glowing metallic meteor", "id": "glowing-metallic-meteor"},
            {"Price": 7000.0, "PriceUnit": "gp", "Name": "Gold bejeweled royal orb", "id": "gold-bejeweled-royal-orb"},
            {"Price": 7500.0, "PriceUnit": "gp", "Name": "Crystallized dragon heart", "id": "crystallized-dragon-heart"}
        ]
    },
    6: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [6, 13, 16, 22, 31, 40, 46, 55, 64, 72, 79, 83, 89, 93],
        valueTable: [
            {"Price": 7000.0, "PriceUnit": "gp", "Name": "Frozen vampire soul", "id": "frozen-vampire-soul"},
            {"Price": 7000.0, "PriceUnit": "gp", "Name": "Mithral-inlaid unicorn horn", "id": "mithral-inlaid-unicorn-horn"},
            {"Price": 10000.0, "PriceUnit": "gp", "Name": "Crystallized god breath", "id": "crystallized-god-breath"},
            {"Price": 10000.0, "PriceUnit": "gp", "Name": "Essence of truth", "id": "essence-of-truth"},
            {"Price": 10000.0, "PriceUnit": "gp", "Name": "Globe of pristine air", "id": "globe-of-pristine-air"},
            {"Price": 10000.0, "PriceUnit": "gp", "Name": "Heart of the mountain", "id": "heart-of-the-mountain"},
            {"Price": 10000.0, "PriceUnit": "gp", "Name": "Inverted soul gem", "id": "inverted-soul-gem"},
            {"Price": 10000.0, "PriceUnit": "gp", "Name": "Orb of living water", "id": "orb-of-living-water"},
            {"Price": 10000.0, "PriceUnit": "gp", "Name": "Shard of pure fire", "id": "shard-of-pure-fire"},
            {"Price": 10000.0, "PriceUnit": "gp", "Name": "Unmelting ice", "id": "unmelting-ice"},
            {"Price": 11000.0, "PriceUnit": "gp", "Name": "Time jewel", "id": "time-jewel"},
            {"Price": 12000.0, "PriceUnit": "gp", "Name": "Adamantine poiuyt", "id": "adamantine-poiuyt"},
            {"Price": 12000.0, "PriceUnit": "gp", "Name": "Holy text written in saint's blood", "id": "holy-text-written-in-saint-s-blood"},
            {"Price": 12000.0, "PriceUnit": "gp", "Name": "Mithral tribar", "id": "mithral-tribar"},
            {"Price": 13000.0, "PriceUnit": "gp", "Name": "Ethereal tapestry", "id": "ethereal-tapestry"}
        ]
    }
};

function generateArtObject(grade) {
    return random_art[grade].create();
}

module.exports = function (_diceService_) {
    diceService = _diceService_;
    return {
        random_art: random_art,
        generateArtObject: generateArtObject
    }
};