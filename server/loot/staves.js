"use strict";

var clone = require('./../clone')().clone;

var diceService;

var random_staff = {
    lesser_major: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [4, 8, 11, 14, 17, 21, 24, 28, 32, 36, 39, 42, 46, 50, 54, 58, 62, 66, 70, 74, 78, 85, 89, 93, 97],
        valueTable: [
            {"Price": 28600.0, "PriceUnit": "gp", "Name": "Staff of acid", "id": "staff-of-acid"},
            {"Price": 28800.0, "PriceUnit": "gp", "Name": "Staff of shrieking", "id": "staff-of-shrieking"},
            {"Price": 29600.0, "PriceUnit": "gp", "Name": "Chaotic staff", "id": "chaotic-staff"},
            {"Price": 29600.0, "PriceUnit": "gp", "Name": "Holy staff", "id": "holy-staff"},
            {"Price": 29600.0, "PriceUnit": "gp", "Name": "Lawful staff", "id": "lawful-staff"},
            {"Price": 29600.0, "PriceUnit": "gp", "Name": "Staff of healing", "id": "staff-of-healing"},
            {"Price": 29600.0, "PriceUnit": "gp", "Name": "Unholy staff", "id": "unholy-staff"},
            {"Price": 30000.0, "PriceUnit": "gp", "Name": "Staff of the master", "id": "staff-of-the-master"},
            {"Price": 30200.0, "PriceUnit": "gp", "Name": "Staff of spiders", "id": "staff-of-spiders"},
            {"Price": 31900.0, "PriceUnit": "gp", "Name": "Staff of electricity", "id": "staff-of-electricity"},
            {"Price": 32000.0, "PriceUnit": "gp", "Name": "Heretic's bane", "id": "heretic-s-bane"},
            {"Price": 32000.0, "PriceUnit": "gp", "Name": "Musical staff", "id": "musical-staff"},
            {"Price": 32800.0, "PriceUnit": "gp", "Name": "Staff of souls", "id": "staff-of-souls"},
            {"Price": 34200.0, "PriceUnit": "gp", "Name": "Staff of toxins", "id": "staff-of-toxins"},
            {"Price": 36800.0, "PriceUnit": "gp", "Name": "Staff of stealth", "id": "staff-of-stealth"},
            {"Price": 37310.0, "PriceUnit": "gp", "Name": "Staff of the avenger", "id": "staff-of-the-avenger"},
            {"Price": 37600.0, "PriceUnit": "gp", "Name": "Staff of aspects", "id": "staff-of-aspects"},
            {"Price": 39600.0, "PriceUnit": "gp", "Name": "Staff of speaking", "id": "staff-of-speaking"},
            {"Price": 41400.0, "PriceUnit": "gp", "Name": "Staff of frost", "id": "staff-of-frost"},
            {"Price": 41600.0, "PriceUnit": "gp", "Name": "Staff of bolstering", "id": "staff-of-bolstering"},
            {"Price": 43500.0, "PriceUnit": "gp", "Name": "Staff of curses", "id": "staff-of-curses"},
            {"Price": 47000.0, "PriceUnit": "gp", "Name": "Staff of dark flame", "id": "staff-of-dark-flame"},
            {"Price": 47200.0, "PriceUnit": "gp", "Name": "Staff of cackling wrath", "id": "staff-of-cackling-wrath"},
            {"Price": 48800.0, "PriceUnit": "gp", "Name": "Staff of performance", "id": "staff-of-performance"},
            {"Price": 49800.0, "PriceUnit": "gp", "Name": "Animate staff", "id": "animate-staff"},
            {"Price": 51008.0, "PriceUnit": "gp", "Name": "Staff of revelations", "id": "staff-of-revelations"}
        ]
    },
    greater_medium: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [11, 21, 29, 38, 49, 60, 68, 81, 92],
        valueTable: [
            {"Price": 18950.0, "PriceUnit": "gp", "Name": "Staff of fire", "id": "staff-of-fire"},
            {"Price": 19200.0, "PriceUnit": "gp", "Name": "Staff of courage", "id": "staff-of-courage"},
            {"Price": 20000.0, "PriceUnit": "gp", "Name": "Staff of belittling", "id": "staff-of-belittling"},
            {"Price": 20800.0, "PriceUnit": "gp", "Name": "Staff of feast and famine", "id": "staff-of-feast-and-famine"},
            {"Price": 20800.0, "PriceUnit": "gp", "Name": "Staff of rigor", "id": "staff-of-rigor"},
            {"Price": 22800.0, "PriceUnit": "gp", "Name": "Staff of swarming insects", "id": "staff-of-swarming-insects"},
            {"Price": 23000.0, "PriceUnit": "gp", "Name": "Staff of authority", "id": "staff-of-authority"},
            {"Price": 23200.0, "PriceUnit": "gp", "Name": "Staff of radiance", "id": "staff-of-radiance"},
            {"Price": 26150.0, "PriceUnit": "gp", "Name": "Staff of size alteration", "id": "staff-of-size-alteration"},
            {"Price": 27200.0, "PriceUnit": "gp", "Name": "Staff of Journeys", "id": "staff-of-journeys"}
        ]
    },
    lesser_medium: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [10, 20, 30, 44, 54, 67, 84],
        valueTable: [
            {"Price": 7200.0, "PriceUnit": "gp", "Name": "Staff of blessed relief", "id": "staff-of-blessed-relief"},
            {"Price": 8000.0, "PriceUnit": "gp", "Name": "Staff of minor arcana", "id": "staff-of-minor-arcana"},
            {"Price": 8800.0, "PriceUnit": "gp", "Name": "Staff of tricks", "id": "staff-of-tricks"},
            {"Price": 9600.0, "PriceUnit": "gp", "Name": "Staff of the scout", "id": "staff-of-the-scout"},
            {"Price": 14400.0, "PriceUnit": "gp", "Name": "Staff of eidolons", "id": "staff-of-eidolons"},
            {"Price": 14800.0, "PriceUnit": "gp", "Name": "Staff of accompaniment", "id": "staff-of-accompaniment"},
            {"Price": 16000.0, "PriceUnit": "gp", "Name": "Staff of understanding", "id": "staff-of-understanding"},
            {"Price": 17600.0, "PriceUnit": "gp", "Name": "Staff of charming", "id": "staff-of-charming"}
        ]
    },
    greater_major: {
        create: function () {
            return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
        },
        chanceTable: [4, 7, 10, 13, 16, 19, 22, 25, 29, 32, 35, 38, 41, 46, 51, 56, 61, 66, 71, 76, 81, 83, 86, 88, 91, 94, 95, 98, 99],
        valueTable: [
            {"Price": 51500.0, "PriceUnit": "gp", "Name": "Staff of illumination", "id": "staff-of-illumination"},
            {"Price": 51600.0, "PriceUnit": "gp", "Name": "Staff of obstacles", "id": "staff-of-obstacles"},
            {"Price": 54000.0, "PriceUnit": "gp", "Name": "Staff of heaven and earth", "id": "staff-of-heaven-and-earth"},
            {"Price": 54400.0, "PriceUnit": "gp", "Name": "Staff of travel", "id": "staff-of-travel"},
            {"Price": 55866.0, "PriceUnit": "gp", "Name": "Staff of hoarding", "id": "staff-of-hoarding"},
            {"Price": 56925.0, "PriceUnit": "gp", "Name": "Staff of traps", "id": "staff-of-traps"},
            {"Price": 57200.0, "PriceUnit": "gp", "Name": "Staff of many rays", "id": "staff-of-many-rays"},
            {"Price": 58000.0, "PriceUnit": "gp", "Name": "Staff of mithral might", "id": "staff-of-mithral-might"},
            {"Price": 62000.0, "PriceUnit": "gp", "Name": "Staff of defense", "id": "staff-of-defense"},
            {"Price": 63960.0, "PriceUnit": "gp", "Name": "Staff of the planes", "id": "staff-of-the-planes"},
            {"Price": 69300.0, "PriceUnit": "gp", "Name": "Staff of hungry shadows", "id": "staff-of-hungry-shadows"},
            {"Price": 81000.0, "PriceUnit": "gp", "Name": "Dragon staff", "id": "dragon-staff"},
            {"Price": 81766.0, "PriceUnit": "gp", "Name": "Staff of slumber", "id": "staff-of-slumber"},
            {"Price": 82000.0, "PriceUnit": "gp", "Name": "Staff of abjuration", "id": "staff-of-abjuration"},
            {"Price": 82000.0, "PriceUnit": "gp", "Name": "Staff of conjuration", "id": "staff-of-conjuration"},
            {"Price": 82000.0, "PriceUnit": "gp", "Name": "Staff of divination", "id": "staff-of-divination"},
            {"Price": 82000.0, "PriceUnit": "gp", "Name": "Staff of enchantment", "id": "staff-of-enchantment"},
            {"Price": 82000.0, "PriceUnit": "gp", "Name": "Staff of evocation", "id": "staff-of-evocation"},
            {"Price": 82000.0, "PriceUnit": "gp", "Name": "Staff of illusion", "id": "staff-of-illusion"},
            {"Price": 82000.0, "PriceUnit": "gp", "Name": "Staff of necromancy", "id": "staff-of-necromancy"},
            {"Price": 82000.0, "PriceUnit": "gp", "Name": "Staff of transmutation", "id": "staff-of-transmutation"},
            {"Price": 84066.0, "PriceUnit": "gp", "Name": "Staff of weather", "id": "staff-of-weather"},
            {"Price": 85800.0, "PriceUnit": "gp", "Name": "Staff of earth and stone", "id": "staff-of-earth-and-stone"},
            {"Price": 86666.0, "PriceUnit": "gp", "Name": "Staff of vision", "id": "staff-of-vision"},
            {"Price": 100400.0, "PriceUnit": "gp", "Name": "Staff of the woodlands", "id": "staff-of-the-woodlands"},
            {"Price": 109400.0, "PriceUnit": "gp", "Name": "Staff of life", "id": "staff-of-life"},
            {"Price": 180200.0, "PriceUnit": "gp", "Name": "Staff of one hundred hands", "id": "staff-of-one-hundred-hands"},
            {"Price": 206900.0, "PriceUnit": "gp", "Name": "Staff of passage", "id": "staff-of-passage"},
            {"Price": 220000.0, "PriceUnit": "gp", "Name": "Staff of the hierophant", "id": "staff-of-the-hierophant"},
            {"Price": 235000.0, "PriceUnit": "gp", "Name": "Staff of power", "id": "staff-of-power"}
        ]
    }
};

module.exports = function (_diceService_) {
    diceService = _diceService_;
    return {
        random_staff : random_staff
    }
};