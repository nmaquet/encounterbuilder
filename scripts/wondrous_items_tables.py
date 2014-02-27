#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json

items = {}
items["belt"] = {}
 items["body"] = {}
# items["chest"] = {}
# items["eyes"] = {}
# items["feet"] = {}
# items["hands"] = {}
# items["head"] = {}
# items["neck"] = {}
# items["shoulders"] = {}
# items["wrists"] = {}
# items["slotless"] = {}

items["belt"]["lesser_minor"] = """01-16	Belt of tumbling	800 gp
17-28	Beneficial bandolier	1,000 gp
29-40	Meridian belt	1,000 gp
41-54	Bladed belt	2,000 gp
55-70	Heavyload belt	2,000 gp
71-84	Aquatic cummerbund	2,600 gp
85-100	Equestrian belt	3,200 gp"""

items["belt"]["greater_minor"] = """01-18	Belt of giant strength +2	4,000 gp
19-36	Belt of incredible dexterity +2	4,000 gp
37-54	Belt of mighty constitution +2	4,000 gp
55-62	Belt of teeth	4,000 gp
63-74	Blinkback belt	5,000 gp
75-84	Plague rat belt	5,200 gp
85-100	Belt of foraging	6,000 gp"""

items["belt"]["lesser_medium"] = """01-04	Serpent belt	9,000 gp
05-08	Monkey belt	9,400 gp
09-16	Belt of physical might +2	10,000 gp
17-22	Belt of the weasel	10,000 gp
23-27	Belt of thunderous charging	10,000 gp
28-32	Minotaur belt	11,000 gp
33-36	Plague rat belt, greater	11,200 gp
37-41	Belt of equilibrium	12,000 gp
42-46	Security belt	12,500 gp
47-51	Belt of mighty hurling, lesser	14,000 gp
52-57	Belt of dwarvenkind	14,900 gp
58-61	Cord of stubborn resolve	15,000 gp
62-71	Belt of giant strength +4	16,000 gp
72-80	Belt of physical perfection +2	16,000 gp
81-90	Belt of incredible dexterity +4	16,000 gp
91-100	Belt of mighty constitution +4	16,000 gp"""

items["belt"]["greater_medium"] = """01-12	Monkey belt, greater	18,000 gp
13-26	Anaconda's coils	18,500 gp
27-38	Serpent belt, greater	20,000 gp
39-53	Belt of fallen heroes	21,000 gp
54-67	Gorgon belt	23,000 gp
68-84	Elemental earth belt	24,000 gp
85-100	Sash of flowing water	25,000 gp"""

items["belt"]["lesser_major"] = """01-12	Merform belt	32,000 gp
13-30	Belt of giant strength +6	36,000 gp
31-48	Belt of incredible dexterity +6	36,000 gp
49-66	Belt of mighty constitution +6	36,000 gp
67-88	Belt of physical might +4	40,000 gp
89-100	Belt of mighty hurling, greater	42,000 gp"""

items["belt"]["greater_major"] = """01-25	Belt of stoneskin	60,000 gp
26-55	Belt of physical perfection +4	64,000 gp
56-75	Belt of physical might +6	90,000 gp
76-90	Shadowform belt	110,000 gp
91-100	Belt of physical perfection +6	144,000 gp"""


def wondrous_item(name, price):
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
		if c.isalpha(): 
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
        lo_chance, hi_chance = map(int, chance.split("-"))
        upperBounds.append(hi_chance)
        price = splitted[-2]
        name = " ".join(splitted[1:-2])
        values.append(wondrous_item(name, price))
    return """%s : {
                  create : function() {
                       return clone(rangeIn100(this.chanceTable, this.valueTable));
                  },
                  chanceTable : %s,
                  valueTable : %s
              }""" % (magnitude, json.dumps(upperBounds[:-1]), json.dumps(values))

if __name__ == "__main__":
    wondrous_items = []
    for slot in items :
        magnitudes = []
        for magnitude in items[slot]:
            magnitudes.append(parseTable(items[slot][magnitude], magnitude))
        wondrous_items.append("""%s : { \n %s \n }""" % (slot, ",\n".join(magnitudes)))
    string = """var random_wondrous_item = { \n %s \n };""" % (",\n".join(wondrous_items))
    with open("../data/items/wondrous_items_tables.js", "w") as f:
        f.write(string)