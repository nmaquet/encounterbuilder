"use strict";

var diceService;

var randomPotion = {
    common: {
        "0": function () {
            return diceService.rangeIn100([14, 28, 44, 58, 72, 86], [
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Potion of Arcane mark", "id": "potion-of-arcane-mark"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Potion of Guidance", "id": "potion-of-guidance"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Potion of Light", "id": "potion-of-light"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Potion of Purify food and drink", "id": "potion-of-purify-food-and-drink"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Potion of Resistance", "id": "potion-of-resistance"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Potion of Stabilize", "id": "potion-of-stabilize"},
                {"Price": 25.0, "PriceUnit": "gp", "Name": "Potion of Virtue", "id": "potion-of-virtue"}
            ]);
        },
        "1": function () {
            return diceService.rangeIn100([4, 14, 19, 27, 33, 41, 47, 55, 60, 64, 68, 72, 76, 81, 87, 92], [
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Bless weapon", "id": "potion-of-bless-weapon"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Cure light wounds", "id": "potion-of-cure-light-wounds"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Endure elements", "id": "potion-of-endure-elements"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Enlarge person", "id": "potion-of-enlarge-person"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Jump", "id": "potion-of-jump"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Mage armor", "id": "potion-of-mage-armor"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Magic fang", "id": "potion-of-magic-fang"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Magic weapon", "id": "potion-of-magic-weapon"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Pass without trace", "id": "potion-of-pass-without-trace"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Protection from chaos", "id": "potion-of-protection-from-chaos"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Protection from evil", "id": "potion-of-protection-from-evil"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Protection from good", "id": "potion-of-protection-from-good"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Protection from law", "id": "potion-of-protection-from-law"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Reduce person", "id": "potion-of-reduce-person"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Remove fear", "id": "potion-of-remove-fear"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Sanctuary", "id": "potion-of-sanctuary"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Shield of faith", "id": "potion-of-shield-of-faith"}
            ]);
        },
        "2": function () {
            return diceService.rangeIn100([4, 7, 11, 16, 20, 25, 30, 37, 41, 44, 49, 54, 61, 66, 71, 73, 76, 80, 84, 88, 92, 94, 98], [
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Aid", "id": "potion-of-aid"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Align weapon", "id": "potion-of-align-weapon"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Barkskin", "id": "potion-of-barkskin"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Bear's endurance", "id": "potion-of-bear-s-endurance"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Blur", "id": "potion-of-blur"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Bull's strength", "id": "potion-of-bull-s-strength"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Cat's grace", "id": "potion-of-cat-s-grace"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Cure moderate wounds", "id": "potion-of-cure-moderate-wounds"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Darkvision", "id": "potion-of-darkvision"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Delay poison", "id": "potion-of-delay-poison"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Eagle's splendor", "id": "potion-of-eagle-s-splendor"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Fox's cunning", "id": "potion-of-fox-s-cunning"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Invisibility", "id": "potion-of-invisibility"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Levitate", "id": "potion-of-levitate"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Owl's wisdom", "id": "potion-of-owl-s-wisdom"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Protection from arrows", "id": "potion-of-protection-from-arrows"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Remove paralysis", "id": "potion-of-remove-paralysis"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Resist energy, acid", "id": "potion-of-resist-energy-acid"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Resist energy, cold", "id": "potion-of-resist-energy-cold"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Resist energy, electricity", "id": "potion-of-resist-energy-electricity"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Resist energy, fire", "id": "potion-of-resist-energy-fire"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Resist energy, sonic", "id": "potion-of-resist-energy-sonic"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Spider climb", "id": "potion-of-spider-climb"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Undetectable alignment", "id": "potion-of-undetectable-alignment"}
            ]);
        },
        "3": function () {
            return diceService.rangeIn100([6, 10, 14, 20, 25, 29, 35, 40, 44, 48, 52, 57, 60, 63, 66, 69, 71, 74, 77, 81, 86, 91, 96], [
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Cure serious wounds", "id": "potion-of-cure-serious-wounds"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Dispel magic", "id": "potion-of-dispel-magic"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Displacement", "id": "potion-of-displacement"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Fly", "id": "potion-of-fly"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Gaseous form", "id": "potion-of-gaseous-form"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Good hope", "id": "potion-of-good-hope"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Haste", "id": "potion-of-haste"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Heroism", "id": "potion-of-heroism"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Keen edge", "id": "potion-of-keen-edge"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Magic fang, greater", "id": "potion-of-magic-fang-greater"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Magic vestment", "id": "potion-of-magic-vestment"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Neutralize poison", "id": "potion-of-neutralize-poison"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Protection from energy, acid", "id": "potion-of-protection-from-energy-acid"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Protection from energy, cold", "id": "potion-of-protection-from-energy-cold"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Protection from energy, electricity", "id": "potion-of-protection-from-energy-electricity"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Protection from energy, fire", "id": "potion-of-protection-from-energy-fire"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Protection from energy, sonic", "id": "potion-of-protection-from-energy-sonic"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Rage", "id": "potion-of-rage"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Remove blindness/deafness", "id": "potion-of-remove-blindness-deafness"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Remove curse", "id": "potion-of-remove-curse"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Remove disease", "id": "potion-of-remove-disease"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Tongues", "id": "potion-of-tongues"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Water breathing", "id": "potion-of-water-breathing"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Water walk", "id": "potion-of-water-walk"}
            ]);
        }
    },
    uncommon: {
        "1": function () {
            return diceService.rangeIn100([4, 11, 16, 20, 26, 30, 34, 41, 49, 53, 58, 64, 68, 75, 80, 84, 92], [
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Animate rope", "id": "potion-of-animate-rope"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Ant haul", "id": "potion-of-ant-haul"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Cloak of the shade", "id": "potion-of-cloak-of-the-shade"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Erase", "id": "potion-of-erase"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Feather step", "id": "potion-of-feather-step"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Goodberry", "id": "potion-of-goodberry"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Grease", "id": "potion-of-grease"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Hide from animals", "id": "potion-of-hide-from-animals"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Hide from undead", "id": "potion-of-hide-from-undead"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Hold portal", "id": "potion-of-hold-portal"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Invigorate", "id": "potion-of-invigorate"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Keen senses", "id": "potion-of-keen-senses"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Magic stone", "id": "potion-of-magic-stone"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Remove sickness", "id": "potion-of-remove-sickness"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Sanctify corpse", "id": "potion-of-sanctify-corpse"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Shillelagh", "id": "potion-of-shillelagh"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Touch of the sea", "id": "potion-of-touch-of-the-sea"},
                {"Price": 50.0, "PriceUnit": "gp", "Name": "Potion of Vanish", "id": "potion-of-vanish"}
            ]);
        },
        "2": function () {
            return diceService.rangeIn100([6, 14, 19, 24, 30, 35, 40, 48, 56, 61, 67, 72, 76, 82, 90, 95], [
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Ablative barrier", "id": "potion-of-ablative-barrier"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Acute senses", "id": "potion-of-acute-senses"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Arcane lock", "id": "potion-of-arcane-lock"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Bullet shield", "id": "potion-of-bullet-shield"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Certain grip", "id": "potion-of-certain-grip"},
                {"Price": 350.0, "PriceUnit": "gp", "Name": "Potion of Continual flame", "id": "potion-of-continual-flame"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Corruption resistance", "id": "potion-of-corruption-resistance"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Disguise other", "id": "potion-of-disguise-other"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Gentle repose", "id": "potion-of-gentle-repose"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Make whole", "id": "potion-of-make-whole"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Obscure object", "id": "potion-of-obscure-object"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Reduce animal", "id": "potion-of-reduce-animal"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Rope trick", "id": "potion-of-rope-trick"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Slipstream", "id": "potion-of-slipstream"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Status", "id": "potion-of-status"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Warp wood", "id": "potion-of-warp-wood"},
                {"Price": 300.0, "PriceUnit": "gp", "Name": "Potion of Wood shape", "id": "potion-of-wood-shape"}
            ]);
        },
        "3": function () {
            return diceService.rangeIn100([12, 22, 34, 49, 58, 67, 77, 87], [
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Burrow", "id": "potion-of-burrow"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Countless eyes", "id": "potion-of-countless-eyes"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Daylight", "id": "potion-of-daylight"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Draconic reservoir", "id": "potion-of-draconic-reservoir"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Flame arrow", "id": "potion-of-flame-arrow"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Shrink item", "id": "potion-of-shrink-item"},
                {"Price": 750.0, "PriceUnit": "gp", "Name": "Potion of Stone shape", "id": "potion-of-stone-shape"},
                {"Price": 775.0, "PriceUnit": "gp", "Name": "Potion of Fire trap", "id": "potion-of-fire-trap"},
                {"Price": 800.0, "PriceUnit": "gp", "Name": "Potion of Nondetection", "id": "potion-of-nondetection"}
            ]);
        }
    }
};

var randomPotionLevel = {
    lesser_minor: function () {
        return diceService.rangeIn100([40], [0, 1]);
    },
    greater_minor: function () {
        return diceService.rangeIn100([10, 60], [0, 1, 2]);
    },
    lesser_medium: function () {
        return diceService.rangeIn100([25, 85], [1, 2, 3]);
    },
    greater_medium: function () {
        return diceService.rangeIn100([10, 50], [1, 2, 3]);
    },
    lesser_major: function () {
        return diceService.rangeIn100([35], [2, 3]);
    },
    greater_major: function () {
        return diceService.rangeIn100([10], [2, 3]);
    }
};

module.exports = function (_diceService_) {
    diceService = _diceService_;
    return {
        randomPotion: randomPotion,
        randomPotionLevel : randomPotionLevel
    }
};