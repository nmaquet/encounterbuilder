# Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

﻿#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json

items = {}

items["least_semi_precious"] = """01-08	Agate	5 gp	+2d4 gp
09-14	Alabaster	5 gp	+2d4 gp
14-20	Azurite	5 gp	+2d4 gp
21-26	Hematite	5 gp	+2d4 gp
27-34	Lapis lazuli	5 gp	+2d4 gp
35-40	Malachite	5 gp	+2d4 gp
41-48	Obsidian	5 gp	+2d4 gp
49-56	Pearl, irregular freshwater	5 gp	+2d4 gp
57-62	Pyrite	5 gp	+2d4 gp
63-70	Rhodochrosite	5 gp	+2d4 gp
71-78	Quartz, rock crystal	5 gp	+2d4 gp
79-84	Shell	5 gp	+2d4 gp
85-92	Tigereye	5 gp	+2d4 gp
93-100	Turquoise	5 gp	+2d4 gp"""
items["lesse_semi_precious"] = """01-06	Bloodstone	25 gp	+2d4 x 5 gp
07-12	Carnelian	25 gp	+2d4 x 5 gp
13-18	Chrysoprase	25 gp	+2d4 x 5 gp
19-24	Citrine	25 gp	+2d4 x 5 gp
25-32	Ivory	25 gp	+2d4 x 5 gp
33-38	Jasper	25 gp	+2d4 x 5 gp
39-44	Moonstone	25 gp	+2d4 x 5 gp
45-50	Onyx	25 gp	+2d4 x 5 gp
51-56	Peridot	25 gp	+2d4 x 5 gp
57-74	Quartz, milky, rose, or smoky	25 gp	+2d4 x 5 gp
75-80	Sard	25 gp	+2d4 x 5 gp
81-86	Sardonyx	25 gp	+2d4 x 5 gp
87-92	Spinel, red or green	25 gp	+2d4 x 5 gp
94-100	Zircon	25 gp	+2d4 x 5 gp"""
items["semi_precious"] = """01-10	Amber	50 gp	+2d4 x 10 gp
11-20	Amethyst	50 gp	+2d4 x 10 gp
21-30	Chrysoberyl	50 gp	+2d4 x 10 gp
31-40	Coral	50 gp	+2d4 x 10 gp
41-50	Garnet	50 gp	+2d4 x 10 gp
51-60	Jade	50 gp	+2d4 x 10 gp
61-70	Jet	50 gp	+2d4 x 10 gp
71-80	Pearl, saltwater	50 gp	+2d4 x 10 gp
81-90	Spinel, deep blue	50 gp	+2d4 x 10 gp
91-100	Tourmaline	50 gp	+2d4 x 10 gp"""
items["greater_semi_precious"] = """01-25	Aquamarine	250 gp	+2d4 x 50 gp
26-50	Opal	250 gp	+2d4 x 50 gp
51-75	Pearl, black	250 gp	+2d4 x 50 gp
76-100	Topaz	250 gp	+2d4 x 50 gp"""
items["lesser_precious"] = """01-25	Diamond, small	500 gp	+2d4 x 100 gp
26-50	Emerald	500 gp	+2d4 x 100 gp
51-75	Ruby, small	500 gp	+2d4 x 100 gp
76-100	Sapphire	500 gp	+2d4 x 100 gp"""
items["greater_precious"] = """01-25	Diamond, large	2,500 gp	+2d4 x 500 gp
26-50	Emerald, brilliant green	2,500 gp	+2d4 x 500 gp
51-75	Ruby, large	2,500 gp	+2d4 x 500 gp
76-100	Sapphire, star	2,500 gp	+2d4 x 500 gp"""

def item(name, baseValue, addedValue):
	result = {
		"Name": name,
		"id": slugify(name),
		"Group":"Gem",
		"Description":"",
		"BaseValue": float(baseValue.split()[0].replace(',','')),
		"AddedValue":addedValue,
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
    upperBounds = []
    values = []
    for line in text.splitlines():
        splitted = line.split('\t')
        print(splitted);
        chance = splitted[0]
        if (all(c.isdigit() for c in chance)):
            lo_chance = hi_chance = int(chance)
        else:
            lo_chance, hi_chance = map(int, chance.split("-"))
        upperBounds.append(hi_chance)
        baseValue = splitted[2]
        addedValue = splitted[3]
        name = splitted[1]
        values.append(item(name, baseValue,addedValue))
    return values

if __name__ == "__main__":
    magnitudes = []
    for magnitude in items:
        magnitudes.append(parseTable(items[magnitude], magnitude))
        string = json.dumps(magnitudes, indent=4, sort_keys=True)
        with open("../data/items/gems.json", "w") as f:
            f.write(string)