# Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

﻿#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json

common = {};
uncommon = {};

common[0] = """01-14	Arcane mark	25 gp
15-28	Guidance	25 gp
29-44	Light	25 gp
45-58	Purify food and drink	25 gp
59-72	Resistance	25 gp
73-86	Stabilize	25 gp
87-100	Virtue	25 gp"""

common[1] = """01-04	Bless weapon	50 gp
05-14	Cure light wounds	50 gp
15-19	Endure elements	50 gp
20-27	Enlarge person	50 gp
28-33	Jump	50 gp
34-41	Mage armor	50 gp
42-47	Magic fang	50 gp
48-55	Magic weapon	50 gp
56-60	Pass without trace	50 gp
61-64	Protection from chaos	50 gp
65-68	Protection from evil	50 gp
69-72	Protection from good	50 gp
73-76	Protection from law	50 gp
77-81	Reduce person	50 gp
82-87	Remove fear	50 gp
88-92	Sanctuary	50 gp
93-100	Shield of faith	50 gp"""

uncommon[1] = """01-04	Animate rope	50 gp
05-11	Ant haul	50 gp
12-16	Cloak of the shade	50 gp
17-20	Erase	50 gp
21-26	Feather step	50 gp
27-30	Goodberry	50 gp
31-34	Grease	50 gp
35-41	Hide from animals	50 gp
42-49	Hide from undead	50 gp
50-53	Hold portal	50 gp
54-58	Invigorate	50 gp
59-64	Keen senses	50 gp
65-68	Magic stone	50 gp
69-75	Remove sickness	50 gp
76-80	Sanctify corpse	50 gp
81-84	Shillelagh	50 gp
85-92	Touch of the sea	50 gp
93-100	Vanish	50 gp"""

common[2] = """01-04	Aid	300 gp
05-07	Align weapon	300 gp
08-11	Barkskin	300 gp
12-16	Bear's endurance	300 gp
17-20	Blur	300 gp
21-25	Bull's strength	300 gp
26-30	Cat's grace	300 gp
31-37	Cure moderate wounds	300 gp
38-41	Darkvision	300 gp
42-44	Delay poison	300 gp
45-49	Eagle's splendor	300 gp
50-54	Fox's cunning	300 gp
55-61	Invisibility	300 gp
62-66	Levitate	300 gp
67-71	Owl's wisdom	300 gp
72-73	Protection from arrows	300 gp
74-76	Remove paralysis	300 gp
77-80	Resist energy, acid	300 gp
81-84	Resist energy, cold	300 gp
85-88	Resist energy, electricity	300 gp
89-92	Resist energy, fire	300 gp
93-94	Resist energy, sonic	300 gp
95-98	Spider climb	300 gp
99-100	Undetectable alignment	300 gp"""

uncommon[2] = """01-06	Ablative barrier	300 gp
07-14	Acute senses	300 gp
15-19	Arcane lock	300 gp
20-24	Bullet shield	300 gp
25-30	Certain grip	300 gp
31-35	Continual flame	350 gp
36-40	Corruption resistance	300 gp
41-48	Disguise other	300 gp
49-56	Gentle repose	300 gp
57-61	Make whole	300 gp
62-67	Obscure object	300 gp
68-72	Reduce animal	300 gp
73-76	Rope trick	300 gp
77-82	Slipstream	300 gp
83-90	Status	300 gp
91-95	Warp wood	300 gp
96-100	Wood shape	300 gp"""

common[3] = """01-06	Cure serious wounds	750 gp
07-10	Dispel magic	750 gp
11-14	Displacement	750 gp
15-20	Fly	750 gp
21-25	Gaseous form	750 gp
26-29	Good hope	750 gp
30-35	Haste	750 gp
36-40	Heroism	750 gp
41-44	Keen edge	750 gp
45-48	Magic fang, greater	750 gp
49-52	Magic vestment	750 gp
53-57	Neutralize poison	750 gp
58-60	Protection from energy, acid	750 gp
61-63	Protection from energy, cold	750 gp
64-66	Protection from energy, electricity	750 gp
67-69	Protection from energy, fire	750 gp
70-71	Protection from energy, sonic	750 gp
72-74	Rage	750 gp
75-77	Remove blindness/deafness	750 gp
78-81	Remove curse	750 gp
82-86	Remove disease	750 gp
87-91	Tongues	750 gp
92-96	Water breathing	750 gp
97-100	Water walk	750 gp"""

uncommon[3] = """01-12	Burrow	750 gp
11-22	Countless eyes	750 gp
23-34	Daylight	750 gp
35-49	Draconic reservoir	750 gp
50-58	Flame arrow	750 gp
59-67	Shrink item	750 gp
68-77	Stone shape	750 gp
78-87	Fire trap	775 gp
88-100	Nondetection	800 gp"""

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
	
def potion(lo_chance, hi_chance, name, gp, spell_level, caster_level, rarity):
	result = {
		"LowChance" : lo_chance,
		"HighChance" : hi_chance,
		"Name": "Potion of " + name,
		"id": "potion-of-" + slugify(name),
		"Group": "Potion",
		"SpellName": name,
		"SpellId" : slugify(name),
		"Price": float(gp.replace(',','')),
		"PriceUnit": "gp",
		"SpellLevel" : spell_level,
		"CL" : caster_level,
		"Rarity" : rarity
	}
	return result
	
def oil(lo_chance, hi_chance, name, gp, spell_level, caster_level, rarity):
	result = {
		"LowChance" : lo_chance,
		"HighChance" : hi_chance,
		"Name": "Oil of " + name,
		"id": "oil-of-" + slugify(name),
		"Group": "Oil",
		"SpellName": name,
		"SpellId": slugify(name),
		"Price": float(gp.replace(',','')),
		"PriceUnit": "gp",
		"SpellLevel" : spell_level,
		"CL" : caster_level,
		"Rarity" : rarity
	}
	return result
	
def parseTable(text, spell_level, caster_level, rarity):
	table = []
	for line in text.splitlines():
		splitted = line.split()
		chance = splitted[0]
		lo_chance, hi_chance = map(int, chance.split("-"))
		gp = splitted[-2]			
		name = " ".join(splitted[1:-2])			
		table.append(potion(lo_chance, hi_chance, name, gp, spell_level, caster_level, rarity))
		table.append(oil(lo_chance, hi_chance, name, gp, spell_level, caster_level, rarity))
	return table

if __name__ == "__main__":
	table = []
	table += parseTable(common[0], 0, 1, "common")
	table += parseTable(common[1], 1, 1, "common")
	table += parseTable(uncommon[1], 1, 1, "uncommon")
	table += parseTable(common[2], 2, 3, "common")
	table += parseTable(uncommon[2], 2, 3, "uncommon")
	table += parseTable(common[3], 3, 5, "common")
	table += parseTable(uncommon[3], 3, 5, "uncommon")
	string = json.dumps(table, indent=4, sort_keys=True)
	with open("../data/items/potions_and_oils.json", "w") as f:
		f.write(string)
	
				
			