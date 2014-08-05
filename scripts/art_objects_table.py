# Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

# -*- coding: utf-8 -*-

import json

items = {}

items["1"] = """01-05	Bronze statuette of a warrior	15 gp
06	Elaborate copper wind chimes	20 gp
07	Painted paper fan with silver slats	20 gp
08-09	Copper and glass decanter	25 gp
10-17	Silver holy symbol	25 gp
18-21	Carved stone idol	30 gp
22-25	Set of six ivory dice	30 gp
26-29	Ivory bowl with animal carvings	40 gp
30	Porcelain doll with silk clothing	40 gp
31-32	Porcelain mask	40 gp
33-36	Bronze flagon with warrior images	50 gp
37-39	Copper brazier with religious markings	50 gp
40-42	Copper scepter with gold inlay	50 gp
43-44	Crystal egg with silver stand	50 gp
45-46	Painting of a noblewoman	50 gp
47-51	Polished darkwood chalice	50 gp
52	Silver baby rattle	50 gp
53-55	Silver chess set	50 gp
56-60	Carved ivory scroll case	60 gp
61-66	Decorated silver plate	60 gp
67-71	Ivory drinking horn with copper ends	60 gp
72-74	Silver noble family seal	60 gp
75-80	Silver statue of a dragon	65 gp
81-83	Electrum censer with silver filigree	70 gp
84-87	Silver candelabra with holy symbol	75 gp
88-90	Silver comb with ornate handle	75 gp
91-93	Silver hand mirror	75 gp
94-96	Crystal skull	80 gp
97	Ornate silver flute	80 gp
98-100	Engraved jade scarab	85 gp"""
items["2"] = """01-02	Elaborate silver wind chimes	60 gp
03-08	Engraved gold scarab	75 gp
09-10	Painted silk fan with electrum slats	75 gp
11-12	Preserved beast head on a plaque	75 gp
13-17	Set of six silver dice	75 gp
18-20	Silver and glass decanter	75 gp
21-22	Silver bowl with lion engravings	75 gp
23-26	Silver mask	75 gp
27-30	Carved jade idol	80 gp
31	Porcelain doll with furs and jewelry	80 gp
32-35	Silver brazier with religious markings	80 gp
36-38	Silver flagon with religious markings	80 gp
39-41	Gold censer with silver filigree	90 gp
42-44	Gold and silver chess set	100 gp
45	Gold baby rattle	100 gp
46-53	Gold holy symbol	100 gp
54-56	Masterwork lyre	100 gp
57-58	Painting of a princess	100 gp
59-61	Silver cup with royal crest	100 gp
62-65	Decorated electrum plate	110 gp
66-69	Gold statue of a dragon	110 gp
70-72	Gold statue of a lion	110 gp
73-77	Ivory drinking horn with silver ends	110 gp
78-81	Gold and silver hand mirror	120 gp
82-85	Silver cauldron with animal symbols	120 gp
86-88	Silver comb with gold handle	125 gp
89-90	Silver egg with dragon figurine	125 gp
91-92	Silver scepter with eagle symbols	125 gp
93-97	Silver chalice with dragon carvings	150 gp
98-100	Gold candelabra with holy symbol	200 gp"""
items["3"] = """01-03	Gilded demon skull	300 gp
04-13	Marble idol	300 gp
14-19	Masterwork darkwood lute	300 gp
20-24	Engraved mithral scarab	400 gp
25-28	Gold and ivory decanter	400 gp
29-32	Gold bowl with dragon engravings	400 gp
33-35	Gold censer with platinum inlay	400 gp
36-41	Gold mask	450 gp
42	Gold and mithral baby rattle	500 gp
43-48	Gold chess set	500 gp
49-51	Gold flagon with religious markings	500 gp
52-56	Gold puzzle box	500 gp
57-65	Platinum holy symbol	500 gp
66-69	Gold cup with royal crest	550 gp
70-77	Gold chalice with griffon carvings	600 gp
78-81	Mithral scepter with gold inlay	600 gp
82-88	Decorated gold plate	700 gp
89-93	Gold and platinum statuette of a deity	750 gp
94-96	Gold cauldron with alchemical symbols	750 gp
97-100	Painting of a queen	750 gp"""
items["4"] = """01-05	Engraved platinum scarab	700 gp
06-11	Gilded dragon skull	800 gp
12-18	Platinum bowl with arcane engravings	800 gp
19-22	Platinum censer with ornate markings	800 gp
23-26	Gold decanter with grape vine patterns	850 gp
27-31	Platinum mask	900 gp
32-36	Gold and mithral chess set	1,000 gp
37-41	Gold and platinum orrery	1,000 gp
42-46	Gold flute	1,000 gp
47-51	Gold idol with strange carvings	1,000 gp
52	Platinum baby rattle	1,000 gp
53-55	Platinum holy symbol of a famous priest	1,000 gp
56-64	Decorated platinum plate	1,100 gp
65-68	Platinum cauldron with odd symbols	1,100 gp
69-71	Platinum flagon with religious markings	1,100 gp
72-77	Platinum cup with royal crest	1,200 gp
78-81	Platinum scepter with gold inlay	1,200 gp
82-87	Platinum chalice with angel carvings	1,250 gp
88-93	Platinum statuette of a deity	1,300 gp
94-100	Painting of a queen by a master	1,500 gp"""
items["5"] = """01-08	Book of lost songs by a famous bard	3,000 gp
09-16	Darkwood and platinum music box	4,000 gp
17-26	Mithral hourglass with diamond dust	4,000 gp
27-34	Jeweled egg with epic sorcerer's blood	4,500 gp
35-37	Gold urn containing hero's ashes	5,000 gp
38-45	Helm carved from a pit fiend skull	5,000 gp
46-55	Holy text penned by a saint	5,000 gp
56-65	Painting of a beloved queen by a master	5,000 gp
66-74	Platinum idol with mysterious markings	5,000 gp
75-77	Bejeweled sword of state	6,000 gp
78-83	Carved saint's femur	6,000 gp
84-88	Platinum chalice blessed by a saint	6,000 gp
89-91	Glowing metallic meteor	6,500 gp
92-97	Gold bejeweled royal orb	7,000 gp
98-100	Crystallized dragon heart	7,500 gp"""
items["6"] = """01-06	Frozen vampire soul	7,000 gp
07-13	Mithral-inlaid unicorn horn	7,000 gp
14-16	Crystallized god breath	10,000 gp
17-22	Essence of truth	10,000 gp
23-31	Globe of pristine air	10,000 gp
32-40	Heart of the mountain	10,000 gp
41-46	Inverted soul gem	10,000 gp
47-55	Orb of living water	10,000 gp
56-64	Shard of pure fire	10,000 gp
65-72	Unmelting ice	10,000 gp
73-79	Time jewel	11,000 gp
80-83	Adamantine poiuyt	12,000 gp
84-89	Holy text written in saint's blood	12,000 gp
90-93	Mithral tribar	12,000 gp
94-100	Ethereal tapestry	13,000 gp"""

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
    string = """var random_art = { \n %s \n };""" % (",\n".join(magnitudes))
    with open("../data/items/art-objects.js", "w") as f:
        f.write(string)