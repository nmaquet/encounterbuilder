# Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

﻿#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json

items = {}

items["lesser_medium"] = """01-10	Staff of blessed relief	7,200 gp
11-20	Staff of minor arcana	8,000 gp
21-30	Staff of tricks	8,800 gp
31-44	Staff of the scout	9,600 gp
45-54	Staff of eidolons	14,400 gp
55-67	Staff of accompaniment	14,800 gp
68-84	Staff of understanding	16,000 gp
85-100	Staff of charming	17,600 gp"""
items["greater_medium"] = """01-11	Staff of fire	18,950 gp
12-21	Staff of courage	19,200 gp
22-29	Staff of belittling	20,000 gp
30-38	Staff of feast and famine	20,800 gp
39-49	Staff of rigor	20,800 gp
50-60	Staff of swarming insects	22,800 gp
61-68	Staff of authority	23,000 gp
69-81	Staff of radiance	23,200 gp
82-92	Staff of size alteration	26,150 gp
93-100	Staff of Journeys	27,200 gp"""
items["lesser_major"] = """01-04	Staff of acid	28,600 gp
05-08	Staff of shrieking	28,800 gp
09-11	Chaotic staff	29,600 gp
12-14	Holy staff	29,600 gp
15-17	Lawful staff	29,600 gp
18-21	Staff of healing	29,600 gp
22-24	Unholy staff	29,600 gp
25-28	Staff of the master	30,000 gp
29-32	Staff of spiders	30,200 gp
33-36	Staff of electricity	31,900 gp
37-39	Heretic's bane	32,000 gp
40-42	Musical staff	32,000 gp
43-46	Staff of souls	32,800 gp
47-50	Staff of toxins	34,200 gp
51-54	Staff of stealth	36,800 gp
55-58	Staff of the avenger	37,310 gp
59-62	Staff of aspects	37,600 gp
63-66	Staff of speaking	39,600 gp
67-70	Staff of frost	41,400 gp
71-74	Staff of bolstering	41,600 gp
75-78	Staff of curses	43,500 gp
79-85	Staff of dark flame	47,000 gp
86-89	Staff of cackling wrath	47,200 gp
90-93	Staff of performance	48,800 gp
94-97	Animate staff	49,800 gp
98-100	Staff of revelations	51,008 gp"""
items["greater_major"] = """01-04	Staff of illumination	51,500 gp
05-07	Staff of obstacles	51,600 gp
08-10	Staff of heaven and earth	54,000 gp
11-13	Staff of travel	54,400 gp
14-16	Staff of hoarding	55,866 gp
17-19	Staff of traps	56,925 gp
20-22	Staff of many rays	57,200 gp
23-25	Staff of mithral might	58,000 gp
26-29	Staff of defense	62,000 gp
30-32	Staff of the planes	63,960 gp
33-35	Staff of hungry shadows	69,300 gp
36-38	Dragon staff	81,000 gp
39-41	Staff of slumber	81,766 gp
42-46	Staff of abjuration	82,000 gp
47-51	Staff of conjuration	82,000 gp
52-56	Staff of divination	82,000 gp
57-61	Staff of enchantment	82,000 gp
62-66	Staff of evocation	82,000 gp
67-71	Staff of illusion	82,000 gp
72-76	Staff of necromancy	82,000 gp
77-81	Staff of transmutation	82,000 gp
82-83	Staff of weather	84,066 gp
84-86	Staff of earth and stone	85,800 gp
87-88	Staff of vision	86,666 gp
89-91	Staff of the woodlands	100,400 gp
92-94	Staff of life	109,400 gp
95	Staff of one hundred hands	180,200 gp
96-98	Staff of passage	206,900 gp
99	Staff of the hierophant	220,000 gp
100	Staff of power	235,000 gp"""

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
    with open("../data/items/staves_tables.js", "w") as f:
        f.write(string)