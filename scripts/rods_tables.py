# Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

﻿#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json

items = {}

items["lesser_medium"] = """01	Metamagic, merciful, minor	1,500 gp
02-34	Metamagic (+1 spell level), minor	3,000 gp
35-49	Immovable rod	5,000 gp
50-59	Rod of thunderous force	5,400 gp
60	Metamagic, merciful, normal	5,500 gp
61	Rod of ice	8,500 gp
62-71	Metamagic (+2 spell level), minor	9,000 gp
72-81	Rod of metal and mineral detection	10,500 gp
82-86	Metamagic (+1 spell level), normal	11,000 gp
87-100	Rod of cancellation	11,000 gp"""
items["greater_medium"] = """01-03	Conduit rod	12,000 gp
04-06	Grounding rod	12,000 gp
07-10	Rod of the wayang	12,000 gp
11-18	Rod of wonder	12,000 gp
19	Metamagic, merciful, greater	12,250 gp
20-29	Rod of the python	13,000 gp
30-33	Trap-stealer's rod	13,500 gp
34-55	Metamagic (+3 spell level), minor	14,000 gp
56-59	Rod of balance	15,000 gp
60-63	Rod of escape	15,000 gp
64-72	Rod of flame extinguishing	15,000 gp
73-76	Rod of ruin	16,000 gp
77-80	Sapling rod	16,650 gp
81-86	Rod of beguiling	18,000 gp
87-90	Rod of nettles	18,000 gp
91-100	Rod of the viper	19,000 gp"""
items["lesser_major"] = """01-04	Suzerain scepter	20,000 gp
05-06	Fiery nimbus rod	22,305 gp
07-13	Rod of enemy detection	23,500 gp
14-27	Metamagic (+1 spell level), greater	24,500 gp
28-36	Rod of splendor	25,000 gp
37-44	Rod of withering	25,000 gp
45-50	Earthbind rod	26,500 gp
51-56	Rod of the aboleth	29,000 gp
57-63	Liberator's rod	30,000 gp
64-70	Metamagic (+2 spell level), normal	32,500 gp
71-79	Rod of thunder and lightning	33,000 gp
80-83	Metamagic, quicken, minor	35,000 gp
84-94	Rod of negation	37,000 gp
95-100	Rod of steadfast resolve	38,305 gp"""
items["greater_major"] = """01-08	Rod of absorption	50,000 gp
09-11	Rod of flailing	50,000 gp
12-26	Metamagic (+3 spell level), normal	54,000 gp
27-28	Rod of rulership	60,000 gp
29-30	Rod of security	61,000 gp
31-32	Rod of shadows	64,305 gp
33-34	Rod of mind mastery	67,000 gp
35-37	Rod of lordly might	70,000 gp
38-57	Metamagic (+2 spell level), greater	73,000 gp
58	Scepter of heaven	74,000 gp
59-68	Metamagic, quicken, normal	75,500 gp
69-70	Rod of dwarven might	80,000 gp
71-75	Rod of alertness	85,000 gp
76-95	Metamagic (+3 spell level), greater	121,500 gp
96-100	Metamagic, quicken, greater	170,000 gp"""

def item(name, price):
	result = {
		"Name": name,
		"id": slugify(name),
		"Price": float(price.replace(',','')),
		"PriceUnit": "gp"
	}
	return result

def slugify(string):
	res = []
	for c in string:
		if c.isalnum():
			res.append(c.lower())
		elif res and res[-1] != '-':
			res.append('-')
	if res[-1] == "-":
		res.pop()
	return "".join(res)
	
def parseTable(text, magnitude):
    table = []
    upperBounds = []
    values = []
    for line in text.splitlines():
        splitted = line.split()
        chance = splitted[0]
        if (all(c.isdigit() for c in chance)):
            lo_chance = hi_chance = int(chance)
        else:
            lo_chance, hi_chance = map(int, chance.split("-"))
        upperBounds.append(hi_chance)
        price = splitted[-2]
        name = " ".join(splitted[1:-2])
        values.append(item(name, price))
    return """%s : {
                  create : function() {
                       return clone(diceService.rangeIn100(this.chanceTable, this.valueTable));
                  },
                  chanceTable : %s,
                  valueTable : %s
              }""" % (magnitude, json.dumps(upperBounds[:-1]), json.dumps(values))

if __name__ == "__main__":
    magnitudes = []
    for magnitude in items:
        magnitudes.append(parseTable(items[magnitude], magnitude))
    string = """var random_staff = { \n %s \n };""" % (",\n".join(magnitudes))
    with open("../data/items/rods_tables.js", "w") as f:
        f.write(string)