# Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

﻿#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json

items = {}

items["lesser_minor"] = """01-07	Prisoner's dungeon ring	250 gp
08-16	Ring of arcane signets	1,000 gp
17-25	Ring of spell knowledge I	1,500 gp
26-40	Ring of protection +1	2,000 gp
41-47	Ring of the grasping grave	2,000 gp
48-57	Ring of feather falling	2,200 gp
58-66	Ring of climbing	2,500 gp
67-75	Ring of jumping	2,500 gp
76-84	Ring of sustenance	2,500 gp
85-93	Ring of swimming	2,500 gp
94-100	Ring of ferocious action	3,000 gp"""
items["greater_minor"] = """01-15	Ring of counterspells	4,000 gp
16-25	Ring of maniacal devices	5,000 gp
26-35	Ring of rat fangs	5,000 gp
36-52	Ring of sacred mistletoe	6,000 gp
53-69	Ring of spell knowledge II	6,000 gp
70-86	Ring of swarming stabs	6,000 gp
87-100	Ring of grit mastery	6,840 gp"""
items["lesser_medium"] = """01-02	Ring of forcefangs	8,000 gp
03-06	Ring of mind shielding	8,000 gp
07-11	Ring of protection +2	8,000 gp
12-13	Ring of strength sapping	8,000 gp
14-17	Ring of force shield	8,500 gp
18-22	Ring of the ram	8,600 gp
23-24	Scholar's ring	8,700 gp
25-27	Ring of climbing, improved	10,000 gp
28-29	Ring of curing	10,000 gp
30-31	Ring of foe focus	10,000 gp
32-35	Ring of jumping, improved	10,000 gp
36-37	Ring of ki mastery	10,000 gp
38-40	Ring of revelation, lesser	10,000 gp
41-43	Ring of swimming, improved	10,000 gp
44-46	Ring of animal friendship	10,800 gp
47-48	Ring of transposition	10,800 gp
49-50	Ring of tactical precision	11,000 gp
51-52	Ring of the sophisticate	11,000 gp
53-55	Decoy ring	12,000 gp
56-58	Ring of craft magic	12,000 gp
59-61	Ring of ectoplasmic invigoration	12,000 gp
62-64	Ring of energy resistance, minor	12,000 gp
65-67	Ring of the troglodyte	12,000 gp
68-70	Steelhand circle	12,000 gp
71-76	Ring of chameleon power	12,700 gp
77-79	Ring of spell knowledge III	13,500 gp
80-82	Ring of the sea strider	14,000 gp
83-85	Ring of retribution	15,000 gp
86-89	Ring of water walking	15,000 gp
90-95	Jailer's dungeon ring	16,000 gp
96-100	Ring of revelation, greater	16,000 gp"""
items["greater_medium"] = """01-04	Ring of inner fortitude, minor	18,000 gp
05-16	Ring of protection +3	18,000 gp
17-26	Ring of spell storing, minor	18,000 gp
27-30	Ring of energy shroud	19,500 gp
31-35	Ring of arcane mastery	20,000 gp
36-46	Ring of invisibility	20,000 gp
47-54	Ring of wizardry I	20,000 gp
55-60	Ring of revelation, superior	24,000 gp
61-68	Ring of spell knowledge IV	24,000 gp
69-80	Ring of evasion	25,000 gp
81-88	Ring of x-ray vision	25,000 gp
89-100	Ring of blinking	27,000 gp"""
items["lesser_major"] = """01-09	Ring of energy resistance, major	28,000 gp
10-16	Ring of the ecclesiarch	28,500 gp
17-33	Ring of protection +4	32,000 gp
34-39	Ring of return	33,600 gp
40-55	Ring of freedom of movement	40,000 gp
56-70	Ring of wizardry II	40,000 gp
71-75	Ring of inner fortitude, major	42,000 gp
76-92	Ring of energy resistance, greater	44,000 gp
93-100	Ring of delayed doom	45,000 gp"""
items["greater_major"] = """01-06	Ring of friend shield	50,000 gp
07-18	Ring of protection +5	50,000 gp
19-27	Ring of shooting stars	50,000 gp
28-37	Ring of spell storing	50,000 gp
38-43	Ring of continuation	56,000 gp
44-48	Ring of inner fortitude, greater	66,000 gp
49-57	Ring of wizardry III	70,000 gp
58-63	Spiritualist Rings	70,000 gp
64-71	Ring of telekinesis	75,000 gp
72-76	Ring of regeneration	90,000 gp
77-82	Ring of spell turning	100,000 gp
83-86	Ring of wizardry IV	100,000 gp
87-90	Ring of three wishes	120,000 gp
91-93	Ring of djinni calling	125,000 gp
94-97	Ring of elemental command	200,000 gp
98-100	Ring of spell storing, major	200,000 gp"""

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
    string = """var random_ring = { \n %s \n };""" % (",\n".join(magnitudes))
    with open("../data/items/rings_tables.js", "w") as f:
        f.write(string)